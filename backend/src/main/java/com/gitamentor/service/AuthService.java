package com.gitamentor.service;

import com.gitamentor.model.User;
import com.gitamentor.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private static final int MIN_PASSWORD_LENGTH = 8;
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[A-Za-z0-9_. -]{3,50}$");

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> register(String username, String password) {
        Map<String, Object> result = new HashMap<>();
        String normalizedUsername = normalizeUsername(username);

        if (normalizedUsername.isEmpty()) {
            result.put("success", false);
            result.put("message", "Username is required.");
            return result;
        }

        if (!USERNAME_PATTERN.matcher(normalizedUsername).matches()) {
            result.put("success", false);
            result.put("message", "Username can use letters, numbers, spaces, dots, hyphens, and underscores.");
            return result;
        }

        if (password == null || password.length() < MIN_PASSWORD_LENGTH) {
            result.put("success", false);
            result.put("message", "Password must be at least 8 characters.");
            return result;
        }

        if (password.length() > 128) {
            result.put("success", false);
            result.put("message", "Password cannot exceed 128 characters.");
            return result;
        }

        if (userRepository.existsByUsername(normalizedUsername)) {
            result.put("success", false);
            result.put("message", "Username already taken. Please choose another.");
            return result;
        }

        User user = new User();
        user.setUsername(normalizedUsername);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        result.put("success", true);
        result.put("message", "Registration successful. Please sign in.");
        return result;
    }

    public Map<String, Object> login(String username, String password) {
        Map<String, Object> result = new HashMap<>();
        String normalizedUsername = normalizeUsername(username);

        if (normalizedUsername.isEmpty() || password == null || password.isBlank()) {
            result.put("success", false);
            result.put("message", "Username and password are required.");
            return result;
        }

        Optional<User> optUser = userRepository.findByUsername(normalizedUsername);

        if (optUser.isEmpty()) {
            result.put("success", false);
            result.put("message", "Invalid username or password.");
            return result;
        }

        User user = optUser.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            result.put("success", false);
            result.put("message", "Invalid username or password.");
            return result;
        }

        result.put("success", true);
        result.put("message", "Login successful.");
        result.put("userId", user.getId());
        result.put("username", user.getUsername());
        return result;
    }

    private String normalizeUsername(String username) {
        return username == null ? "" : username.trim().replaceAll("\\s+", " ");
    }
}
