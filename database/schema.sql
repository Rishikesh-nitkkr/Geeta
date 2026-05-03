-- ============================================================
--  BHAGAVAD GITA KRISHNA MENTOR - DATABASE SCHEMA
-- ============================================================

CREATE DATABASE IF NOT EXISTS gita_mentor;
USE gita_mentor;

-- ── USERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── SHLOKAS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS shlokas (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    category    VARCHAR(50)   NOT NULL UNIQUE,
    sanskrit    TEXT          NOT NULL,
    meaning     TEXT          NOT NULL,
    explanation TEXT          NOT NULL,
    life_example TEXT         NOT NULL,
    INDEX idx_shlokas_category (category)
);

-- ── USER QUERIES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_queries (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT       NOT NULL,
    query      TEXT         NOT NULL,
    category   VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_queries_user_id (user_id),
    INDEX idx_user_queries_category (category)
);

-- ── UNANSWERED QUERIES ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS unanswered_queries (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    query      TEXT   NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_unanswered_queries_user_id (user_id)
);

-- ── QUIZ QUESTIONS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    category       VARCHAR(50) NOT NULL,
    question       TEXT        NOT NULL,
    option_a       VARCHAR(255) NOT NULL,
    option_b       VARCHAR(255) NOT NULL,
    option_c       VARCHAR(255) NOT NULL,
    option_d       VARCHAR(255) NOT NULL,
    correct_answer CHAR(1)     NOT NULL,
    CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    INDEX idx_quiz_questions_category (category),
    UNIQUE KEY uq_quiz_questions_category_question (category, question(190))
);

-- ============================================================
--  20 BHAGAVAD GITA SHLOKAS DATASET
-- ============================================================
INSERT IGNORE INTO shlokas (category, sanskrit, meaning, explanation, life_example) VALUES

-- 1. STRESS
('stress',
 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय | सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते || 2.48',
 'Perform your duty with equanimity, O Arjuna, abandoning attachment to success and failure. Such equanimity is called Yoga.',
 'Krishna tells us not to get attached to results. Do your work calmly without worrying about outcomes. Stress comes from clinging to results we cannot control.',
 'A student stressed about exam results should focus on studying well, not on the mark. A developer stressed about deployment should focus on writing clean code, not on what the manager will say.'),

-- 2. FEAR
('fear',
 'नायं छिन्दन्ति शस्त्राणि नैनं दहति पावकः | न चैनं क्लेदयन्त्यापो न शोषयति मारुतः || 2.23',
 'The soul cannot be cut by weapons, burned by fire, moistened by water, or dried by the wind.',
 'Your true self — the soul — is indestructible. Fear often comes from thinking we can lose everything. But the deepest part of you can never be destroyed.',
 'When you fear losing your job, reputation, or health, remember: your inner self, your wisdom and values, cannot be taken away. That is your real strength.'),

-- 3. ANGER
('anger',
 'क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः | स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति || 2.63',
 'Anger leads to delusion; delusion leads to loss of memory; loss of memory leads to destruction of intelligence; and destruction of intelligence leads to ruin.',
 'Anger is a chain reaction that destroys your judgment. Once angry, you stop thinking clearly and make terrible decisions.',
 'When you fight with a colleague in anger, you say things you regret. The anger clouded your judgment. Pause, breathe, respond — do not react.'),

-- 4. DISCIPLINE
('discipline',
 'उद्धरेदात्मनाऽत्मानं नात्मानमवसादयेत् | आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः || 6.5',
 'Lift yourself by your own efforts; do not degrade yourself. For the self alone is the friend of the self, and the self alone is the enemy of the self.',
 'You are both your greatest ally and your biggest obstacle. Self-discipline is about choosing to be your own best friend every single day.',
 'Waking up early, skipping junk food, studying instead of scrolling — these small daily choices are you being your own best friend. Laziness is you being your own enemy.'),

-- 5. KARMA
('karma',
 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || 2.47',
 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, and never be attached to inaction.',
 'This is the most famous Gita verse. Focus on your actions, not rewards. Work without obsessing over results.',
 'A programmer should write the best code possible — not just code that looks good enough to get a raise. A farmer should tend his crops well — not just enough to sell at market. The effort is yours; the outcome is God''s.'),

-- 6. MOTIVATION
('motivation',
 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् | स्वधर्मे निधनं श्रेयः परधर्मो भयावहः || 3.35',
 'It is far better to perform one''s own duties imperfectly than to perform another''s duties perfectly. It is better to die in one''s own duty; the duty of another is fraught with fear.',
 'Stop comparing yourself to others. Your unique path, even with its struggles, is better than copying someone else''s journey.',
 'You keep comparing your startup to your friend''s corporate job. But your path is yours. Do your work with full heart — even imperfect, it is more valuable than perfectly mimicking someone else.'),

-- 7. FOCUS
('focus',
 'असंशयं महाबाहो मनो दुर्निग्रहं चलं | अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते || 6.35',
 'Undoubtedly, O mighty-armed one, the mind is difficult to control and restless. But it can be controlled through practice and detachment.',
 'The mind wanders — that is its nature. But through consistent practice and letting go of distractions, focus can be trained.',
 'You cannot focus while studying because your mind jumps to Instagram and Netflix. The solution is not willpower alone — it is practice (daily study habit) plus detachment (phone in another room).'),

-- 8. CONFUSION
('confusion',
 'तस्माद्अज्ञानसंभूतं हृत्स्थं ज्ञानासिनाऽऽत्मनः | छित्त्वैनं संशयं योगमातिष्ठोत्तिष्ठ भारत || 4.42',
 'Therefore, with the sword of knowledge, cut asunder the doubts of the self, which are born of ignorance. Take refuge in Yoga and rise, O Bharata.',
 'Confusion and doubt come from ignorance. The cure is not overthinking — it is gaining knowledge and then taking action.',
 'Confused about which career to choose? Stop scrolling and overthinking. Read, research, speak to people in those fields, then take one clear step forward. Knowledge cuts confusion.'),

-- 9. PURPOSE
('purpose',
 'स्वे स्वे कर्मण्यभिरतः संसिद्धिं लभते नरः | स्वकर्मनिरतः सिद्धिं यथा विन्दति तच्छृणु || 18.45',
 'By devotion to one''s own particular duty, every man can attain perfection. Listen how a man can achieve perfection by such devotion.',
 'Everyone has a unique purpose. When you pursue your own calling with full dedication, you find fulfillment.',
 'A teacher who loves teaching, a coder who loves building, a chef who loves cooking — each finds perfection by going deep into their own calling, not chasing someone else''s dream.'),

-- 10. DUTY
('duty',
 'सहजं कर्म कौन्तेय सदोषमपि न त्यजेत् | सर्वारम्भा हि दोषेण धूमेनाग्निरिवावृताः || 18.48',
 'One should not abandon the duties born of one''s own nature, even if they are imperfect. All undertakings are covered by some fault, as fire is covered by smoke.',
 'Every responsibility comes with imperfections. Don''t abandon your duty because it is hard or messy.',
 'Parenting is hard and imperfect. Leading a team is stressful. But abandoning these responsibilities makes things worse. Fulfil your duties even when they are difficult.'),

-- 11. LEADERSHIP
('leadership',
 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः | स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते || 3.21',
 'Whatever actions a great man performs, common men follow. Whatever standards he sets by exemplary acts, all the world pursues.',
 'Leaders are not followed for their words — they are followed for their actions. People do what they see, not what they are told.',
 'A manager who stays late inspires the team. A founder who respects customers builds a respectful team culture. Leadership is lived, not announced.'),

-- 12. SELF_CONTROL
('self_control',
 'इन्द्रियाणां हि चरतां यन्मनोऽनुविधीयते | तदस्य हरति प्रज्ञां वायुर्नावमिवाम्भसि || 2.67',
 'As a boat on the water is swept away by the wind, even so the intellect of a man is swept away by even one of the wandering senses.',
 'Just one uncontrolled sense — taste, lust, anger, or greed — can sink your entire ship of wisdom.',
 'One bad habit (doom-scrolling, overeating, reactive anger) can derail a disciplined life. Guard every sense. Your focus is your ship.'),

-- 13. DETACHMENT
('detachment',
 'नैनं छिन्दन्ति शस्त्राणि... विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः | निर्ममो निरहङ्कारः स शान्तिमधिगच्छति || 2.71',
 'A person who gives up all desires, moves without longing, without the sense of ''mine'', without ego — that person attains peace.',
 'Detachment does not mean not caring. It means not being enslaved by desires. Act fully, but do not cling.',
 'Work hard on your project but do not define your self-worth by its success. Love your partner but do not become possessive. Engage fully, hold loosely.'),

-- 14. SUCCESS
('success',
 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते | सङ्गात्संजायते कामः कामात्क्रोधोऽभिजायते || 2.62',
 'While contemplating objects of the senses, a person develops attachment to them. From attachment comes desire; from desire, anger arises.',
 'True success starts with controlling what you think about. Obsession over things leads to desire, then frustration, then failure.',
 'Obsessing over competition, money, or status creates anxiety that blocks success. Focus on your work, not on what others have. That clarity is the foundation of real achievement.'),

-- 15. FAILURE
('failure',
 'नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते | स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात् || 2.40',
 'In this path, no effort is ever lost, and there is no failure. Even a little practice of this discipline saves one from the great fear.',
 'Every sincere effort counts. No genuine attempt is wasted, even if the result is not what you wanted.',
 'You built a startup and it failed. But the skills, resilience, and lessons you gained are permanent. That effort saved you from a greater fear — the regret of never having tried.'),

-- 16. MIND_CONTROL
('mind_control',
 'मन एव मनुष्याणां कारणं बन्धमोक्षयोः | बन्धाय विषयासक्तं मुक्त्यै निर्विषयं स्मृतम् || 6.5 (Amrit Bindu)',
 'The mind alone is the cause of bondage and liberation for human beings. The mind attached to sense objects leads to bondage; the mind detached leads to liberation.',
 'Your mind is either your prison or your freedom. The same mind that traps you can also free you — depending on what you feed it.',
 'Feed your mind fear and comparison — you feel trapped. Feed it purpose, gratitude, and learning — you feel free. You choose your mental diet every single day.'),

-- 17. CONSISTENCY
('consistency',
 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते | तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् || 9.22',
 'To those who worship Me with devotion, meditating on My transcendental form, who are always devoted, I carry what they lack and preserve what they have.',
 'Consistent, sincere effort is protected and supported. Devotion to your path — done daily — brings providence.',
 'The person who writes code every day, prays every morning, exercises every week — that consistency itself opens doors. The universe supports those who show up.'),

-- 18. DECISION_MAKING
('decision_making',
 'बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते | तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम् || 2.50',
 'One who acts with wisdom abandons both good and bad deeds. Therefore, devote yourself to Yoga. Yoga is skill in action.',
 'Great decision-making is not about avoiding mistakes — it is about acting with clarity and skill, free from panic or ego.',
 'When you face a hard decision (job change, relationship, investment), do not act from fear or greed. Pause, apply your wisdom, act skillfully. That is Yoga in modern life.'),

-- 19. PEACE
('peace',
 'शान्तिः सर्वत्र विजयते | विहाय कामान्यः सर्वान्... निर्ममो निरहङ्कारः स शान्तिमधिगच्छति || 2.71',
 'Giving up all desires, moving without longing, without ''mine'', without ego — that person attains peace.',
 'Peace is not found in having more — it is found in needing less. Let go of ego and possessiveness.',
 'You feel restless even after getting the promotion, the house, the car. That is because peace is not in acquisition. Peace comes when you stop defining yourself by what you own or achieve.'),

-- 20. CONFIDENCE
('confidence',
 'श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः | ज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति || 4.39',
 'A person of faith, who is devoted to it, and who has subdued the senses, obtains knowledge. Having obtained knowledge, one quickly attains supreme peace.',
 'Confidence grows from sincere effort and self-mastery. When you genuinely work hard and control your impulses, you naturally gain both knowledge and confidence.',
 'Before a big presentation, instead of faking confidence, prepare deeply, control your anxiety, and trust your preparation. That genuine readiness is real confidence — not performance.');

-- ============================================================
--  QUIZ QUESTIONS (3 per category, 60 total)
-- ============================================================
INSERT IGNORE INTO quiz_questions (category, question, option_a, option_b, option_c, option_d, correct_answer) VALUES

-- STRESS
('stress','According to Bhagavad Gita 2.48, what is Yoga?','Performing rituals daily','Acting with equanimity, free from attachment to success or failure','Meditating for hours','Praying to Krishna','B'),
('stress','What causes stress according to the Gita?','Working too much','Attachment to results and outcomes','Lack of sleep','Too many responsibilities','B'),
('stress','The Gita suggests the best way to handle a stressful situation is to?','Quit the task','Pray and wait','Focus on your duty and let go of outcomes','Consult others','C'),

-- FEAR
('fear','What does the Gita say about the soul in verse 2.23?','The soul is mortal','The soul can be harmed by fire and water','The soul cannot be cut, burned, or destroyed','The soul must be protected','C'),
('fear','According to Krishna, where does true fearlessness come from?','Avoiding danger','Understanding that the soul is indestructible','Having money and power','Physical strength','B'),
('fear','Which chapter of the Gita primarily addresses Arjuna''s fear?','Chapter 1','Chapter 3','Chapter 2','Chapter 6','C'),

-- ANGER
('anger','According to Gita 2.63, what does anger lead to first?','Destruction','Delusion / clouded thinking','Loss of memory','Ruin','B'),
('anger','The chain reaction of anger ends in?','Peace','Wisdom','Ruin / self-destruction','Clarity','C'),
('anger','How should one handle anger according to the Gita?','Express it fully','Suppress it completely','Observe it and respond with wisdom, not reaction','Ignore the trigger','C'),

-- DISCIPLINE
('discipline','Gita 6.5 says the self is your own?','Master','Enemy only','Both friend and enemy depending on your choices','Servant','C'),
('discipline','What does ''Uddhared atmanam'' mean?','Surrender to God','Lift yourself up through your own efforts','Follow your guru','Perform rituals','B'),
('discipline','Self-discipline in the Gita means?','Being harsh on yourself','Sacrificing enjoyment','Being your own best ally through consistent right action','Isolating yourself','C'),

-- KARMA
('karma','Gita 2.47 says you have the right to?','The fruits of your actions','Your prescribed duties (action)','Both action and results','Neither action nor results','B'),
('karma','What does ''Ma phaleshu kadachana'' mean?','Do not work hard','Never seek rewards, just act without attachment to outcomes','Always expect reward','Avoid karma','B'),
('karma','According to karma yoga, what should you focus on?','Results alone','The process and quality of action, not the outcome','Neither action nor result','Other people''s actions','B'),

-- MOTIVATION
('motivation','Gita 3.35 says it is better to?','Perform another''s duty perfectly','Perform your own duty imperfectly than another''s perfectly','Never perform duty','Wait for perfect conditions','B'),
('motivation','Why is following your own path important according to Gita?','It is always easier','It aligns with your nature and leads to fulfillment','It impresses others','It requires less effort','B'),
('motivation','Comparing yourself to others, according to the Gita, leads to?','Motivation','Growth','Fear and imitation instead of authentic living','Success','C'),

-- FOCUS
('focus','Gita 6.35 says the mind can be controlled through?','Willpower alone','Ignoring it','Practice and detachment combined','Prayer only','C'),
('focus','Why does the mind wander according to Krishna?','Due to laziness','It is the mind''s natural restless nature','Due to lack of intelligence','Due to bad food','B'),
('focus','What is the best practical application of Gita focus teaching?','Multitask more','Remove distractions and build a daily practice habit','Think harder','Study longer hours','B'),

-- CONFUSION
('confusion','The sword that cuts confusion according to Gita 4.42 is?','Money','Rituals','Knowledge (Jnana)','Social approval','C'),
('confusion','Doubt and confusion are born from?','Too much thinking','Ignorance — lack of clear knowledge','Other people','Bad luck','B'),
('confusion','After gaining knowledge, what must you do with confusion according to the Gita?','Wait','Pray more','Act — rise and move forward','Ask others','C'),

-- PURPOSE
('purpose','Gita 18.45 says perfection is achieved by?','Copying great people','Devotion to one''s own unique duty and path','Hard work alone','Serving others','B'),
('purpose','What is the Gita''s view on purpose?','Everyone''s purpose is the same','Purpose is found by going deep into your own calling','Purpose is fixed at birth','Only warriors have purpose','B'),
('purpose','How does one discover their purpose according to the Gita?','By following trends','By deep dedication to one''s own nature and actions','By asking elders','By reading books alone','B');

-- Confirm data
SELECT COUNT(*) AS total_shlokas FROM shlokas;
SELECT COUNT(*) AS total_quiz_questions FROM quiz_questions;
