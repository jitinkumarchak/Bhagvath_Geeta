// ─── Bhagavad Gita Data ────────────────────────────────────────────────────
// 18 chapters + curated key verses (Sanskrit · Transliteration · Translation)

export const CHAPTERS = [
  { id: 1,  name: "Arjuna Vishada Yoga",     sanskrit: "अर्जुन विषाद योग",     meaning: "The Yoga of Arjuna's Grief",           verses: 47, color: "#8B5CF6" },
  { id: 2,  name: "Sankhya Yoga",            sanskrit: "सांख्य योग",            meaning: "The Yoga of Knowledge",                verses: 72, color: "#F59E0B" },
  { id: 3,  name: "Karma Yoga",              sanskrit: "कर्म योग",              meaning: "The Yoga of Action",                   verses: 43, color: "#EF4444" },
  { id: 4,  name: "Jnana Karma Sanyasa Yoga",sanskrit: "ज्ञान कर्म संन्यास योग",meaning: "The Yoga of Knowledge & Action",       verses: 42, color: "#10B981" },
  { id: 5,  name: "Karma Sanyasa Yoga",      sanskrit: "कर्म संन्यास योग",      meaning: "The Yoga of Renunciation",             verses: 29, color: "#3B82F6" },
  { id: 6,  name: "Atma Samyama Yoga",       sanskrit: "आत्म संयम योग",         meaning: "The Yoga of Self-Control",             verses: 47, color: "#EC4899" },
  { id: 7,  name: "Jnana Vijnana Yoga",      sanskrit: "ज्ञान विज्ञान योग",     meaning: "The Yoga of Wisdom",                   verses: 30, color: "#06B6D4" },
  { id: 8,  name: "Akshara Brahma Yoga",     sanskrit: "अक्षर ब्रह्म योग",      meaning: "The Yoga of the Imperishable",         verses: 28, color: "#F97316" },
  { id: 9,  name: "Raja Vidya Raja Guhya",   sanskrit: "राज विद्या राज गुह्य",  meaning: "The Yoga of Royal Secret",             verses: 34, color: "#A855F7" },
  { id: 10, name: "Vibhuti Yoga",            sanskrit: "विभूति योग",            meaning: "The Yoga of Divine Manifestations",    verses: 42, color: "#14B8A6" },
  { id: 11, name: "Vishvarupa Darshana",     sanskrit: "विश्वरूप दर्शन योग",    meaning: "The Yoga of the Cosmic Form",          verses: 55, color: "#F5C842" },
  { id: 12, name: "Bhakti Yoga",             sanskrit: "भक्ति योग",             meaning: "The Yoga of Devotion",                 verses: 20, color: "#EF4444" },
  { id: 13, name: "Kshetra Kshetrajn Vibhaga",sanskrit:"क्षेत्र क्षेत्रज्ञ योग",meaning: "The Yoga of Field & Its Knower",     verses: 35, color: "#10B981" },
  { id: 14, name: "Gunatraya Vibhaga Yoga",  sanskrit: "गुणत्रय विभाग योग",    meaning: "The Yoga of Three Gunas",              verses: 27, color: "#8B5CF6" },
  { id: 15, name: "Purushottama Yoga",       sanskrit: "पुरुषोत्तम योग",        meaning: "The Yoga of the Supreme Person",       verses: 20, color: "#F59E0B" },
  { id: 16, name: "Daivasura Sampad Vibhaga",sanskrit: "दैवासुर सम्पद् विभाग", meaning: "The Yoga of Divine & Demonic",         verses: 24, color: "#3B82F6" },
  { id: 17, name: "Shraddhatraya Vibhaga",   sanskrit: "श्रद्धात्रय विभाग",     meaning: "The Yoga of Threefold Faith",          verses: 28, color: "#EC4899" },
  { id: 18, name: "Moksha Sanyasa Yoga",     sanskrit: "मोक्ष संन्यास योग",     meaning: "The Yoga of Liberation",               verses: 78, color: "#F5C842" },
];

export const VERSES = [
  // ── Chapter 1 ──────────────────────────────────────────────────────────────
  {
    chapter: 1, verse: 1,
    sanskrit: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||",
    transliteration: "dhṛtarāṣṭra uvāca | dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
    translation: "Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?",
    topics: ["dharma", "duty", "war"],
    emotions: [],
    commentary: "The Gita opens on the battlefield of Kurukshetra — both a physical location and a metaphor for the battlefield of life, where dharma (righteousness) is the ultimate prize."
  },
  {
    chapter: 1, verse: 47,
    sanskrit: "सञ्जय उवाच | एवमुक्त्वार्जुनः संख्ये रथोपस्थ उपाविशत् | विसृज्य सशरं चापं शोकसंविग्नमानसः ||",
    transliteration: "sañjaya uvāca | evam uktvārjunaḥ saṅkhye rathopastha upāviśat | visṛjya sa-śaraṃ cāpaṃ śoka-saṃvigna-mānasaḥ",
    translation: "Sanjaya said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sat down in the chariot, his mind overwhelmed with grief.",
    topics: ["grief", "confusion", "duty"],
    emotions: ["grief", "loss", "anxiety"],
    commentary: "Arjuna's collapse is the catalyst for the entire Gita. His grief is not weakness — it reflects the profound human struggle between love and duty."
  },

  // ── Chapter 2 ──────────────────────────────────────────────────────────────
  {
    chapter: 2, verse: 14,
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः | आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ||",
    transliteration: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ | āgamāpāyino 'nityās tāṃs titikṣasva bhārata",
    translation: "O son of Kunti, the non-permanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer. They arise from sense perception, and one must learn to tolerate them without being disturbed.",
    topics: ["equanimity", "mind", "suffering", "detachment"],
    emotions: ["anxiety", "overthinking", "stress"],
    commentary: "This verse teaches impermanence. Joy and sorrow are like seasons — they come and go. The wise person learns to witness them without being swept away."
  },
  {
    chapter: 2, verse: 20,
    sanskrit: "न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः | अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ||",
    transliteration: "na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato 'yaṃ purāṇo na hanyate hanyamāne śarīre",
    translation: "The soul is never born and never dies. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
    topics: ["soul", "death", "eternity", "atman"],
    emotions: ["grief", "loss", "fear of death"],
    commentary: "Krishna reveals the immortality of the soul (Atman). Death is merely the shedding of the physical body — the soul continues. This is the foundation of all Vedantic philosophy."
  },
  {
    chapter: 2, verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
    transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    topics: ["karma", "duty", "action", "detachment"],
    emotions: ["fear of failure", "anxiety", "career confusion", "overthinking"],
    commentary: "The most famous verse of the Gita. Focus on your actions, not outcomes. Detachment from results is the secret to performing your best without being paralyzed by fear of failure."
  },
  {
    chapter: 2, verse: 48,
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय | सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ||",
    transliteration: "yoga-sthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya | siddhy-asiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate",
    translation: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.",
    topics: ["yoga", "equanimity", "karma", "action"],
    emotions: ["fear of failure", "anxiety", "stress", "perfectionism"],
    commentary: "Yoga is not just physical postures — it is the mental state of equanimity. Performing actions with equal acceptance of success and failure is the highest yoga."
  },
  {
    chapter: 2, verse: 62,
    sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते | सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ||",
    transliteration: "dhyāyato viṣayān puṃsaḥ saṅgas teṣūpajāyate | saṅgāt sañjāyate kāmaḥ kāmāt krodho 'bhijāyate",
    translation: "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
    topics: ["anger", "mind", "desire", "discipline"],
    emotions: ["anger", "lust", "desire"],
    commentary: "Krishna maps the chain reaction: Thought → Attachment → Desire → Anger. Anger is never spontaneous — it is the end of a mental chain you can interrupt at any link."
  },

  // ── Chapter 3 ──────────────────────────────────────────────────────────────
  {
    chapter: 3, verse: 19,
    sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर | असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ||",
    transliteration: "tasmād asaktaḥ satataṃ kāryaṃ karma samācara | asakto hy ācaran karma param āpnoti pūruṣaḥ",
    translation: "Therefore, without attachment, always perform the work that has to be done, for by doing one's work without attachment, one attains the Supreme.",
    topics: ["karma", "action", "detachment", "duty"],
    emotions: ["career confusion", "purposelessness", "laziness"],
    commentary: "Act consistently and without craving for reward. Detached action — doing your best without obsessing over outcomes — is the path to spiritual liberation."
  },
  {
    chapter: 3, verse: 21,
    sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः | स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ||",
    transliteration: "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ | sa yat pramāṇaṃ kurute lokas tad anuvartate",
    translation: "Whatever action a great person does, common people will follow. Whatever standard he sets, all the world follows.",
    topics: ["leadership", "dharma", "duty", "example"],
    emotions: ["career confusion", "purposelessness"],
    commentary: "Leadership is lived, not proclaimed. A leader's actions set the tone for society. This is why personal integrity is not just a private matter — it ripples outward."
  },

  // ── Chapter 4 ──────────────────────────────────────────────────────────────
  {
    chapter: 4, verse: 7,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṃ sṛjāmy aham",
    translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.",
    topics: ["dharma", "divine", "purpose"],
    emotions: ["loss of faith", "purposelessness"],
    commentary: "Krishna promises that truth and righteousness are never permanently extinguished. When darkness grows too deep, the divine intervenes."
  },
  {
    chapter: 4, verse: 8,
    sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम् | धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ||",
    transliteration: "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharma-saṃsthāpanārthāya sambhavāmi yuge yuge",
    translation: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of righteousness, I appear millennium after millennium.",
    topics: ["dharma", "divine", "purpose", "justice"],
    emotions: ["loss of faith", "injustice"],
    commentary: "The universe has a self-correcting mechanism. Injustice cannot last forever. This verse is a source of profound hope in dark times."
  },

  // ── Chapter 6 ──────────────────────────────────────────────────────────────
  {
    chapter: 6, verse: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् | आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ||",
    transliteration: "uddhared ātmanātmānaṃ nātmānam avasādayet | ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
    translation: "One must elevate, not degrade, oneself by one's own mind. The mind is the friend of the conditioned soul, and its enemy as well.",
    topics: ["mind", "discipline", "self-improvement"],
    emotions: ["self-doubt", "overthinking", "anxiety", "depression"],
    commentary: "You are your own best friend and worst enemy — it all depends on your mental discipline. Self-mastery begins with recognizing the mind's dual nature."
  },
  {
    chapter: 6, verse: 6,
    sanskrit: "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः | अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ||",
    transliteration: "bandhur ātmātmanas tasya yenātmaivātmanā jitaḥ | anātmanas tu śatrutve vartetātmaiva śatruvat",
    translation: "For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his very mind will be the greatest enemy.",
    topics: ["mind", "discipline", "self-mastery"],
    emotions: ["self-doubt", "overthinking", "anxiety"],
    commentary: "The mind, when controlled, becomes your greatest ally. When uncontrolled, it becomes the source of all suffering."
  },
  {
    chapter: 6, verse: 35,
    sanskrit: "श्रीभगवानुवाच | असंशयं महाबाहो मनो दुर्निग्रहं चलम् | अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ||",
    transliteration: "śrī-bhagavān uvāca | asaṃśayaṃ mahā-bāho mano durnigrahaṃ calam | abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate",
    translation: "Lord Krishna said: O mighty-armed one, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice (abhyasa) and by detachment (vairagya).",
    topics: ["mind", "meditation", "practice", "discipline"],
    emotions: ["anxiety", "overthinking", "restlessness"],
    commentary: "Even Krishna acknowledges the mind is hard to control. The prescription: consistent practice and detachment. Not willpower — but patient, steady practice."
  },

  // ── Chapter 9 ──────────────────────────────────────────────────────────────
  {
    chapter: 9, verse: 22,
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते | तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ||",
    transliteration: "ananyāś cintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham",
    translation: "For those who worship me with devotion, meditating on my transcendental form, I carry what they lack and preserve what they have.",
    topics: ["devotion", "faith", "divine", "surrender"],
    emotions: ["loneliness", "fear", "loss of faith"],
    commentary: "This is one of the most comforting verses in the Gita. A promise from the Divine: surrender completely and your needs will be taken care of."
  },

  // ── Chapter 11 ─────────────────────────────────────────────────────────────
  {
    chapter: 11, verse: 32,
    sanskrit: "श्रीभगवानुवाच | कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः | ऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः ||",
    transliteration: "śrī-bhagavān uvāca | kālo 'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ | ṛte 'pi tvāṃ na bhaviṣyanti sarve ye 'vasthitāḥ pratyanīkeṣu yodhāḥ",
    translation: "The Supreme Lord said: Time I am, the great destroyer of the worlds, and I have come here to destroy all people. With the exception of you, all the soldiers here on both sides will be slain.",
    topics: ["time", "death", "fate", "eternity"],
    emotions: ["fear", "existential dread", "fear of death"],
    commentary: "Perhaps the most terrifying and profound verse in all literature. Time is the ultimate force — it consumes all. Yet within this destruction lies liberation."
  },

  // ── Chapter 12 ─────────────────────────────────────────────────────────────
  {
    chapter: 12, verse: 13,
    sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च | निर्ममो निरहंकारः समदुःखसुखः क्षमी ||",
    transliteration: "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca | nirmamo nirahaṃkāraḥ sama-duḥkha-sukhaḥ kṣamī",
    translation: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor, who is free from false ego, and who is equal in happiness and distress, is very dear to me.",
    topics: ["compassion", "ego", "equanimity", "relationships"],
    emotions: ["anger", "jealousy", "ego"],
    commentary: "Krishna's ideal devotee is compassionate, egoless, and equanimous. These are not just spiritual virtues — they are the qualities of a truly great human being."
  },

  // ── Chapter 14 ─────────────────────────────────────────────────────────────
  {
    chapter: 14, verse: 6,
    sanskrit: "तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् | सुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ ||",
    transliteration: "tatra sattvaṃ nirmalatvāt prakāśakam anāmayam | sukha-saṅgena badhnāti jñāna-saṅgena cānagha",
    translation: "O sinless one, the mode of goodness, being purer than the others, is illuminating, and it frees one from all sinful reactions. Those situated in this mode develop knowledge, but they become conditioned by the concept of happiness.",
    topics: ["gunas", "mind", "nature", "discipline"],
    emotions: ["confusion", "purposelessness"],
    commentary: "The three Gunas (Sattva, Rajas, Tamas) explain all human behavior. Understanding which mode you're in helps you transcend it."
  },

  // ── Chapter 18 ─────────────────────────────────────────────────────────────
  {
    chapter: 18, verse: 66,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||",
    transliteration: "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja | ahaṃ tvāṃ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
    translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    topics: ["surrender", "devotion", "liberation", "faith"],
    emotions: ["fear", "anxiety", "loss of faith", "grief"],
    commentary: "The charama shloka — the final and supreme instruction of the Gita. Surrender completely and fearlessly. This is the ultimate promise of divine grace."
  },
  {
    chapter: 18, verse: 78,
    sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः | तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ||",
    transliteration: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ | tatra śrīr vijayo bhūtir dhruvā nītir matir mama",
    translation: "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality. That is my opinion.",
    topics: ["victory", "dharma", "divine", "leadership"],
    emotions: ["fear of failure", "self-doubt"],
    commentary: "The Gita closes with a promise: where wisdom and skill unite, victory is assured. This union of spiritual knowledge and practical action is the Gita's final teaching."
  },
];

// ─── Lookups ────────────────────────────────────────────────────────────────

export function getChapter(id) {
  return CHAPTERS.find(c => c.id === Number(id));
}

export function getVersesByChapter(chapterId) {
  return VERSES.filter(v => v.chapter === Number(chapterId));
}

export function getVerse(chapterId, verseNum) {
  return VERSES.find(v => v.chapter === Number(chapterId) && v.verse === Number(verseNum));
}

export function getVersesByTopic(topic) {
  const t = topic.toLowerCase();
  return VERSES.filter(v => v.topics.some(tp => tp.toLowerCase().includes(t)));
}

export function getVersesByEmotion(emotion) {
  const e = emotion.toLowerCase();
  return VERSES.filter(v => v.emotions.some(em => em.toLowerCase().includes(e)));
}

export function searchVerses(query) {
  const q = query.toLowerCase();
  return VERSES.filter(v =>
    v.translation.toLowerCase().includes(q) ||
    v.transliteration.toLowerCase().includes(q) ||
    v.topics.some(t => t.toLowerCase().includes(q)) ||
    v.emotions.some(e => e.toLowerCase().includes(q)) ||
    (v.commentary && v.commentary.toLowerCase().includes(q))
  );
}

export function getDailyVerse() {
  const dayIndex = Math.floor(Date.now() / 86400000) % VERSES.length;
  return VERSES[dayIndex];
}

export const ALL_TOPICS = [...new Set(VERSES.flatMap(v => v.topics))].sort();

export const EMOTIONS = [
  { label: "Anxiety",          emoji: "😰", key: "anxiety" },
  { label: "Fear of Failure",  emoji: "😟", key: "fear of failure" },
  { label: "Anger",            emoji: "😤", key: "anger" },
  { label: "Grief / Loss",     emoji: "💔", key: "grief" },
  { label: "Overthinking",     emoji: "🌀", key: "overthinking" },
  { label: "Career Confusion", emoji: "🧭", key: "career confusion" },
  { label: "Self-Doubt",       emoji: "🪞", key: "self-doubt" },
  { label: "Loss of Faith",    emoji: "🕯️", key: "loss of faith" },
  { label: "Loneliness",       emoji: "🌑", key: "loneliness" },
  { label: "Fear of Death",    emoji: "💀", key: "fear of death" },
  { label: "Stress",           emoji: "⚡", key: "stress" },
  { label: "Purposelessness",  emoji: "🌫️", key: "purposelessness" },
];
