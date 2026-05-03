package com.gitamentor.controller;

import com.gitamentor.model.QuizQuestion;
import com.gitamentor.service.QuizService;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Validated
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/quiz")
    public ResponseEntity<List<QuizQuestion>> getQuiz(
            @RequestParam @Positive(message = "User id must be valid.") Long userId) {
        List<QuizQuestion> questions = quizService.getQuizForUser(userId);
        return ResponseEntity.ok(questions);
    }
}
