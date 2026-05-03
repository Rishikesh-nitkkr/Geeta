package com.gitamentor.service;

import com.gitamentor.model.Shloka;
import com.gitamentor.model.UnansweredQuery;
import com.gitamentor.model.UserQuery;
import com.gitamentor.repository.ShlokaRepository;
import com.gitamentor.repository.UnansweredQueryRepository;
import com.gitamentor.repository.UserQueryRepository;
import com.gitamentor.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class MentorService {

    private final ShlokaRepository shlokaRepository;
    private final UserQueryRepository userQueryRepository;
    private final UnansweredQueryRepository unansweredQueryRepository;
    private final UserRepository userRepository;

    // ── Keyword → Category Map ──────────────────────────────
    private static final Map<String, String> KEYWORD_CATEGORY_MAP = new LinkedHashMap<>();

    static {
        // stress
        KEYWORD_CATEGORY_MAP.put("stress",       "stress");
        KEYWORD_CATEGORY_MAP.put("stressed",      "stress");
        KEYWORD_CATEGORY_MAP.put("anxiety",       "stress");
        KEYWORD_CATEGORY_MAP.put("anxious",       "stress");
        KEYWORD_CATEGORY_MAP.put("pressure",      "stress");
        KEYWORD_CATEGORY_MAP.put("overwhelm",     "stress");
        KEYWORD_CATEGORY_MAP.put("burnout",       "stress");
        KEYWORD_CATEGORY_MAP.put("tension",       "stress");
        KEYWORD_CATEGORY_MAP.put("worri",         "stress");

        // fear
        KEYWORD_CATEGORY_MAP.put("fear",          "fear");
        KEYWORD_CATEGORY_MAP.put("afraid",        "fear");
        KEYWORD_CATEGORY_MAP.put("scared",        "fear");
        KEYWORD_CATEGORY_MAP.put("phobia",        "fear");
        KEYWORD_CATEGORY_MAP.put("terrified",     "fear");
        KEYWORD_CATEGORY_MAP.put("dread",         "fear");
        KEYWORD_CATEGORY_MAP.put("panic",         "fear");

        // anger
        KEYWORD_CATEGORY_MAP.put("anger",         "anger");
        KEYWORD_CATEGORY_MAP.put("angry",         "anger");
        KEYWORD_CATEGORY_MAP.put("frustrated",    "anger");
        KEYWORD_CATEGORY_MAP.put("frustration",   "anger");
        KEYWORD_CATEGORY_MAP.put("rage",          "anger");
        KEYWORD_CATEGORY_MAP.put("irritat",       "anger");
        KEYWORD_CATEGORY_MAP.put("furious",       "anger");

        // discipline
        KEYWORD_CATEGORY_MAP.put("disciplin",     "discipline");
        KEYWORD_CATEGORY_MAP.put("lazy",          "discipline");
        KEYWORD_CATEGORY_MAP.put("laziness",      "discipline");
        KEYWORD_CATEGORY_MAP.put("procrastinat",  "discipline");
        KEYWORD_CATEGORY_MAP.put("habit",         "discipline");
        KEYWORD_CATEGORY_MAP.put("routine",       "discipline");
        KEYWORD_CATEGORY_MAP.put("consistent",    "consistency");

        // karma
        KEYWORD_CATEGORY_MAP.put("karma",         "karma");
        KEYWORD_CATEGORY_MAP.put("action",        "karma");
        KEYWORD_CATEGORY_MAP.put("result",        "karma");
        KEYWORD_CATEGORY_MAP.put("fruit",         "karma");
        KEYWORD_CATEGORY_MAP.put("effort",        "karma");

        // motivation
        KEYWORD_CATEGORY_MAP.put("motivat",       "motivation");
        KEYWORD_CATEGORY_MAP.put("demotivat",     "motivation");
        KEYWORD_CATEGORY_MAP.put("inspiration",   "motivation");
        KEYWORD_CATEGORY_MAP.put("unmotivat",     "motivation");
        KEYWORD_CATEGORY_MAP.put("compare",       "motivation");

        // focus
        KEYWORD_CATEGORY_MAP.put("focus",         "focus");
        KEYWORD_CATEGORY_MAP.put("distract",      "focus");
        KEYWORD_CATEGORY_MAP.put("concentrat",    "focus");
        KEYWORD_CATEGORY_MAP.put("attention",     "focus");
        KEYWORD_CATEGORY_MAP.put("wandering mind","focus");

        // confusion
        KEYWORD_CATEGORY_MAP.put("confus",        "confusion");
        KEYWORD_CATEGORY_MAP.put("doubt",         "confusion");
        KEYWORD_CATEGORY_MAP.put("uncertain",     "confusion");
        KEYWORD_CATEGORY_MAP.put("lost",          "confusion");
        KEYWORD_CATEGORY_MAP.put("overthink",     "confusion");

        // purpose
        KEYWORD_CATEGORY_MAP.put("purpose",       "purpose");
        KEYWORD_CATEGORY_MAP.put("meaning",       "purpose");
        KEYWORD_CATEGORY_MAP.put("why am i",      "purpose");
        KEYWORD_CATEGORY_MAP.put("life goal",     "purpose");
        KEYWORD_CATEGORY_MAP.put("direction",     "purpose");

        // duty
        KEYWORD_CATEGORY_MAP.put("duty",          "duty");
        KEYWORD_CATEGORY_MAP.put("responsib",     "duty");
        KEYWORD_CATEGORY_MAP.put("obligation",    "duty");

        // leadership
        KEYWORD_CATEGORY_MAP.put("lead",          "leadership");
        KEYWORD_CATEGORY_MAP.put("manage",        "leadership");
        KEYWORD_CATEGORY_MAP.put("team",          "leadership");
        KEYWORD_CATEGORY_MAP.put("boss",          "leadership");

        // self_control
        KEYWORD_CATEGORY_MAP.put("self control",  "self_control");
        KEYWORD_CATEGORY_MAP.put("self-control",  "self_control");
        KEYWORD_CATEGORY_MAP.put("control myself","self_control");
        KEYWORD_CATEGORY_MAP.put("impulse",       "self_control");
        KEYWORD_CATEGORY_MAP.put("addiction",     "self_control");
        KEYWORD_CATEGORY_MAP.put("temptation",    "self_control");

        // detachment
        KEYWORD_CATEGORY_MAP.put("detach",        "detachment");
        KEYWORD_CATEGORY_MAP.put("letting go",    "detachment");
        KEYWORD_CATEGORY_MAP.put("clinging",      "detachment");
        KEYWORD_CATEGORY_MAP.put("attachment",    "detachment");
        KEYWORD_CATEGORY_MAP.put("possessive",    "detachment");

        // success
        KEYWORD_CATEGORY_MAP.put("success",       "success");
        KEYWORD_CATEGORY_MAP.put("succeed",       "success");
        KEYWORD_CATEGORY_MAP.put("achieve",       "success");
        KEYWORD_CATEGORY_MAP.put("accomplish",    "success");
        KEYWORD_CATEGORY_MAP.put("win",           "success");

        // failure
        KEYWORD_CATEGORY_MAP.put("fail",          "failure");
        KEYWORD_CATEGORY_MAP.put("failure",       "failure");
        KEYWORD_CATEGORY_MAP.put("mistake",       "failure");
        KEYWORD_CATEGORY_MAP.put("rejection",     "failure");
        KEYWORD_CATEGORY_MAP.put("gave up",       "failure");

        // mind_control
        KEYWORD_CATEGORY_MAP.put("mind control",  "mind_control");
        KEYWORD_CATEGORY_MAP.put("restless mind", "mind_control");
        KEYWORD_CATEGORY_MAP.put("mental noise",  "mind_control");
        KEYWORD_CATEGORY_MAP.put("overthinking",  "mind_control");
        KEYWORD_CATEGORY_MAP.put("monkey mind",   "mind_control");

        // consistency
        KEYWORD_CATEGORY_MAP.put("consist",       "consistency");
        KEYWORD_CATEGORY_MAP.put("regularity",    "consistency");
        KEYWORD_CATEGORY_MAP.put("daily",         "consistency");
        KEYWORD_CATEGORY_MAP.put("every day",     "consistency");
        KEYWORD_CATEGORY_MAP.put("show up",       "consistency");

        // decision_making
        KEYWORD_CATEGORY_MAP.put("decision",      "decision_making");
        KEYWORD_CATEGORY_MAP.put("choose",        "decision_making");
        KEYWORD_CATEGORY_MAP.put("choice",        "decision_making");
        KEYWORD_CATEGORY_MAP.put("dilemma",       "decision_making");
        KEYWORD_CATEGORY_MAP.put("career",        "decision_making");

        // peace
        KEYWORD_CATEGORY_MAP.put("peace",         "peace");
        KEYWORD_CATEGORY_MAP.put("peaceful",      "peace");
        KEYWORD_CATEGORY_MAP.put("calm",          "peace");
        KEYWORD_CATEGORY_MAP.put("restless",      "peace");
        KEYWORD_CATEGORY_MAP.put("inner peace",   "peace");

        // confidence
        KEYWORD_CATEGORY_MAP.put("confidence",    "confidence");
        KEYWORD_CATEGORY_MAP.put("confident",     "confidence");
        KEYWORD_CATEGORY_MAP.put("self doubt",    "confidence");
        KEYWORD_CATEGORY_MAP.put("insecure",      "confidence");
        KEYWORD_CATEGORY_MAP.put("not good enough","confidence");
    }

    public MentorService(ShlokaRepository shlokaRepository,
                         UserQueryRepository userQueryRepository,
                         UnansweredQueryRepository unansweredQueryRepository,
                         UserRepository userRepository) {
        this.shlokaRepository = shlokaRepository;
        this.userQueryRepository = userQueryRepository;
        this.unansweredQueryRepository = unansweredQueryRepository;
        this.userRepository = userRepository;
    }

    // ── Detect category from query ──────────────────────────
    public String detectCategory(String query) {
        if (query == null || query.isBlank()) {
            return null;
        }
        String lower = cleanQuery(query).toLowerCase(Locale.ROOT);
        for (Map.Entry<String, String> entry : KEYWORD_CATEGORY_MAP.entrySet()) {
            if (lower.contains(entry.getKey())) {
                return entry.getValue();
            }
        }
        return null;
    }

    // ── Main mentor logic ───────────────────────────────────
    public Map<String, Object> getMentorResponse(Long userId, String query) {
        Map<String, Object> response = new HashMap<>();
        String cleanQuery = cleanQuery(query);

        if (userId == null || !userRepository.existsById(userId)) {
            response.put("found", false);
            response.put("message", "Your session could not be verified. Please sign in again and retry.");
            return response;
        }

        String category = detectCategory(cleanQuery);

        // Save user query
        UserQuery userQuery = new UserQuery();
        userQuery.setUserId(userId);
        userQuery.setQuery(cleanQuery);
        userQuery.setCategory(category);
        userQueryRepository.save(userQuery);

        if (category == null) {
            // No category found — store as unanswered
            saveUnanswered(userId, cleanQuery);
            response.put("found", false);
            response.put("message", "O Devotee, your question has been received with reverence. " +
                "This matter requires deeper wisdom from our scriptures. " +
                "Your query has been recorded for our learned administrators to address. " +
                "Please try asking about: stress, fear, anger, focus, motivation, karma, discipline, or peace.");
            return response;
        }

        List<Shloka> shlokas = shlokaRepository.findByCategory(category);

        if (shlokas.isEmpty()) {
            saveUnanswered(userId, cleanQuery);
            response.put("found", false);
            response.put("message", "O Seeker, no specific teaching was found for this matter in our current collection. Your query has been saved for review.");
            return response;
        }

        // Pick random shloka from the matched category
        Shloka shloka = shlokas.get(ThreadLocalRandom.current().nextInt(shlokas.size()));

        response.put("found", true);
        response.put("category", category);
        response.put("problem", cleanQuery);
        response.put("sanskrit", shloka.getSanskrit());
        response.put("meaning", shloka.getMeaning());
        response.put("explanation", shloka.getExplanation());
        response.put("lifeExample", shloka.getLifeExample());
        response.put("guidance", buildGuidance(category));

        return response;
    }

    private void saveUnanswered(Long userId, String query) {
        UnansweredQuery uq = new UnansweredQuery();
        uq.setUserId(userId);
        uq.setQuery(query);
        unansweredQueryRepository.save(uq);
    }

    private String cleanQuery(String query) {
        if (query == null) {
            return "";
        }
        return query.trim().replaceAll("[\\p{Cntrl}&&[^\r\n\t]]", "");
    }

    private String buildGuidance(String category) {
        Map<String, String> guidanceMap = new HashMap<>();
        guidanceMap.put("stress",          "Take a deep breath. Focus on what you can control — your actions. Release what you cannot — the outcome. Do your best today.");
        guidanceMap.put("fear",            "Remember, O Arjuna: your soul is eternal. What you truly are cannot be destroyed. Face this challenge — you are stronger than your fear.");
        guidanceMap.put("anger",           "Before you speak or act in anger, pause for one breath. Ask: will this response serve me or harm me? Respond, do not react.");
        guidanceMap.put("discipline",      "Commit to one small daily action. Wake up, show up, do the work. You are building the best version of yourself — one day at a time.");
        guidanceMap.put("karma",           "Do your duty fully and faithfully. Release the attachment to results. The universe accounts for every sincere effort.");
        guidanceMap.put("motivation",      "Stop comparing your chapter 3 to someone else's chapter 20. Your path is unique. Walk it with full commitment.");
        guidanceMap.put("focus",           "Remove one distraction from your environment today. Practice your task for 25 focused minutes. Repeat daily.");
        guidanceMap.put("confusion",       "Stop overthinking and start learning. Research the topic. Talk to one knowledgeable person. Then take one small step.");
        guidanceMap.put("purpose",         "Go deep — not wide. What activity makes you lose track of time? That feeling is a clue to your purpose.");
        guidanceMap.put("duty",            "Even imperfect fulfillment of your duty is honourable. Show up, do what is needed, and let go of perfectionism.");
        guidanceMap.put("leadership",      "Lead by example. Your team watches what you do, not what you say. Be the standard you wish to see.");
        guidanceMap.put("self_control",    "Identify your one biggest trigger today. When it appears, pause and breathe before acting. That pause is your power.");
        guidanceMap.put("detachment",      "Engage fully — love deeply, work hard — but hold outcomes loosely. Your peace cannot depend on things you cannot control.");
        guidanceMap.put("success",         "Define success by the quality of your effort, not by external validation. Genuine work creates genuine results.");
        guidanceMap.put("failure",         "Every failure is tuition paid for future success. What did this experience teach you? Extract the lesson and move forward.");
        guidanceMap.put("mind_control",    "Your mind is a tool, not your master. Feed it good thoughts deliberately. Meditate for 5 minutes daily to reclaim your attention.");
        guidanceMap.put("consistency",     "Small daily actions compound into extraordinary results. Show up for your goal every single day — even on hard days.");
        guidanceMap.put("decision_making", "Remove ego and fear from your decision. Ask: what does my clearest, wisest self say? Then act on that answer.");
        guidanceMap.put("peace",           "Peace is found not in getting more, but in needing less. Simplify. Let go of one thing that drains your inner calm today.");
        guidanceMap.put("confidence",      "Confidence is built through action, not thought. Take one small courageous step today. Confidence follows the doing.");
        return guidanceMap.getOrDefault(category, "Walk your path with sincerity, O Devotee. Krishna walks with every sincere seeker.");
    }

    // ── Get categories searched by user ────────────────────
    public List<String> getUserCategories(Long userId) {
        List<UserQuery> queries = userQueryRepository.findByUserId(userId);
        Set<String> categories = new LinkedHashSet<>();
        for (UserQuery q : queries) {
            if (q.getCategory() != null) {
                categories.add(q.getCategory());
            }
        }
        return new ArrayList<>(categories);
    }
}
