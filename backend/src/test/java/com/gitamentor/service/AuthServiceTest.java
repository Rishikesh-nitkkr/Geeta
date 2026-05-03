package com.gitamentor.service;

import com.gitamentor.model.User;
import com.gitamentor.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void registerRejectsShortPasswords() {
        Map<String, Object> result = authService.register("Arjuna", "short");

        assertThat(result).containsEntry("success", false);
        assertThat(result.get("message").toString()).contains("8 characters");
        verify(userRepository, never()).save(any());
    }

    @Test
    void registerNormalizesUsernameAndHashesPassword() {
        when(userRepository.existsByUsername("Arjuna Dev")).thenReturn(false);
        when(passwordEncoder.encode("strongpass")).thenReturn("hashed-password");

        Map<String, Object> result = authService.register("  Arjuna   Dev  ", "strongpass");

        assertThat(result).containsEntry("success", true);
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        assertThat(userCaptor.getValue().getUsername()).isEqualTo("Arjuna Dev");
        assertThat(userCaptor.getValue().getPassword()).isEqualTo("hashed-password");
    }

    @Test
    void loginHandlesMissingInputWithoutThrowing() {
        Map<String, Object> result = authService.login(null, null);

        assertThat(result).containsEntry("success", false);
        assertThat(result.get("message").toString()).contains("required");
    }

    @Test
    void loginUsesGenericMessageForUnknownUser() {
        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        Map<String, Object> result = authService.login("unknown", "strongpass");

        assertThat(result).containsEntry("success", false);
        assertThat(result).containsEntry("message", "Invalid username or password.");
    }
}
