import type { Chapter, GitaVerse, SituationKey } from "./types";

export const situationMap: Record<SituationKey, { label: string; mantra: string; tags: string[] }> = {
  stress: {
    label: "Stress",
    mantra: "Act with calm effort, release the fever of results.",
    tags: ["stress", "anxiety", "exam", "career", "pressure", "results", "duty", "calm"]
  },
  fear: {
    label: "Fear",
    mantra: "Remember the immortal self; courage grows from truth.",
    tags: ["fear", "loss", "uncertainty", "courage", "soul", "identity", "change"]
  },
  overthinking: {
    label: "Overthinking",
    mantra: "Bring the restless mind back with practice and detachment.",
    tags: ["overthinking", "mind", "focus", "confusion", "doubt", "practice", "detachment"]
  },
  failure: {
    label: "Failure",
    mantra: "No sincere effort on the path of dharma is ever wasted.",
    tags: ["failure", "setback", "motivation", "comparison", "growth", "resilience", "purpose"]
  },
  discipline: {
    label: "Discipline",
    mantra: "Become your own friend through steady, loving self-mastery.",
    tags: ["discipline", "habit", "routine", "study", "self-control", "effort", "consistency"]
  }
};

export const gitaVerses: GitaVerse[] = [
  {
    id: "2-47",
    chapter: 2,
    verse: "47",
    chapterTitle: "Sankhya Yoga",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "Karmany evadhikaras te ma phaleshu kadachana; ma karma-phala-hetur bhur ma te sango 'stv akarmani.",
    meaning: "You have a right to action, but never to the fruits of action. Do not make rewards your motive, and do not fall into inaction.",
    guidance: "My child, place your heart in the work before you. The result is not your prison; sincere action is your freedom.",
    practicalAdvice: [
      "For college work, study the next page instead of replaying the result in your mind.",
      "For career pressure, focus on controllable deliverables: skill, consistency, communication.",
      "When emotions rise, ask: what is the next right action I can take calmly?"
    ],
    tags: ["stress", "career", "exam", "results", "duty", "action", "discipline"],
    quote: "Your peace grows when your effort is sincere and your grip on outcomes becomes soft."
  },
  {
    id: "2-48",
    chapter: 2,
    verse: "48",
    chapterTitle: "Sankhya Yoga",
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
    transliteration: "Yogasthah kuru karmani sangam tyaktva dhananjaya; siddhy-asiddhyoh samo bhutva samatvam yoga uchyate.",
    meaning: "Established in yoga, perform your duties while letting go of attachment. Stay balanced in success and failure; such balance is yoga.",
    guidance: "Do not let success inflate you or failure break you. Stand in balance, and let your action become worship.",
    practicalAdvice: [
      "Before a presentation or exam, breathe for one minute and commit to effort, not perfection.",
      "After feedback, separate your worth from the outcome and improve one thing.",
      "Keep a simple work ritual: prepare, act, review, release."
    ],
    tags: ["stress", "balance", "pressure", "work", "failure", "success", "calm"],
    quote: "Equanimity is not coldness; it is strength with a peaceful center."
  },
  {
    id: "2-14",
    chapter: 2,
    verse: "14",
    chapterTitle: "Sankhya Yoga",
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    transliteration: "Matra-sparshas tu kaunteya shitoshna-sukha-duhkha-dah; agamapayino 'nityas tams titikshasva bharata.",
    meaning: "Pleasure and pain arise from sense contact. They come and go; they are temporary. Endure them with wisdom.",
    guidance: "This storm is visiting you; it is not your permanent home. Hold steady until the wave passes.",
    practicalAdvice: [
      "Name the feeling without becoming it: 'stress is here', not 'I am broken'.",
      "Delay impulsive messages or decisions for twenty minutes when emotions peak.",
      "Use discomfort as a cue to breathe, drink water, walk, and return with clarity."
    ],
    tags: ["emotions", "stress", "pain", "resilience", "patience", "overthinking"],
    quote: "A passing feeling does not deserve a permanent decision."
  },
  {
    id: "2-23",
    chapter: 2,
    verse: "23",
    chapterTitle: "Sankhya Yoga",
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः। न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥",
    transliteration: "Nainam chindanti shastrani nainam dahati pavakah; na chainam kledayanty apo na shoshayati marutah.",
    meaning: "The soul cannot be cut by weapons, burned by fire, moistened by water, or dried by wind.",
    guidance: "You are deeper than the situation that frightens you. What is eternal in you cannot be harmed by a temporary defeat.",
    practicalAdvice: [
      "When fear of judgment appears, return to your values and one brave action.",
      "Write what can actually be lost and what remains within your control.",
      "Speak honestly, prepare wisely, and let your inner worth remain untouched."
    ],
    tags: ["fear", "loss", "courage", "identity", "soul", "uncertainty"],
    quote: "Courage begins when you remember you are more than what can be taken."
  },
  {
    id: "2-56",
    chapter: 2,
    verse: "56",
    chapterTitle: "Sankhya Yoga",
    sanskrit: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः। वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥",
    transliteration: "Duhkheshv anudvigna-manah sukheshu vigata-sprihah; vita-raga-bhaya-krodhah sthita-dhir munir uchyate.",
    meaning: "One whose mind is undisturbed in sorrow, free from craving in pleasure, and beyond attachment, fear, and anger is steady in wisdom.",
    guidance: "Let your mind become a lamp protected from wind. Feel deeply, but do not be dragged by every gust.",
    practicalAdvice: [
      "Use a pause before reacting to anger, fear, or craving.",
      "Track emotional triggers and choose one calmer response each week.",
      "Do not make happiness dependent on constant approval."
    ],
    tags: ["fear", "anger", "emotions", "calm", "steady", "maturity"],
    quote: "A steady mind does not deny emotion; it guides emotion."
  },
  {
    id: "2-63",
    chapter: 2,
    verse: "63",
    chapterTitle: "Sankhya Yoga",
    sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
    transliteration: "Krodhad bhavati sammohah sammohat smriti-vibhramah; smriti-bhramshad buddhi-nasho buddhi-nashat pranashyati.",
    meaning: "Anger creates delusion, delusion confuses memory, confused memory destroys intelligence, and destroyed intelligence leads to downfall.",
    guidance: "Do not hand your steering wheel to anger. A moment of heat can burn what took months to build.",
    practicalAdvice: [
      "When angry, step away before texting or speaking.",
      "Use the rule: calm body first, clear words second.",
      "If you hurt someone, repair quickly and learn the trigger."
    ],
    tags: ["anger", "relationship", "emotion", "impulse", "conflict"],
    quote: "Pause is the bridge between emotion and wisdom."
  },
  {
    id: "3-19",
    chapter: 3,
    verse: "19",
    chapterTitle: "Karma Yoga",
    sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर। असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥",
    transliteration: "Tasmad asaktah satatam karyam karma samachara; asakto hy acharan karma param apnoti purushah.",
    meaning: "Therefore, perform the work that must be done without attachment; by acting without attachment, one reaches the highest.",
    guidance: "Discipline becomes sacred when you stop bargaining with every mood and simply honor your duty.",
    practicalAdvice: [
      "Create a small non-negotiable routine: one hour study, one walk, one honest review.",
      "Do not wait for motivation to begin; begin, and motivation will follow.",
      "Make your environment support your duty: remove distractions before work."
    ],
    tags: ["discipline", "habit", "routine", "work", "consistency", "study"],
    quote: "A sacred life is built through ordinary duties done with extraordinary sincerity."
  },
  {
    id: "3-35",
    chapter: 3,
    verse: "35",
    chapterTitle: "Karma Yoga",
    sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥",
    transliteration: "Shreyan sva-dharmo vigunah para-dharmat sv-anushthitat; sva-dharme nidhanam shreyah para-dharmo bhayavahah.",
    meaning: "Better is one's own duty, though imperfect, than another's duty well performed. Another's path brings fear.",
    guidance: "Your path need not look impressive to others to be sacred. Do not abandon your calling because comparison is loud.",
    practicalAdvice: [
      "Choose career decisions by aptitude, values, and service, not only comparison.",
      "Build your strengths daily instead of copying someone else's timeline.",
      "Let failure on your own path teach you more than success in imitation."
    ],
    tags: ["failure", "career", "comparison", "purpose", "motivation", "fear"],
    quote: "The path meant for you may be imperfect, but it carries your soul forward."
  },
  {
    id: "4-7",
    chapter: 4,
    verse: "7",
    chapterTitle: "Jnana Karma Sannyasa Yoga",
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "Yada yada hi dharmasya glanir bhavati bharata; abhyutthanam adharmasya tadatmanam srijamy aham.",
    meaning: "Whenever dharma declines and adharma rises, I manifest Myself.",
    guidance: "Whenever darkness rises within you, call forth your highest self. Divine help appears through courage, clarity, and right action.",
    practicalAdvice: [
      "When life feels chaotic, identify the dharmic action: honest, useful, compassionate.",
      "Ask for help early from mentors, friends, or family.",
      "Create one visible sign of order today: clean desk, written plan, sincere apology."
    ],
    tags: ["purpose", "confusion", "fear", "renewal", "dharma", "hope"],
    quote: "Where dharma is invited, light begins to return."
  },
  {
    id: "4-38",
    chapter: 4,
    verse: "38",
    chapterTitle: "Jnana Karma Sannyasa Yoga",
    sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते। तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
    transliteration: "Na hi jnanena sadrisham pavitram iha vidyate; tat svayam yoga-samsiddhah kalenatmani vindati.",
    meaning: "Nothing in this world is as purifying as knowledge. In time, one perfected in yoga discovers it within.",
    guidance: "Do not demand instant clarity. Keep learning, keep purifying your intention, and wisdom will ripen within you.",
    practicalAdvice: [
      "For confusion, gather facts and give the mind quiet time to integrate them.",
      "Read ten minutes daily from a text that elevates your thinking.",
      "Avoid decisions made only from panic or social pressure."
    ],
    tags: ["confusion", "knowledge", "learning", "career", "decision", "overthinking"],
    quote: "Clarity often arrives after sincere learning and quiet patience."
  },
  {
    id: "4-42",
    chapter: 4,
    verse: "42",
    chapterTitle: "Jnana Karma Sannyasa Yoga",
    sanskrit: "तस्मादज्ञानसम्भूतं हृत्स्थं ज्ञानासिनात्मनः। छित्त्वैनं संशयं योगमातिष्ठोत्तिष्ठ भारत॥",
    transliteration: "Tasmad ajnana-sambhutam hrit-stham jnanasinatmanah; chittvainam samshayam yogam atishthottishtha bharata.",
    meaning: "Cut away doubt born of ignorance with the sword of knowledge. Stand in yoga and arise.",
    guidance: "Do not worship doubt. Study, reflect, choose, and rise. A still heart can make a brave decision.",
    practicalAdvice: [
      "Write your top two options and the dharmic cost of each.",
      "Consult one wise person, then choose a next step within twenty-four hours.",
      "Replace endless analysis with a small experiment."
    ],
    tags: ["overthinking", "confusion", "doubt", "decision", "action", "courage"],
    quote: "Doubt becomes useful only when it leads you toward knowledge and action."
  },
  {
    id: "5-10",
    chapter: 5,
    verse: "10",
    chapterTitle: "Karma Sannyasa Yoga",
    sanskrit: "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः। लिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥",
    transliteration: "Brahmany adhaya karmani sangam tyaktva karoti yah; lipyate na sa papena padma-patram ivambhasa.",
    meaning: "One who offers actions to the Divine and gives up attachment remains untouched, like a lotus leaf by water.",
    guidance: "Let work pass through clean hands and a clean heart. Serve fully, but do not let every outcome stain your peace.",
    practicalAdvice: [
      "Before work, dedicate the task to learning, service, or love.",
      "After work, review honestly and release the rest.",
      "Keep your ethics clean even when shortcuts look attractive."
    ],
    tags: ["work", "stress", "service", "ethics", "detachment", "career"],
    quote: "The lotus teaches action without inner entanglement."
  },
  {
    id: "6-5",
    chapter: 6,
    verse: "5",
    chapterTitle: "Dhyana Yoga",
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration: "Uddhared atmanatmanam natmanam avasadayet; atmaiva hy atmano bandhur atmaiva ripur atmanah.",
    meaning: "Lift yourself by yourself; do not degrade yourself. The self is the friend of the self, and the self is the enemy of the self.",
    guidance: "Speak to yourself as one I love. Discipline is not self-hatred; it is choosing not to abandon your own future.",
    practicalAdvice: [
      "Replace 'I am lazy' with 'I will do the first five minutes now'.",
      "Track one habit for seven days without drama.",
      "Keep promises to yourself small enough to keep and meaningful enough to matter."
    ],
    tags: ["discipline", "habit", "self-control", "study", "routine", "confidence"],
    quote: "Self-mastery begins as self-friendship."
  },
  {
    id: "6-26",
    chapter: 6,
    verse: "26",
    chapterTitle: "Dhyana Yoga",
    sanskrit: "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्। ततस्ततो नियम्यैतदात्मन्येव वशं नयेत्॥",
    transliteration: "Yato yato nishcharati manash chanchalam asthiram; tatas tato niyamyaitad atmany eva vasham nayet.",
    meaning: "Wherever the restless and unsteady mind wanders, bring it back under the control of the Self.",
    guidance: "Do not scold the wandering mind. Gently bring it back, again and again. This returning is the practice.",
    practicalAdvice: [
      "Use a timer for ten focused minutes and return whenever distracted.",
      "During anxiety, bring attention to breath and the next physical action.",
      "Meditation is not a perfect blank mind; it is repeated returning."
    ],
    tags: ["overthinking", "mind", "focus", "meditation", "practice", "anxiety"],
    quote: "Every gentle return is a victory over restlessness."
  },
  {
    id: "6-35",
    chapter: 6,
    verse: "35",
    chapterTitle: "Dhyana Yoga",
    sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्। अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥",
    transliteration: "Asamshayam maha-baho mano durnigraham chalam; abhyasena tu kaunteya vairagyena cha grihyate.",
    meaning: "The mind is undoubtedly restless and difficult to control, but it can be mastered through practice and detachment.",
    guidance: "Your mind is not your enemy; it is untrained energy. Practice gives it direction, detachment gives it space.",
    practicalAdvice: [
      "Put your phone away before deep work, not after you are already distracted.",
      "Practice the same focus window daily until it becomes familiar.",
      "Let unhelpful thoughts pass without feeding them."
    ],
    tags: ["overthinking", "focus", "discipline", "practice", "detachment", "mind"],
    quote: "Practice steadies the mind; detachment frees it."
  },
  {
    id: "7-8",
    chapter: 7,
    verse: "8",
    chapterTitle: "Jnana Vijnana Yoga",
    sanskrit: "रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः। प्रणवः सर्ववेदेषु शब्दः खे पौरुषं नृषु॥",
    transliteration: "Raso 'ham apsu kaunteya prabhasmi shashi-suryayoh; pranavah sarva-vedeshu shabdah khe paurusham nrishu.",
    meaning: "I am the taste in water, the light of the moon and sun, the sacred Om in the Vedas, the sound in space, and strength in people.",
    guidance: "Do not search for the Divine only in faraway heavens. I meet you in breath, light, sound, and the strength to continue.",
    practicalAdvice: [
      "Use ordinary moments as anchors: water, sunlight, breath, a quiet sound.",
      "When lonely, notice one sign of life supporting you right now.",
      "Let gratitude interrupt spirals of lack."
    ],
    tags: ["meditation", "gratitude", "presence", "loneliness", "peace"],
    quote: "The sacred is closer than your next breath."
  },
  {
    id: "8-7",
    chapter: 8,
    verse: "7",
    chapterTitle: "Akshara Brahma Yoga",
    sanskrit: "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च। मय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम्॥",
    transliteration: "Tasmat sarveshu kaleshu mam anusmara yudhya cha; mayy arpita-mano-buddhir mam evaishyasy asamshayam.",
    meaning: "Therefore remember Me at all times and fight. With mind and intellect offered to Me, you shall surely come to Me.",
    guidance: "Spiritual life is not escape from your duties. Remember the Divine, then face your battlefield with dignity.",
    practicalAdvice: [
      "Before a hard task, pause and dedicate your mind to clarity.",
      "Do not avoid responsibility in the name of peace.",
      "Carry devotion into work, study, family, and decisions."
    ],
    tags: ["duty", "career", "discipline", "fear", "devotion", "action"],
    quote: "Remember, then act. Devotion and courage belong together."
  },
  {
    id: "9-22",
    chapter: 9,
    verse: "22",
    chapterTitle: "Raja Vidya Raja Guhya Yoga",
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    transliteration: "Ananyash chintayanto mam ye janah paryupasate; tesham nityabhiyuktanam yoga-kshemam vahamy aham.",
    meaning: "Those who meditate on Me with single-pointed devotion, I carry what they lack and preserve what they have.",
    guidance: "You are not walking alone. When your effort is sincere and your heart remembers Me, support appears in ways you may not expect.",
    practicalAdvice: [
      "Do your part today, then leave space for help to arrive.",
      "Ask for support without shame.",
      "Keep a gratitude log to notice what is being carried for you."
    ],
    tags: ["fear", "faith", "stress", "support", "devotion", "hope"],
    quote: "Faith is not passivity; it is action with the knowledge that grace walks beside you."
  },
  {
    id: "10-20",
    chapter: 10,
    verse: "20",
    chapterTitle: "Vibhuti Yoga",
    sanskrit: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः। अहमादिश्च मध्यं च भूतानामन्त एव च॥",
    transliteration: "Aham atma gudakesha sarva-bhutashaya-sthitah; aham adish cha madhyam cha bhutanam anta eva cha.",
    meaning: "I am the Self seated in the hearts of all beings. I am the beginning, middle, and end of all beings.",
    guidance: "Look within before you collapse into loneliness. The Divine is seated in the quiet chamber of your own heart.",
    practicalAdvice: [
      "Spend two silent minutes with one hand on your heart.",
      "Treat others as carriers of the same sacred presence.",
      "When self-worth drops, remember your inner life is not accidental."
    ],
    tags: ["loneliness", "identity", "self-worth", "meditation", "faith"],
    quote: "The heart is not empty; it is a hidden temple."
  },
  {
    id: "11-33",
    chapter: 11,
    verse: "33",
    chapterTitle: "Vishvarupa Darshana Yoga",
    sanskrit: "तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम्।",
    transliteration: "Tasmat tvam uttishtha yasho labhasva jitva shatrun bhunkshva rajyam samriddham.",
    meaning: "Therefore arise and win glory. Conquer your obstacles and enjoy a flourishing life.",
    guidance: "Rise. The moment is not asking for your perfection; it is asking for your participation.",
    practicalAdvice: [
      "Choose one difficult task and begin before the day ends.",
      "Break large fear into a first visible action.",
      "Let courage be physical: stand up, open the file, make the call."
    ],
    tags: ["fear", "failure", "action", "courage", "motivation", "career"],
    quote: "Sometimes grace sounds like a command: arise."
  },
  {
    id: "12-13",
    chapter: 12,
    verse: "13-14",
    chapterTitle: "Bhakti Yoga",
    sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
    transliteration: "Adveshta sarva-bhutanam maitrah karuna eva cha; nirmamo nirahankarah sama-duhkha-sukhah kshami.",
    meaning: "One who hates none, is friendly and compassionate, free from possessiveness and ego, balanced in pleasure and pain, and forgiving, is dear to Me.",
    guidance: "Let devotion become visible in how gently you treat living beings, including yourself.",
    practicalAdvice: [
      "Choose compassion without becoming passive.",
      "Repair one strained relationship with humility.",
      "Practice self-forgiveness while still taking responsibility."
    ],
    tags: ["relationship", "emotions", "anger", "forgiveness", "devotion", "self-worth"],
    quote: "A devotional heart becomes gentle without becoming weak."
  },
  {
    id: "13-8",
    chapter: 13,
    verse: "8-12",
    chapterTitle: "Kshetra Kshetrajna Vibhaga Yoga",
    sanskrit: "अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम्। आचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः॥",
    transliteration: "Amanitvam adambhitvam ahimsa kshantir arjavam; acharyopasanam shaucham sthairyam atma-vinigrahah.",
    meaning: "Humility, sincerity, nonviolence, patience, straightforwardness, reverence for teachers, purity, steadiness, and self-control are knowledge.",
    guidance: "Knowledge is not only information. It is the quality of the person you become while seeking truth.",
    practicalAdvice: [
      "Practice humility by asking one honest question.",
      "Clean your physical space to support mental clarity.",
      "Use patience as a strength, not a delay."
    ],
    tags: ["discipline", "learning", "humility", "self-control", "growth", "study"],
    quote: "Wisdom is visible in conduct before it is visible in speech."
  },
  {
    id: "14-26",
    chapter: 14,
    verse: "26",
    chapterTitle: "Gunatraya Vibhaga Yoga",
    sanskrit: "मां च योऽव्यभिचारेण भक्तियोगेन सेवते। स गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते॥",
    transliteration: "Mam cha yo 'vyabhicharena bhakti-yogena sevate; sa gunan samatityaitan brahma-bhuyaya kalpate.",
    meaning: "One who serves Me with unwavering devotion rises beyond the modes of nature and becomes fit for Brahman.",
    guidance: "When moods pull you in many directions, anchor yourself in devotion and steady service.",
    practicalAdvice: [
      "Do not obey every mood; observe it and choose your values.",
      "Create one devotional ritual that repeats daily.",
      "Serve someone without seeking applause."
    ],
    tags: ["mood", "discipline", "devotion", "service", "stability", "meditation"],
    quote: "Devotion gives the changing mind a changeless center."
  },
  {
    id: "15-15",
    chapter: 15,
    verse: "15",
    chapterTitle: "Purushottama Yoga",
    sanskrit: "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च।",
    transliteration: "Sarvasya chaham hridi sannivishto mattah smritir jnanam apohanam cha.",
    meaning: "I am seated in everyone's heart. From Me come memory, knowledge, and the removal of doubt.",
    guidance: "When you feel lost, return to the heart. Ask sincerely, listen quietly, and the next thread of wisdom will appear.",
    practicalAdvice: [
      "Journal your question, then sit silently for three breaths before answering.",
      "Notice repeated inner nudges that point toward honesty and service.",
      "For complex decisions, combine prayer, data, and wise counsel."
    ],
    tags: ["confusion", "overthinking", "heart", "knowledge", "memory", "decision"],
    quote: "The heart often knows the direction before the mind knows the map."
  },
  {
    id: "16-21",
    chapter: 16,
    verse: "21",
    chapterTitle: "Daivasura Sampad Vibhaga Yoga",
    sanskrit: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः। कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥",
    transliteration: "Tri-vidham narakasyedam dvaram nashanam atmanah; kamah krodhas tatha lobhas tasmad etat trayam tyajet.",
    meaning: "Desire, anger, and greed are three gates to self-destruction. Therefore one should abandon these three.",
    guidance: "Watch the gates of your inner city. Not every desire deserves entry; not every anger deserves a throne.",
    practicalAdvice: [
      "Before acting, ask whether desire, anger, or greed is driving you.",
      "Use a twenty-four-hour pause for purchases or messages made in intensity.",
      "Practice contentment by naming what is already enough today."
    ],
    tags: ["anger", "desire", "greed", "discipline", "self-control", "impulse"],
    quote: "Freedom begins when impulse stops ruling the inner kingdom."
  },
  {
    id: "17-15",
    chapter: 17,
    verse: "15",
    chapterTitle: "Shraddhatraya Vibhaga Yoga",
    sanskrit: "अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्। स्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते॥",
    transliteration: "Anudvega-karam vakyam satyam priya-hitam cha yat; svadhyayabhyasanam chaiva vang-mayam tapa uchyate.",
    meaning: "Speech that does not disturb, that is truthful, pleasant, and beneficial, along with study, is austerity of speech.",
    guidance: "Let your words be lamps, not weapons. Speak truth in a way that can heal and guide.",
    practicalAdvice: [
      "Before a hard conversation, write the truthful and kind version first.",
      "Avoid sarcasm when you actually need clarity.",
      "Make your online comments pass the test: true, useful, respectful."
    ],
    tags: ["relationship", "anger", "speech", "communication", "truth", "discipline"],
    quote: "Truth becomes divine when it is joined with kindness."
  },
  {
    id: "18-66",
    chapter: 18,
    verse: "66",
    chapterTitle: "Moksha Sannyasa Yoga",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    transliteration: "Sarva-dharman parityajya mam ekam sharanam vraja; aham tvam sarva-papebhyo mokshayishyami ma shuchah.",
    meaning: "Abandon all limited shelters and take refuge in Me alone. I shall liberate you from all sorrow; do not grieve.",
    guidance: "When every path feels tangled, come back to surrender. Do the honest next step and place the burden in My hands.",
    practicalAdvice: [
      "Let go of the need to solve your whole life tonight.",
      "Choose one dharmic action and one act of surrender.",
      "If guilt is heavy, repair what you can and stop punishing what grace can transform."
    ],
    tags: ["fear", "grief", "surrender", "stress", "confusion", "hope", "faith"],
    quote: "Surrender is not giving up; it is giving the burden to the One who can carry it."
  },
  {
    id: "18-78",
    chapter: 18,
    verse: "78",
    chapterTitle: "Moksha Sannyasa Yoga",
    sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
    transliteration: "Yatra yogeshvarah krishno yatra partho dhanur-dharah; tatra shrir vijayo bhutir dhruva nitir matir mama.",
    meaning: "Where Krishna, the Lord of Yoga, and Arjuna, the archer, stand together, there are prosperity, victory, growth, and firm wisdom.",
    guidance: "Let wisdom hold the reins and let courage hold the bow. When devotion and effort stand together, life moves forward.",
    practicalAdvice: [
      "Pair prayer with preparation.",
      "Ask: what is Krishna's wisdom here, and what is Arjuna's action here?",
      "End each day by noting one guidance received and one action taken."
    ],
    tags: ["action", "devotion", "career", "discipline", "growth", "success"],
    quote: "Divine guidance and human effort are meant to walk together."
  }
];

const chapterTitles = [
  "Arjuna Vishada Yoga",
  "Sankhya Yoga",
  "Karma Yoga",
  "Jnana Karma Sannyasa Yoga",
  "Karma Sannyasa Yoga",
  "Dhyana Yoga",
  "Jnana Vijnana Yoga",
  "Akshara Brahma Yoga",
  "Raja Vidya Raja Guhya Yoga",
  "Vibhuti Yoga",
  "Vishvarupa Darshana Yoga",
  "Bhakti Yoga",
  "Kshetra Kshetrajna Vibhaga Yoga",
  "Gunatraya Vibhaga Yoga",
  "Purushottama Yoga",
  "Daivasura Sampad Vibhaga Yoga",
  "Shraddhatraya Vibhaga Yoga",
  "Moksha Sannyasa Yoga"
];

const summaries = [
  "Arjuna's crisis opens the door to spiritual guidance.",
  "The nature of the self, duty, action, and steady wisdom.",
  "Action, responsibility, and work as worship.",
  "Wisdom, divine descent, sacrifice, and doubt removed by knowledge.",
  "Renunciation through pure action and inner detachment.",
  "Meditation, mind training, discipline, and self-mastery.",
  "Knowledge of the Divine in the world and within experience.",
  "Remembering the Divine while fulfilling life's battlefield duties.",
  "The royal secret of devotion, faith, and divine care.",
  "Krishna reveals divine manifestations in all existence.",
  "The universal form and the call to courageous action.",
  "The path of devotion expressed through love and character.",
  "The field, the knower, humility, and qualities of knowledge.",
  "The three gunas and the stabilizing force of devotion.",
  "The supreme person and the Divine seated in the heart.",
  "Divine and destructive tendencies in human life.",
  "Faith, speech, discipline, and purity of intention.",
  "Final synthesis: surrender, wisdom, action, and liberation."
];

export const chapters: Chapter[] = chapterTitles.map((title, index) => ({
  number: index + 1,
  title,
  summary: summaries[index],
  verses: gitaVerses.filter((verse) => verse.chapter === index + 1)
}));

export const wisdomQuotes = gitaVerses.map((verse) => ({
  id: verse.id,
  text: verse.quote,
  reference: `Bhagavad Gita ${verse.chapter}.${verse.verse}`
}));

export const galleryImages = [
  {
    id: "krishna-eye-art",
    title: "Divine Eye",
    image: "/assets/user-media/krishna-eye-art.jpg",
    focus: "object-center",
    description: "A close devotional gaze with flute, blue tones, and gold texture."
  },
  {
    id: "krishna-eyes-blue",
    title: "Inner Vision",
    image: "/assets/user-media/krishna-eyes-blue.jpg",
    focus: "object-center",
    description: "A calm eye-study for stillness, reflection, and presence."
  },
  {
    id: "krishna-cosmic-gold",
    title: "Cosmic Dharma",
    image: "/assets/user-media/krishna-cosmic-gold.jpg",
    focus: "object-center",
    description: "A powerful golden silhouette for courage and divine protection."
  },
  {
    id: "krishna-cosmic-blue",
    title: "Sudarshan Sky",
    image: "/assets/user-media/krishna-cosmic-blue.jpg",
    focus: "object-center",
    description: "A blue celestial scene with sacred movement and cosmic light."
  },
  {
    id: "krishna-forest-flute",
    title: "Forest Flute",
    image: "/assets/user-media/krishna-forest-flute.jpg",
    focus: "object-center",
    description: "A soft blue forest meditation image for calm listening."
  },
  {
    id: "krishna-closed-eyes",
    title: "Silent Flute",
    image: "/assets/user-media/krishna-closed-eyes.jpg",
    focus: "object-center",
    description: "A peaceful closed-eye portrait for surrender and breath."
  },
  {
    id: "krishna-face-flute",
    title: "Direct Presence",
    image: "/assets/user-media/krishna-face-flute.jpg",
    focus: "object-center",
    description: "A front-facing devotional image with soft focus and flute."
  },
  {
    id: "krishna-peacock-flute",
    title: "Peacock Prayer",
    image: "/assets/user-media/krishna-peacock-flute.jpg",
    focus: "object-center",
    description: "Peacock feathers, closed eyes, flute, and quiet devotion."
  }
];
