package com.gitamentor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record MentorRequest(
    @NotNull(message = "User id is required.")
    @Positive(message = "User id must be valid.")
    Long userId,

    @NotBlank(message = "Question is required.")
    @Size(min = 3, max = 1000, message = "Question must be between 3 and 1000 characters.")
    String query
) {
}
