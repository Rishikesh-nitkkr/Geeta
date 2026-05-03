package com.gitamentor.controller;

import com.gitamentor.dto.MentorRequest;
import com.gitamentor.dto.UnansweredQueryRequest;
import com.gitamentor.model.UnansweredQuery;
import com.gitamentor.repository.UnansweredQueryRepository;
import com.gitamentor.service.MentorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MentorController {

    private final MentorService mentorService;
    private final UnansweredQueryRepository unansweredQueryRepository;

    public MentorController(MentorService mentorService,
                            UnansweredQueryRepository unansweredQueryRepository) {
        this.mentorService = mentorService;
        this.unansweredQueryRepository = unansweredQueryRepository;
    }

    @PostMapping("/mentor")
    public ResponseEntity<Map<String, Object>> getMentorResponse(@Valid @RequestBody MentorRequest request) {
        Map<String, Object> response = mentorService.getMentorResponse(request.userId(), request.query());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/save-unanswered")
    public ResponseEntity<Map<String, Object>> saveUnanswered(@Valid @RequestBody UnansweredQueryRequest request) {
        UnansweredQuery unansweredQuery = new UnansweredQuery();
        unansweredQuery.setUserId(request.userId());
        unansweredQuery.setQuery(request.query().trim());
        unansweredQueryRepository.save(unansweredQuery);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("success", true, "message", "Query saved for admin review."));
    }
}
