package com.gitamentor.service;

import com.gitamentor.model.Shloka;
import com.gitamentor.model.UnansweredQuery;
import com.gitamentor.model.UserQuery;
import com.gitamentor.repository.ShlokaRepository;
import com.gitamentor.repository.UnansweredQueryRepository;
import com.gitamentor.repository.UserQueryRepository;
import com.gitamentor.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class MentorServiceTest {

    private ShlokaRepository shlokaRepository;
    private UserQueryRepository userQueryRepository;
    private UnansweredQueryRepository unansweredQueryRepository;
    private UserRepository userRepository;
    private MentorService mentorService;

    @BeforeEach
    void setUp() {
        shlokaRepository = mock(ShlokaRepository.class);
        userQueryRepository = mock(UserQueryRepository.class);
        unansweredQueryRepository = mock(UnansweredQueryRepository.class);
        userRepository = mock(UserRepository.class);
        mentorService = new MentorService(
            shlokaRepository,
            userQueryRepository,
            unansweredQueryRepository,
            userRepository
        );
    }

    @Test
    void detectCategoryIsNullSafe() {
        assertThat(mentorService.detectCategory(null)).isNull();
        assertThat(mentorService.detectCategory("I am confused about my career decision"))
            .isEqualTo("confusion");
    }

    @Test
    void unknownQuestionIsSavedForReview() {
        when(userRepository.existsById(7L)).thenReturn(true);

        Map<String, Object> response = mentorService.getMentorResponse(7L, "What should I cook tonight?");

        assertThat(response).containsEntry("found", false);
        ArgumentCaptor<UserQuery> userQueryCaptor = ArgumentCaptor.forClass(UserQuery.class);
        verify(userQueryRepository).save(userQueryCaptor.capture());
        assertThat(userQueryCaptor.getValue().getCategory()).isNull();
        ArgumentCaptor<UnansweredQuery> unansweredCaptor = ArgumentCaptor.forClass(UnansweredQuery.class);
        verify(unansweredQueryRepository).save(unansweredCaptor.capture());
        assertThat(unansweredCaptor.getValue().getQuery()).isEqualTo("What should I cook tonight?");
    }

    @Test
    void invalidUserIdDoesNotWriteQueries() {
        when(userRepository.existsById(99L)).thenReturn(false);

        Map<String, Object> response = mentorService.getMentorResponse(99L, "I feel stress");

        assertThat(response).containsEntry("found", false);
        verify(userQueryRepository, never()).save(any());
        verify(unansweredQueryRepository, never()).save(any());
    }

    @Test
    void foundQuestionReturnsShlokaPayload() {
        Shloka shloka = new Shloka();
        shloka.setSanskrit("Verse");
        shloka.setMeaning("Meaning");
        shloka.setExplanation("Explanation");
        shloka.setLifeExample("Example");

        when(userRepository.existsById(7L)).thenReturn(true);
        when(shlokaRepository.findByCategory("stress")).thenReturn(List.of(shloka));

        Map<String, Object> response = mentorService.getMentorResponse(7L, "I am very stressed");

        assertThat(response)
            .containsEntry("found", true)
            .containsEntry("category", "stress")
            .containsEntry("sanskrit", "Verse")
            .containsEntry("meaning", "Meaning");
    }
}
