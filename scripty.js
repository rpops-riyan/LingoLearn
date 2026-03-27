const STORAGE_KEY = "lingoLearnPrototypeStateV1";
const BACKEND_BASE_URL =
  (window.lingoDesktop && typeof window.lingoDesktop.getBackendBaseUrl === "function"
    ? window.lingoDesktop.getBackendBaseUrl()
    : null) || "";

const languageOptions = [
  { key: "english", native: "English", accent: "Core interface" },
  { key: "spanish", native: "Español", accent: "Interfaz cálida" },
  { key: "french", native: "Français", accent: "Interface élégante" },
  { key: "latin", native: "Latina", accent: "Lingua classica" },
  { key: "gujarati", native: "ગુજરાતી", accent: "ઘર જેવી ભાષા" },
  { key: "hindi", native: "हिन्दी", accent: "सरल इंटरफ़ेस" },
];

const levelBands = [
  {
    key: "beginner",
    title: {
      english: "Beginner",
      spanish: "Principiante",
      french: "Débutant",
      latin: "Incipiens",
      gujarati: "શરૂઆત",
      hindi: "शुरुआती",
    },
    copy: "Start with recognition, meanings, and quick wins.",
  },
  {
    key: "intermediate",
    title: {
      english: "Intermediate",
      spanish: "Intermedio",
      french: "Intermédiaire",
      latin: "Medius",
      gujarati: "મધ્યમ",
      hindi: "मध्यम",
    },
    copy: "Build recall speed, short phrases, and confidence.",
  },
  {
    key: "advanced",
    title: {
      english: "Advanced",
      spanish: "Avanzado",
      french: "Avancé",
      latin: "Provectus",
      gujarati: "ઉન્નત",
      hindi: "उन्नत",
    },
    copy: "Work through mixed contexts, challenge prompts, and longer answers.",
  },
  {
    key: "expert",
    title: {
      english: "Expert",
      spanish: "Experto",
      french: "Expert",
      latin: "Peritus",
      gujarati: "નિષ્ણાત",
      hindi: "विशेषज्ञ",
    },
    copy: "Tackle nuance, exam-style questions, and mastery drills.",
  },
];

const glosses = {
  hello: {
    english: "hello",
    spanish: "hola",
    french: "bonjour",
    latin: "salve",
    gujarati: "નમસ્તે",
    hindi: "नमस्ते",
  },
  water: {
    english: "water",
    spanish: "agua",
    french: "eau",
    latin: "aqua",
    gujarati: "પાણી",
    hindi: "पानी",
  },
  friend: {
    english: "friend",
    spanish: "amigo",
    french: "ami",
    latin: "amicus",
    gujarati: "મિત્ર",
    hindi: "मित्र",
  },
  thankYou: {
    english: "thank you",
    spanish: "gracias",
    french: "merci",
    latin: "gratias",
    gujarati: "આભાર",
    hindi: "धन्यवाद",
  },
  house: {
    english: "house",
    spanish: "casa",
    french: "maison",
    latin: "domus",
    gujarati: "ઘર",
    hindi: "घर",
  },
  wisdom: {
    english: "wisdom",
    spanish: "sabiduría",
    french: "sagesse",
    latin: "sapientia",
    gujarati: "જ્ઞાન",
    hindi: "ज्ञान",
  },
  school: {
    english: "school",
    spanish: "escuela",
    french: "école",
    latin: "schola",
    gujarati: "શાળા",
    hindi: "स्कूल",
  },
  book: {
    english: "book",
    spanish: "libro",
    french: "livre",
    latin: "liber",
    gujarati: "પુસ્તક",
    hindi: "किताब",
  },
};

const lessonBank = {
  latin: [
    { front: "salve", glossKey: "hello", band: "beginner" },
    { front: "aqua", glossKey: "water", band: "beginner" },
    { front: "amicus", glossKey: "friend", band: "intermediate" },
    { front: "gratias", glossKey: "thankYou", band: "intermediate" },
    { front: "domus", glossKey: "house", band: "advanced" },
    { front: "schola", glossKey: "school", band: "advanced" },
    { front: "sapientia", glossKey: "wisdom", band: "expert" },
    { front: "liber", glossKey: "book", band: "expert" },
  ],
  spanish: [
    { front: "hola", glossKey: "hello", band: "beginner" },
    { front: "agua", glossKey: "water", band: "beginner" },
    { front: "amigo", glossKey: "friend", band: "intermediate" },
    { front: "gracias", glossKey: "thankYou", band: "intermediate" },
    { front: "casa", glossKey: "house", band: "advanced" },
    { front: "escuela", glossKey: "school", band: "advanced" },
    { front: "sabiduría", glossKey: "wisdom", band: "expert" },
    { front: "libro", glossKey: "book", band: "expert" },
  ],
  english: [
    { front: "hello", glossKey: "hello", band: "beginner" },
    { front: "water", glossKey: "water", band: "beginner" },
    { front: "friend", glossKey: "friend", band: "intermediate" },
    { front: "thank you", glossKey: "thankYou", band: "intermediate" },
    { front: "house", glossKey: "house", band: "advanced" },
    { front: "school", glossKey: "school", band: "advanced" },
    { front: "wisdom", glossKey: "wisdom", band: "expert" },
    { front: "book", glossKey: "book", band: "expert" },
  ],
  gujarati: [
    { front: "નમસ્તે", glossKey: "hello", band: "beginner" },
    { front: "પાણી", glossKey: "water", band: "beginner" },
    { front: "મિત્ર", glossKey: "friend", band: "intermediate" },
    { front: "આભાર", glossKey: "thankYou", band: "intermediate" },
    { front: "ઘર", glossKey: "house", band: "advanced" },
    { front: "શાળા", glossKey: "school", band: "advanced" },
    { front: "જ્ઞાન", glossKey: "wisdom", band: "expert" },
    { front: "પુસ્તક", glossKey: "book", band: "expert" },
  ],
  hindi: [
    { front: "नमस्ते", glossKey: "hello", band: "beginner" },
    { front: "पानी", glossKey: "water", band: "beginner" },
    { front: "मित्र", glossKey: "friend", band: "intermediate" },
    { front: "धन्यवाद", glossKey: "thankYou", band: "intermediate" },
    { front: "घर", glossKey: "house", band: "advanced" },
    { front: "स्कूल", glossKey: "school", band: "advanced" },
    { front: "ज्ञान", glossKey: "wisdom", band: "expert" },
    { front: "किताब", glossKey: "book", band: "expert" },
  ],
  french: [
    { front: "bonjour", glossKey: "hello", band: "beginner" },
    { front: "eau", glossKey: "water", band: "beginner" },
    { front: "ami", glossKey: "friend", band: "intermediate" },
    { front: "merci", glossKey: "thankYou", band: "intermediate" },
    { front: "maison", glossKey: "house", band: "advanced" },
    { front: "école", glossKey: "school", band: "advanced" },
    { front: "sagesse", glossKey: "wisdom", band: "expert" },
    { front: "livre", glossKey: "book", band: "expert" },
  ],
};

const translations = {
  english: {
    eyebrow: "Mint Green Language Learning Studio",
    brandTitle: "LingoLearn",
    interfaceLanguageLabel: "Interface language",
    logoutButton: "Log Out",
    prototypeTag: "Desktop prototype",
    heroTitle: "Learn languages from first flashcard to expert mastery.",
    heroSubtitle:
      "Pick the language you already know, sign in as a student or teacher, and unlock guided lessons, AI-style practice, tests, streaks, and support.",
    statLanguages: "Study languages",
    statLevels: "Difficulty bands",
    statRoles: "Account types",
    pickHomeLanguageTitle: "1. Pick the language you use most",
    pickHomeLanguageText: "The interface, prompts, and flashcard meanings update to match your chosen language.",
    pickRoleTitle: "2. Choose your account type",
    personalRole: "Personal",
    studentRole: "Student",
    teacherRole: "Teacher",
    personalPrice: "£3.99 per month",
    studentPrice: "£3.99 per month",
    teacherPrice: "£2.99 per student monthly",
    loginTab: "Login",
    createTab: "Create Account",
    nameLabel: "Full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginCta: "Login to app",
    createCta: "Create account",
    authHint: "Premium lessons unlock after Stripe confirms an active subscription.",
    welcomeStatus: "Ready to create your language learning workspace.",
    studyLanguageLabel: "Study language",
    streakLabel: "Current streak",
    accessLabel: "Access",
    navDashboard: "Dashboard",
    navFlashcards: "Flashcards",
    navPractice: "Practice Hub",
    navTests: "Tests",
    navTeacher: "Teacher Hub",
    navPayments: "Payments",
    dashboardTitle: "Your learning dashboard",
    flashcardsTitle: "Flashcards and guided progression",
    practiceTitle: "AI-generated drills, review, and streak work",
    testsTitle: "Select a test difficulty and start",
    teacherTitle: "Set assignments like a classroom learning platform",
    paymentsTitle: "Connect cards and recurring billing safely with Stripe",
    paymentStatusLocked: "Premium features stay locked until a confirmed subscription is active.",
    accessLocked: "Premium locked",
    accessActive: "Premium active",
    checkoutHint: "Stripe Checkout opens in your browser, and the app can recheck billing when you return.",
    paymentSeatCountLabel: "Teacher seats for billing",
    startCheckoutButton: "Start secure checkout",
    refreshSubscriptionButton: "Refresh billing status",
    openPortalButton: "Manage billing",
    generatePracticeButton: "Generate new practice",
    generateTestButton: "Build test",
    markTestButton: "Mark answers",
    testReadyStatus: "Choose a difficulty to generate questions.",
    refreshButton: "Refresh",
    flipCardButton: "Flip",
    nextCardButton: "Next card",
    securityTitle: "Security note",
    securityText: "Keep AI keys and payment secrets on a server, never in the Electron frontend.",
  },
  spanish: {
    eyebrow: "Estudio de idiomas en verde menta",
    interfaceLanguageLabel: "Idioma de la interfaz",
    logoutButton: "Cerrar sesión",
    prototypeTag: "Prototipo de escritorio",
    heroTitle: "Aprende idiomas desde la primera tarjeta hasta el nivel experto.",
    heroSubtitle:
      "Elige el idioma que ya conoces, entra como estudiante o profesor y desbloquea lecciones, práctica estilo IA, pruebas, rachas y ayuda.",
    statLanguages: "Idiomas de estudio",
    statLevels: "Niveles",
    statRoles: "Tipos de cuenta",
    pickHomeLanguageTitle: "1. Elige el idioma que usas más",
    pickHomeLanguageText: "La interfaz, las indicaciones y los significados cambian para coincidir con tu idioma elegido.",
    pickRoleTitle: "2. Elige tu tipo de cuenta",
    personalRole: "Personal",
    studentRole: "Estudiante",
    teacherRole: "Profesor",
    personalPrice: "£3.99 al mes",
    loginTab: "Entrar",
    createTab: "Crear cuenta",
    nameLabel: "Nombre completo",
    emailLabel: "Correo",
    passwordLabel: "Contraseña",
    loginCta: "Entrar a la app",
    createCta: "Crear cuenta",
    studyLanguageLabel: "Idioma de estudio",
    streakLabel: "Racha actual",
    accessLabel: "Acceso",
    navDashboard: "Panel",
    navFlashcards: "Tarjetas",
    navPractice: "Práctica",
    navTests: "Pruebas",
    navTeacher: "Panel docente",
    navPayments: "Pagos",
    dashboardTitle: "Tu panel de aprendizaje",
    flashcardsTitle: "Tarjetas y progreso guiado",
    practiceTitle: "Ejercicios, repaso y racha generados por IA",
    testsTitle: "Elige la dificultad y empieza",
    teacherTitle: "Crea tareas como una plataforma de aula",
    paymentsTitle: "Conecta tarjetas y cobros mensuales con Stripe de forma segura",
    paymentStatusLocked: "Las funciones premium seguirán bloqueadas hasta confirmar una suscripción.",
    accessLocked: "Premium bloqueado",
    accessActive: "Premium activo",
    checkoutHint: "Stripe Checkout se abre en tu navegador y la app puede revisar la suscripción cuando vuelvas.",
    generatePracticeButton: "Generar práctica",
    generateTestButton: "Crear prueba",
    markTestButton: "Corregir respuestas",
    refreshButton: "Actualizar",
    flipCardButton: "Girar",
    nextCardButton: "Siguiente tarjeta",
    securityTitle: "Nota de seguridad",
    securityText: "Guarda las claves de IA y de pago en un servidor, nunca en el frontend de Electron.",
  },
  french: {
    eyebrow: "Studio d'apprentissage vert menthe",
    interfaceLanguageLabel: "Langue de l'interface",
    logoutButton: "Se déconnecter",
    prototypeTag: "Prototype bureau",
    heroTitle: "Apprends les langues de la première carte jusqu'au niveau expert.",
    heroSubtitle:
      "Choisis la langue que tu connais déjà, connecte-toi comme élève ou enseignant, puis débloque les leçons, la pratique, les tests, les séries et l'aide.",
    statLanguages: "Langues d'étude",
    statLevels: "Niveaux",
    statRoles: "Types de compte",
    pickHomeLanguageTitle: "1. Choisis la langue que tu utilises le plus",
    pickHomeLanguageText: "L'interface, les messages et les sens des cartes changent selon ta langue choisie.",
    pickRoleTitle: "2. Choisis ton type de compte",
    personalRole: "Personnel",
    studentRole: "Élève",
    teacherRole: "Enseignant",
    personalPrice: "£3.99 par mois",
    loginTab: "Connexion",
    createTab: "Créer un compte",
    nameLabel: "Nom complet",
    emailLabel: "E-mail",
    passwordLabel: "Mot de passe",
    loginCta: "Se connecter",
    createCta: "Créer le compte",
    studyLanguageLabel: "Langue étudiée",
    streakLabel: "Série actuelle",
    accessLabel: "Accès",
    navDashboard: "Tableau de bord",
    navFlashcards: "Cartes",
    navPractice: "Pratique",
    navTests: "Tests",
    navTeacher: "Espace enseignant",
    navPayments: "Paiements",
    dashboardTitle: "Ton tableau de bord",
    flashcardsTitle: "Cartes et progression guidée",
    practiceTitle: "Exercices, révision et série générés par IA",
    testsTitle: "Choisis une difficulté et lance le test",
    teacherTitle: "Crée des devoirs comme une plateforme scolaire",
    paymentsTitle: "Connecte cartes et abonnements en toute sécurité avec Stripe",
    paymentStatusLocked: "Les fonctions premium restent bloquées jusqu'à la confirmation d'un abonnement.",
    accessLocked: "Premium bloqué",
    accessActive: "Premium actif",
    checkoutHint: "Stripe Checkout s'ouvre dans ton navigateur et l'app peut revérifier l'abonnement à ton retour.",
    generatePracticeButton: "Générer la pratique",
    generateTestButton: "Créer un test",
    markTestButton: "Corriger",
    refreshButton: "Actualiser",
    flipCardButton: "Retourner",
    nextCardButton: "Carte suivante",
    securityTitle: "Note de sécurité",
    securityText: "Garde les clés IA et paiement sur un serveur, jamais dans le frontend Electron.",
  },
  latin: {
    eyebrow: "Officina linguarum viridis",
    interfaceLanguageLabel: "Lingua interfaciei",
    logoutButton: "Exire",
    prototypeTag: "Prototypum desktop",
    heroTitle: "Disce linguas ab prima tabella usque ad peritiam.",
    heroSubtitle:
      "Elige linguam notam, intra ut discipulus aut magister, et aperi lectiones, exercitationes, probationes, series et auxilium.",
    pickHomeLanguageTitle: "1. Elige linguam quam saepissime uteris",
    pickHomeLanguageText: "Interfacies et interpretationes mutabuntur secundum linguam electam.",
    pickRoleTitle: "2. Elige rationem tuam",
    personalRole: "Privatus",
    studentRole: "Discipulus",
    teacherRole: "Magister",
    personalPrice: "£3.99 per mensem",
    loginTab: "Intra",
    createTab: "Crea rationem",
    nameLabel: "Nomen plenum",
    emailLabel: "Inscriptio",
    passwordLabel: "Tessera",
    loginCta: "Intra in app",
    createCta: "Crea rationem",
    studyLanguageLabel: "Lingua studii",
    streakLabel: "Series hodierna",
    accessLabel: "Accessus",
    navDashboard: "Tabula",
    navFlashcards: "Tabellae",
    navPractice: "Exercitatio",
    navTests: "Probationes",
    navTeacher: "Hub magistri",
    navPayments: "Solutiones",
    dashboardTitle: "Tabula tua studii",
    flashcardsTitle: "Tabellae et progressio",
    practiceTitle: "Exercitationes generatae",
    testsTitle: "Difficultatem elige et incipe",
    teacherTitle: "Pensa institue sicut magistri systema",
    paymentsTitle: "Chartas et subscriptiones tuto cum Stripe coniunge",
    accessLocked: "Premium clausum",
    accessActive: "Premium apertum",
    checkoutHint: "Stripe Checkout in navigatro aperitur et app solutionem cum redis iterum inspicere potest.",
  },
  gujarati: {
    eyebrow: "મિન્ટ લીલું ભાષા શિક્ષણ સ્ટુડિયો",
    interfaceLanguageLabel: "ઇન્ટરફેસ ભાષા",
    logoutButton: "લૉગ આઉટ",
    prototypeTag: "ડેસ્કટોપ પ્રોટોટાઇપ",
    heroTitle: "પહેલી ફ્લેશકાર્ડથી નિષ્ણાત સ્તર સુધી ભાષાઓ શીખો.",
    heroSubtitle:
      "તમને આવડતી ભાષા પસંદ કરો, વિદ્યાર્થી અથવા શિક્ષક તરીકે લૉગિન કરો અને પાઠ, પ્રેક્ટિસ, ટેસ્ટ, સ્ટ્રીક અને મદદ મેળવો.",
    statLanguages: "અભ્યાસ ભાષાઓ",
    statLevels: "સ્તરો",
    statRoles: "એકાઉન્ટ પ્રકાર",
    pickHomeLanguageTitle: "1. તમે સૌથી વધુ વાપરો તે ભાષા પસંદ કરો",
    pickHomeLanguageText: "ઇન્ટરફેસ, સૂચનો અને અર્થો તમારી પસંદગી મુજબ બદલાશે.",
    pickRoleTitle: "2. તમારું એકાઉન્ટ પ્રકાર પસંદ કરો",
    personalRole: "પર્સનલ",
    studentRole: "વિદ્યાર્થી",
    teacherRole: "શિક્ષક",
    personalPrice: "£3.99 પ્રતિ મહિનો",
    loginTab: "લૉગિન",
    createTab: "એકાઉન્ટ બનાવો",
    nameLabel: "પૂર્ણ નામ",
    emailLabel: "ઇમેઇલ",
    passwordLabel: "પાસવર્ડ",
    loginCta: "એપમાં લૉગિન કરો",
    createCta: "એકાઉન્ટ બનાવો",
    studyLanguageLabel: "અભ્યાસ ભાષા",
    streakLabel: "હાલની સ્ટ્રીક",
    accessLabel: "ઍક્સેસ",
    navDashboard: "ડેશબોર્ડ",
    navFlashcards: "ફ્લેશકાર્ડ",
    navPractice: "પ્રેક્ટિસ હબ",
    navTests: "ટેસ્ટ",
    navTeacher: "ટીચર હબ",
    navPayments: "ચુકવણી",
    dashboardTitle: "તમારું શીખવાનું ડેશબોર્ડ",
    flashcardsTitle: "ફ્લેશકાર્ડ અને માર્ગદર્શિત પ્રગતિ",
    practiceTitle: "AI જેવી પ્રેક્ટિસ, રિવિઝન અને સ્ટ્રીક કામ",
    testsTitle: "ટેસ્ટ કઠિનતા પસંદ કરો અને શરૂ કરો",
    teacherTitle: "વર્ગખંડ પ્લેટફોર્મ જેવી એસાઇન્મેન્ટ બનાવો",
    paymentsTitle: "કાર્ડ અને સબ્સ્ક્રિપ્શન Stripe સાથે સુરક્ષિત રીતે જોડો",
    paymentStatusLocked: "ચૂકવણીની પુષ્ટિ સુધી પ્રીમિયમ ફીચર્સ લોક રહેશે.",
    accessLocked: "પ્રીમિયમ લોક",
    accessActive: "પ્રીમિયમ ચાલુ",
    checkoutHint: "Stripe Checkout તમારા બ્રાઉઝરમાં ખૂલશે અને તમે પાછા આવો ત્યારે એપ ફરીથી બિલિંગ ચેક કરી શકશે.",
    generatePracticeButton: "નવી પ્રેક્ટિસ બનાવો",
    generateTestButton: "ટેસ્ટ બનાવો",
    markTestButton: "જવાબ ચેક કરો",
    refreshButton: "રિફ્રેશ",
    flipCardButton: "ફ્લિપ કરો",
    nextCardButton: "આગળનું કાર્ડ",
    securityTitle: "સુરક્ષા નોંધ",
    securityText: "AI કી અને પેમેન્ટ સિક્રેટ્સ સર્વર પર રાખો, Electron frontendમાં નહીં.",
  },
  hindi: {
    eyebrow: "मिंट ग्रीन भाषा सीखने का स्टूडियो",
    interfaceLanguageLabel: "इंटरफ़ेस भाषा",
    logoutButton: "लॉग आउट",
    prototypeTag: "डेस्कटॉप प्रोटोटाइप",
    heroTitle: "पहले फ्लैशकार्ड से विशेषज्ञ स्तर तक भाषाएँ सीखें।",
    heroSubtitle:
      "जो भाषा आपको पहले से आती है उसे चुनें, छात्र या शिक्षक के रूप में लॉगिन करें, और पाठ, अभ्यास, टेस्ट, स्ट्रीक और सहायता खोलें।",
    statLanguages: "अध्ययन भाषाएँ",
    statLevels: "स्तर",
    statRoles: "खाता प्रकार",
    pickHomeLanguageTitle: "1. वह भाषा चुनें जिसे आप सबसे अधिक उपयोग करते हैं",
    pickHomeLanguageText: "इंटरफ़ेस, संकेत और फ्लैशकार्ड के अर्थ आपकी चुनी हुई भाषा के अनुसार बदलेंगे।",
    pickRoleTitle: "2. अपना खाता प्रकार चुनें",
    personalRole: "पर्सनल",
    studentRole: "छात्र",
    teacherRole: "शिक्षक",
    personalPrice: "£3.99 प्रति माह",
    loginTab: "लॉगिन",
    createTab: "खाता बनाएँ",
    nameLabel: "पूरा नाम",
    emailLabel: "ईमेल",
    passwordLabel: "पासवर्ड",
    loginCta: "ऐप में लॉगिन करें",
    createCta: "खाता बनाएँ",
    studyLanguageLabel: "अध्ययन भाषा",
    streakLabel: "मौजूदा स्ट्रीक",
    accessLabel: "एक्सेस",
    navDashboard: "डैशबोर्ड",
    navFlashcards: "फ्लैशकार्ड",
    navPractice: "प्रैक्टिस हब",
    navTests: "टेस्ट",
    navTeacher: "टीचर हब",
    navPayments: "भुगतान",
    dashboardTitle: "आपका लर्निंग डैशबोर्ड",
    flashcardsTitle: "फ्लैशकार्ड और मार्गदर्शित प्रगति",
    practiceTitle: "AI-जनित अभ्यास, रिविज़न और स्ट्रीक कार्य",
    testsTitle: "टेस्ट कठिनाई चुनें और शुरू करें",
    teacherTitle: "कक्षा प्लेटफ़ॉर्म की तरह असाइनमेंट बनाइए",
    paymentsTitle: "कार्ड और आवर्ती बिलिंग को Stripe के साथ सुरक्षित रूप से जोड़ें",
    paymentStatusLocked: "प्रीमियम सुविधाएँ तभी खुलेंगी जब सदस्यता की पुष्टि हो जाएगी।",
    accessLocked: "प्रीमियम लॉक",
    accessActive: "प्रीमियम सक्रिय",
    checkoutHint: "Stripe Checkout आपके ब्राउज़र में खुलेगा और वापस आने पर ऐप बिलिंग फिर से जांच सकती है।",
    generatePracticeButton: "नई प्रैक्टिस बनाएँ",
    generateTestButton: "टेस्ट बनाइए",
    markTestButton: "उत्तर जाँचें",
    refreshButton: "रीफ्रेश",
    flipCardButton: "पलटें",
    nextCardButton: "अगला कार्ड",
    securityTitle: "सुरक्षा नोट",
    securityText: "AI keys और payment secrets हमेशा server पर रखें, Electron frontend में नहीं।",
  },
};

const difficultyLabels = {
  easy: {
    english: "Easy",
    spanish: "Fácil",
    french: "Facile",
    latin: "Facilis",
    gujarati: "સરળ",
    hindi: "आसान",
  },
  medium: {
    english: "Medium",
    spanish: "Medio",
    french: "Moyen",
    latin: "Medius",
    gujarati: "મધ્યમ",
    hindi: "मध्यम",
  },
  hard: {
    english: "Hard",
    spanish: "Difícil",
    french: "Difficile",
    latin: "Difficilis",
    gujarati: "કઠિન",
    hindi: "कठिन",
  },
  expert: {
    english: "Expert",
    spanish: "Experto",
    french: "Expert",
    latin: "Peritus",
    gujarati: "નિષ્ણાત",
    hindi: "विशेषज्ञ",
  },
};

const dom = {
  interfaceLanguagePicker: document.getElementById("interfaceLanguagePicker"),
  heroLanguagePicker: document.getElementById("heroLanguagePicker"),
  personalRoleButton: document.getElementById("personalRoleButton"),
  studentRoleButton: document.getElementById("studentRoleButton"),
  teacherRoleButton: document.getElementById("teacherRoleButton"),
  loginTab: document.getElementById("loginTab"),
  createTab: document.getElementById("createTab"),
  nameFieldWrapper: document.getElementById("nameFieldWrapper"),
  nameInput: document.getElementById("nameInput"),
  emailInput: document.getElementById("emailInput"),
  passwordInput: document.getElementById("passwordInput"),
  authForm: document.getElementById("authForm"),
  authSubmit: document.getElementById("authSubmit"),
  authStatus: document.getElementById("authStatus"),
  welcomePanel: document.getElementById("welcomePanel"),
  workspace: document.getElementById("workspace"),
  logoutButton: document.getElementById("logoutButton"),
  profileGreeting: document.getElementById("profileGreeting"),
  profileName: document.getElementById("profileName"),
  profileEmail: document.getElementById("profileEmail"),
  studyLanguageSelect: document.getElementById("studyLanguageSelect"),
  streakValue: document.getElementById("streakValue"),
  accessBadge: document.getElementById("accessBadge"),
  roleBadge: document.getElementById("roleBadge"),
  navButtons: [...document.querySelectorAll(".nav-button")],
  views: [...document.querySelectorAll("[data-view-panel]")],
  todayFocus: document.getElementById("todayFocus"),
  levelBand: document.getElementById("levelBand"),
  assignmentCount: document.getElementById("assignmentCount"),
  levelTrack: document.getElementById("levelTrack"),
  practicePreviewList: document.getElementById("practicePreviewList"),
  flashcard: document.getElementById("flashcard"),
  flashcardFront: document.getElementById("flashcardFront"),
  flashcardBack: document.getElementById("flashcardBack"),
  flashcardStage: document.getElementById("flashcardStage"),
  flipCardButton: document.getElementById("flipCardButton"),
  nextCardButton: document.getElementById("nextCardButton"),
  practiceHubList: document.getElementById("practiceHubList"),
  refreshPracticeButton: document.getElementById("refreshPracticeButton"),
  generatePracticeButton: document.getElementById("generatePracticeButton"),
  testDifficultySelect: document.getElementById("testDifficultySelect"),
  generateTestButton: document.getElementById("generateTestButton"),
  testList: document.getElementById("testList"),
  markTestButton: document.getElementById("markTestButton"),
  testResult: document.getElementById("testResult"),
  assignmentForm: document.getElementById("assignmentForm"),
  assignmentTitleInput: document.getElementById("assignmentTitleInput"),
  assignmentDifficultySelect: document.getElementById("assignmentDifficultySelect"),
  assignmentSeatsInput: document.getElementById("assignmentSeatsInput"),
  assignmentList: document.getElementById("assignmentList"),
  teacherOnlyNav: document.querySelector(".teacher-only"),
  currentPlanPrice: document.getElementById("currentPlanPrice"),
  paymentStatus: document.getElementById("paymentStatus"),
  paymentSeatCountWrap: document.getElementById("paymentSeatCountWrap"),
  paymentSeatCountInput: document.getElementById("paymentSeatCountInput"),
  startCheckoutButton: document.getElementById("startCheckoutButton"),
  refreshSubscriptionButton: document.getElementById("refreshSubscriptionButton"),
  openPortalButton: document.getElementById("openPortalButton"),
  assistantPanel: document.getElementById("assistantPanel"),
  assistantLabel: document.getElementById("assistantLabel"),
  assistantTitle: document.getElementById("assistantTitle"),
  assistantMessages: document.getElementById("assistantMessages"),
  assistantForm: document.getElementById("assistantForm"),
  assistantInput: document.getElementById("assistantInput"),
  closeAssistantButton: document.getElementById("closeAssistantButton"),
  assistantTriggers: [...document.querySelectorAll(".assistant-trigger")],
};

const defaultState = {
  interfaceLanguage: "english",
  studyLanguage: "latin",
  role: "personal",
  authMode: "login",
  currentView: "dashboard",
  isLoggedIn: false,
  currentUser: {
    name: "",
    email: "",
  },
  accounts: {},
  subscriptionActive: false,
  flashcardIndex: 0,
  flashcardFlipped: false,
  practiceItems: [],
  generatedTest: [],
  selectedAnswers: {},
  assignments: [],
  streakCount: 1,
  lastActiveDate: "",
  progressByLanguage: {
    latin: 0,
    spanish: 0,
    english: 0,
    gujarati: 0,
    hindi: 0,
    french: 0,
  },
  assistantMode: "faq",
};

let state = loadState();
let billingRefreshTimerId = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return {
      ...defaultState,
      ...saved,
      currentUser: {
        ...defaultState.currentUser,
        ...(saved?.currentUser || {}),
      },
      accounts: saved?.accounts || {},
      progressByLanguage: {
        ...defaultState.progressByLanguage,
        ...(saved?.progressByLanguage || {}),
      },
      practiceItems: Array.isArray(saved?.practiceItems) ? saved.practiceItems : [],
      generatedTest: Array.isArray(saved?.generatedTest) ? saved.generatedTest : [],
      assignments: Array.isArray(saved?.assignments) ? saved.assignments : [],
      selectedAnswers: saved?.selectedAnswers || {},
    };
  } catch (error) {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function hasBillingBackend() {
  return Boolean(BACKEND_BASE_URL);
}

function billingBackendErrorMessage() {
  return hasBillingBackend()
    ? `Could not reach the billing backend at ${BACKEND_BASE_URL}. Make sure your live server is running.`
    : "This build does not have a live billing backend URL yet. Add backendBaseUrl to app-config.json before sharing it.";
}

function clearBillingRefreshTimer() {
  if (billingRefreshTimerId) {
    window.clearTimeout(billingRefreshTimerId);
    billingRefreshTimerId = null;
  }
}

function scheduleBillingRefresh(attempt = 0) {
  clearBillingRefreshTimer();

  if (!state.isLoggedIn || state.subscriptionActive || !hasBillingBackend()) {
    return;
  }

  if (attempt >= 24) {
    dom.paymentStatus.textContent =
      "Stripe checkout is still being confirmed. Press Refresh billing status if you have already paid.";
    return;
  }

  const delay = attempt === 0 ? 4000 : 7000;

  billingRefreshTimerId = window.setTimeout(async () => {
    await refreshSubscriptionStatus({ silent: true });

    if (!state.subscriptionActive) {
      scheduleBillingRefresh(attempt + 1);
    }
  }, delay);
}

function translationFor(key) {
  return translations[state.interfaceLanguage]?.[key] || translations.english[key];
}

function t(key) {
  return translationFor(key) || key;
}

function getBandTitle(bandKey) {
  const band = levelBands.find((item) => item.key === bandKey) || levelBands[0];
  return band.title[state.interfaceLanguage] || band.title.english;
}

function getDifficultyLabel(difficulty) {
  return difficultyLabels[difficulty]?.[state.interfaceLanguage] || difficultyLabels[difficulty]?.english || difficulty;
}

function getCurrentLessonSet() {
  return lessonBank[state.studyLanguage] || lessonBank.latin;
}

function getRoleLabel(role) {
  if (role === "teacher") {
    return t("teacherRole");
  }

  if (role === "student") {
    return t("studentRole");
  }

  return t("personalRole");
}

function hasPremiumAccess() {
  return state.subscriptionActive;
}

function incrementProgress(amount = 1) {
  const nextValue = (state.progressByLanguage[state.studyLanguage] || 0) + amount;
  state.progressByLanguage[state.studyLanguage] = Math.min(nextValue, 11);
}

function currentBandKey() {
  const score = state.progressByLanguage[state.studyLanguage] || 0;
  if (score >= 9) return "expert";
  if (score >= 6) return "advanced";
  if (score >= 3) return "intermediate";
  return "beginner";
}

function setDailyStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = state.lastActiveDate;

  if (!last) {
    state.streakCount = 1;
    state.lastActiveDate = today;
    return;
  }

  if (last === today) return;

  const dayMs = 24 * 60 * 60 * 1000;
  const difference = Math.round((new Date(today) - new Date(last)) / dayMs);

  if (difference === 1) {
    state.streakCount += 1;
  } else if (difference > 1) {
    state.streakCount = 1;
  }

  state.lastActiveDate = today;
}

function languageButtonMarkup(language, compact = false) {
  return `
    <button
      type="button"
      class="language-button ${state.interfaceLanguage === language.key ? "active" : ""}"
      data-language="${language.key}"
      ${compact ? 'data-compact="true"' : ""}
    >
      <strong>${language.native}</strong>
      <small>${language.accent}</small>
    </button>
  `;
}

function renderLanguagePickers() {
  dom.interfaceLanguagePicker.innerHTML = languageOptions
    .map((language) => languageButtonMarkup(language, true))
    .join("");
  dom.heroLanguagePicker.innerHTML = languageOptions.map((language) => languageButtonMarkup(language)).join("");
}

function renderStudyLanguageSelect() {
  dom.studyLanguageSelect.innerHTML = languageOptions
    .map(
      (language) => `
        <option value="${language.key}" ${state.studyLanguage === language.key ? "selected" : ""}>
          ${language.native}
        </option>
      `
    )
    .join("");
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const translated = translationFor(node.dataset.i18n);
    if (translated) {
      node.textContent = translated;
    }
  });
  dom.authSubmit.textContent = state.authMode === "create" ? t("createCta") : t("loginCta");
  document.documentElement.lang = state.interfaceLanguage;
}

function renderAuthMode() {
  dom.loginTab.classList.toggle("active", state.authMode === "login");
  dom.createTab.classList.toggle("active", state.authMode === "create");
  dom.nameFieldWrapper.classList.toggle("hidden", state.authMode !== "create");
}

function renderRoleToggle() {
  dom.personalRoleButton.classList.toggle("active", state.role === "personal");
  dom.studentRoleButton.classList.toggle("active", state.role === "student");
  dom.teacherRoleButton.classList.toggle("active", state.role === "teacher");
}

function renderWorkspaceVisibility() {
  dom.welcomePanel.classList.toggle("hidden", state.isLoggedIn);
  dom.workspace.classList.toggle("hidden", !state.isLoggedIn);
  dom.logoutButton.classList.toggle("hidden", !state.isLoggedIn);
}

function renderProfile() {
  dom.profileGreeting.textContent = state.isLoggedIn ? t("dashboardTitle") : t("welcomeStatus");
  dom.profileName.textContent = state.currentUser.name || getRoleLabel(state.role);
  dom.profileEmail.textContent = state.currentUser.email || "name@example.com";
  dom.roleBadge.textContent = getRoleLabel(state.role);

  const accessText = hasPremiumAccess() ? t("accessActive") : t("accessLocked");

  dom.accessBadge.textContent = accessText;
  dom.currentPlanPrice.textContent =
    state.role === "teacher"
      ? `${t("teacherRole")}: £2.99 per student monthly`
      : `${getRoleLabel(state.role)}: £3.99 per month`;

  dom.paymentStatus.textContent = hasPremiumAccess()
    ? `${accessText}. Stripe should be confirmed on your backend before granting this in production.`
    : t("paymentStatusLocked");

  const streakWord = state.streakCount === 1 ? "day" : "days";
  dom.streakValue.textContent = `${state.streakCount} ${streakWord}`;

  dom.teacherOnlyNav.classList.toggle("hidden", state.role !== "teacher");
}

function renderPaymentControls() {
  dom.paymentSeatCountWrap.classList.toggle("hidden", state.role !== "teacher");

  if (state.role === "teacher" && Number(dom.paymentSeatCountInput.value) < 1) {
    dom.paymentSeatCountInput.value = "25";
  }
}

function renderDifficultySelects() {
  const difficultyOptions = ["easy", "medium", "hard", "expert"];
  const currentTestDifficulty = dom.testDifficultySelect.value || "easy";
  const currentAssignmentDifficulty = dom.assignmentDifficultySelect.value || "easy";

  dom.testDifficultySelect.innerHTML = difficultyOptions
    .map(
      (difficulty) => `
        <option value="${difficulty}" ${currentTestDifficulty === difficulty ? "selected" : ""}>${getDifficultyLabel(difficulty)}</option>
      `
    )
    .join("");

  dom.assignmentDifficultySelect.innerHTML = difficultyOptions
    .map(
      (difficulty) => `
        <option value="${difficulty}" ${currentAssignmentDifficulty === difficulty ? "selected" : ""}>${getDifficultyLabel(difficulty)}</option>
      `
    )
    .join("");
}

function renderDashboard() {
  const band = currentBandKey();
  const bandTitle = getBandTitle(band);
  const openAssignments = state.assignments.length;

  dom.levelBand.textContent = bandTitle;
  dom.assignmentCount.textContent = `${openAssignments} ${openAssignments === 1 ? "open task" : "open tasks"}`;
  dom.todayFocus.textContent = `${state.streakCount + 8} min ${getDifficultyLabel("easy").toLowerCase()} review`;

  dom.levelTrack.innerHTML = levelBands
    .map(
      (item) => `
        <div class="level-step ${item.key === band ? "active" : ""}">
          <strong>${item.title[state.interfaceLanguage] || item.title.english}</strong>
          <span>${item.copy}</span>
        </div>
      `
    )
    .join("");

  dom.practicePreviewList.innerHTML = buildPracticeItems().slice(0, 3).map(practiceItemMarkup).join("");
}

function currentCard() {
  const cards = getCurrentLessonSet();
  return cards[state.flashcardIndex % cards.length];
}

function renderFlashcard() {
  const card = currentCard();
  dom.flashcard.classList.toggle("flipped", state.flashcardFlipped);
  dom.flashcardFront.textContent = card.front;
  dom.flashcardBack.textContent = glosses[card.glossKey][state.interfaceLanguage] || glosses[card.glossKey].english;
  dom.flashcardStage.textContent = getBandTitle(card.band);
}

function buildPracticeItems() {
  const cards = getCurrentLessonSet();
  const band = currentBandKey();

  return [
    {
      title: `${getDifficultyLabel("easy")} recall sprint`,
      body: `Review ${cards[0].front}, ${cards[1].front}, and ${cards[2].front} with timed meaning checks.`,
      footer: `${getBandTitle(band)} focus`,
    },
    {
      title: `${getDifficultyLabel("medium")} speaking warm-up`,
      body: `Use three words from ${languageOptions.find((item) => item.key === state.studyLanguage)?.native} in short answers and repeat them aloud.`,
      footer: "AI-style prompt deck",
    },
    {
      title: `${getDifficultyLabel("hard")} writing challenge`,
      body: `Write a tiny paragraph using ${cards[3].front} and ${cards[4].front} before your next test.`,
      footer: "Build toward exam confidence",
    },
  ];
}

function practiceItemMarkup(item) {
  return `
    <article class="stack-item">
      <strong>${item.title}</strong>
      <p>${item.body}</p>
      <span class="eyebrow">${item.footer}</span>
    </article>
  `;
}

function renderPracticeHub() {
  state.practiceItems = buildPracticeItems();
  dom.practiceHubList.innerHTML = state.practiceItems
    .map(
      (item) => `
        <article class="practice-card">
          <div>
            <strong>${item.title}</strong>
            <p>${item.body}</p>
          </div>
          <span class="pill-badge">${item.footer}</span>
        </article>
      `
    )
    .join("");
}

function shuffle(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function generateTestQuestions() {
  const difficulty = dom.testDifficultySelect.value;
  const cards = getCurrentLessonSet();
  const promptCards = shuffle(cards).slice(0, 4);

  state.generatedTest = promptCards.map((card, index) => {
    const correct = glosses[card.glossKey][state.interfaceLanguage] || glosses[card.glossKey].english;
    const distractors = shuffle(
      Object.keys(glosses)
        .filter((key) => key !== card.glossKey)
        .map((key) => glosses[key][state.interfaceLanguage] || glosses[key].english)
    ).slice(0, 3);

    const promptStyles = {
      easy: `What does "${card.front}" mean?`,
      medium: `Pick the ${languageOptions.find((item) => item.key === state.studyLanguage)?.native} word for "${correct}".`,
      hard: `Which answer best fits an advanced ${languageOptions.find((item) => item.key === state.studyLanguage)?.native} review prompt?`,
      expert: `Choose the strongest meaning match for "${card.front}" in an expert-level test.`,
    };

    return {
      id: `${difficulty}-${index}-${card.front}`,
      prompt: promptStyles[difficulty],
      correctAnswer: difficulty === "medium" ? card.front : correct,
      options:
        difficulty === "medium"
          ? shuffle([card.front, ...shuffle(cards.filter((item) => item.front !== card.front).map((item) => item.front)).slice(0, 3)])
          : shuffle([correct, ...distractors]),
    };
  });

  state.selectedAnswers = {};
}

function renderTestList() {
  dom.testList.innerHTML = state.generatedTest
    .map(
      (question, index) => `
        <article class="test-question" data-question-id="${question.id}">
          <strong>${index + 1}. ${question.prompt}</strong>
          <div class="option-row">
            ${question.options
              .map(
                (option) => `
                  <button
                    type="button"
                    class="option-button ${state.selectedAnswers[question.id] === option ? "selected" : ""}"
                    data-question-option="${option}"
                    data-question-id="${question.id}"
                  >
                    ${option}
                  </button>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderAssignments() {
  dom.assignmentList.innerHTML = state.assignments.length
    ? state.assignments
        .map(
          (assignment) => `
            <article class="stack-item">
              <strong>${assignment.title}</strong>
              <p>${assignment.languageName} · ${getDifficultyLabel(assignment.difficulty)} · ${assignment.seats} seats</p>
              <span class="eyebrow">${assignment.createdAt}</span>
            </article>
          `
        )
        .join("")
    : `
        <article class="stack-item">
          <strong>No teacher-set tests yet</strong>
          <p>Create your first assignment to see it here.</p>
        </article>
      `;
}

function ensurePremiumLocks() {
  dom.views.forEach((view) => {
    const premiumOnly = view.dataset.premium === "true";
    const shouldLock = premiumOnly && !hasPremiumAccess();
    view.classList.toggle("locked", shouldLock);

    let lockNode = view.querySelector(".view-lock");

    if (shouldLock) {
      if (!lockNode) {
        lockNode = document.createElement("div");
        lockNode.className = "view-lock";
        view.appendChild(lockNode);
      }

      lockNode.innerHTML = `
        <strong>${t("accessLocked")}</strong>
        <p>${state.role === "teacher" ? "Create a teacher subscription to unlock test setting and analytics." : "Subscribe to unlock lessons, practice, tests, and the full dashboard."}</p>
        <button type="button" class="primary-button" data-open-payments="true">${t("navPayments")}</button>
      `;
    } else if (lockNode) {
      lockNode.remove();
    }
  });
}

function renderNav() {
  dom.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.currentView);
  });

  dom.views.forEach((view) => {
    view.classList.toggle("active", view.dataset.viewPanel === state.currentView);
  });
}

function showView(viewName) {
  state.currentView = viewName;
  renderNav();
  saveState();
}

function updateAssistantHeader() {
  const faqMode = state.assistantMode === "faq";
  dom.assistantLabel.textContent = faqMode ? "AI FAQ" : "AI Support";
  dom.assistantTitle.textContent = faqMode ? "Quick answers about the app" : "Customer support help";
}

function addAssistantMessage(content, speaker = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `assistant-bubble ${speaker}`;
  bubble.textContent = content;
  dom.assistantMessages.appendChild(bubble);
  dom.assistantMessages.scrollTop = dom.assistantMessages.scrollHeight;
}

function openAssistant(mode) {
  state.assistantMode = mode;
  updateAssistantHeader();
  dom.assistantPanel.classList.remove("hidden");
  dom.assistantMessages.innerHTML = "";

  if (mode === "faq") {
    addAssistantMessage("Ask me about streaks, tests, teacher accounts, payments, or supported languages.");
  } else {
    addAssistantMessage("Tell me what went wrong and I will suggest the next step for login, payment, or access problems.");
  }
}

function answerAssistant(question) {
  const value = question.toLowerCase();

  if (value.includes("stripe") || value.includes("paypal") || value.includes("payment")) {
    return "Use Stripe Checkout with a webhook-confirmed backend. This app now opens Stripe-hosted checkout and Stripe billing management in the browser.";
  }

  if (value.includes("teacher")) {
    return "Teacher accounts can create assignments, choose test difficulty, and manage student seats. Billing is designed as £2.99 per student each month.";
  }

  if (value.includes("login") || value.includes("account")) {
    return "This prototype stores login state locally. A real app should use a backend, hashed passwords, and subscription status stored in a database.";
  }

  if (value.includes("streak")) {
    return "Your streak increases when you return on consecutive days. Practice, tests, and flashcard progress all help keep momentum going.";
  }

  if (value.includes("test") || value.includes("question")) {
    return "Tests are built from the current study language and selected difficulty. In production, you can swap the generator for a server-side AI question service.";
  }

  return state.assistantMode === "faq"
    ? "I can help with languages, flashcards, tests, payments, subscriptions, and teacher tools."
    : "I can guide you to the payment page, explain locked access, or help you reset the prototype flow.";
}

function accountKey(email) {
  return email.trim().toLowerCase();
}

function normalizeEmail(email) {
  return accountKey(String(email || ""));
}

async function requestJson(path, options = {}) {
  if (!hasBillingBackend()) {
    throw new Error(billingBackendErrorMessage());
  }

  let response;

  try {
    response = await fetch(`${BACKEND_BASE_URL}${path}`, options);
  } catch (error) {
    throw new Error(billingBackendErrorMessage());
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : { error: await response.text() };

  if (!response.ok) {
    throw new Error(payload.error || "Request failed.");
  }

  return payload;
}

async function refreshSubscriptionStatus({ silent = false } = {}) {
  const email = normalizeEmail(state.currentUser.email);

  if (!email) {
    if (!silent) {
      dom.paymentStatus.textContent = "Log in first, then refresh billing status.";
    }
    return;
  }

  try {
    const payload = await requestJson(`/api/subscription-status?email=${encodeURIComponent(email)}`);

    if (payload.knownCustomer && payload.role) {
      state.role = payload.role;
      if (state.accounts[email]) {
        state.accounts[email].role = payload.role;
      }
    }

    state.subscriptionActive = Boolean(payload.active);
    if (state.accounts[email]) {
      state.accounts[email].subscriptionActive = state.subscriptionActive;
    }

    if (payload.active) {
      clearBillingRefreshTimer();
    }

    renderAll();
    dom.paymentStatus.textContent = payload.active
      ? `Subscription active (${payload.subscriptionStatus}). Premium features are unlocked.`
      : "No active subscription found yet. If you just paid, wait a few seconds and refresh again.";
    saveState();
  } catch (error) {
    if (!silent) {
      dom.paymentStatus.textContent = error.message;
    }
  }
}

async function openExternalUrl(url) {
  if (window.lingoDesktop && typeof window.lingoDesktop.openExternal === "function") {
    await window.lingoDesktop.openExternal(url);
    return;
  }

  window.open(url, "_blank", "noopener");
}

async function startSecureCheckout() {
  const email = normalizeEmail(state.currentUser.email);

  if (!email) {
    dom.paymentStatus.textContent = "Log in first, then start secure checkout.";
    return;
  }

  const quantity = state.role === "teacher" ? Math.max(1, Number(dom.paymentSeatCountInput.value || 1)) : 1;

  try {
    dom.paymentStatus.textContent = "Creating a secure Stripe checkout session...";

    const payload = await requestJson("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name: state.currentUser.name,
        role: state.role,
        quantity,
      }),
    });

    dom.paymentStatus.textContent =
      "Checkout created. Finish payment in your browser, then return here. Billing will be checked automatically.";
    await openExternalUrl(payload.url);
    scheduleBillingRefresh();
  } catch (error) {
    dom.paymentStatus.textContent = error.message;
  }
}

async function openBillingPortal() {
  const email = normalizeEmail(state.currentUser.email);

  if (!email) {
    dom.paymentStatus.textContent = "Log in first, then open billing management.";
    return;
  }

  try {
    dom.paymentStatus.textContent = "Creating your Stripe billing portal link...";

    const payload = await requestJson("/api/create-customer-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    dom.paymentStatus.textContent = "Opening billing management in your browser.";
    await openExternalUrl(payload.url);
  } catch (error) {
    dom.paymentStatus.textContent = error.message;
  }
}

function handleLogin(event) {
  event.preventDefault();

  const email = dom.emailInput.value.trim();
  const password = dom.passwordInput.value.trim();
  const name = dom.nameInput.value.trim();
  const emailKey = accountKey(email);

  if (!email || !password || (state.authMode === "create" && !name)) {
    dom.authStatus.textContent = "Please fill in the required fields first.";
    return;
  }

  const existingAccount = state.accounts[emailKey];
  let nextAccount = existingAccount;

  if (state.authMode === "login") {
    if (existingAccount && existingAccount.password !== password) {
      dom.authStatus.textContent = "That password does not match the locally saved prototype account.";
      return;
    }

    if (!existingAccount) {
      nextAccount = {
        name: email.split("@")[0],
        role: state.role,
        password,
        subscriptionActive: false,
      };
    }
  } else {
    nextAccount = {
      name,
      role: state.role,
      password,
      subscriptionActive: existingAccount?.subscriptionActive || false,
    };
  }

  state.accounts[emailKey] = nextAccount;
  state.currentUser = {
    name: nextAccount.name,
    email,
  };
  state.role = nextAccount.role;
  state.isLoggedIn = true;
  state.subscriptionActive = Boolean(nextAccount.subscriptionActive);
  setDailyStreak();
  state.currentView = "dashboard";
  renderAll();
  void refreshSubscriptionStatus({ silent: true });

  dom.authStatus.textContent = hasPremiumAccess()
    ? "Welcome back. Premium content is available."
    : "Welcome. Premium content is still locked until payment is confirmed.";
}

function renderAll() {
  if (state.role !== "teacher" && state.currentView === "teacher") {
    state.currentView = "dashboard";
  }
  renderLanguagePickers();
  renderStudyLanguageSelect();
  renderDifficultySelects();
  applyTranslations();
  renderAuthMode();
  renderRoleToggle();
  renderWorkspaceVisibility();
  renderProfile();
  renderPaymentControls();
  renderDashboard();
  renderFlashcard();
  renderPracticeHub();
  renderAssignments();
  ensurePremiumLocks();
  renderNav();
  updateAssistantHeader();
  saveState();
}

dom.interfaceLanguagePicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-language]");
  if (!button) return;

  state.interfaceLanguage = button.dataset.language;
  renderAll();
});

dom.heroLanguagePicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-language]");
  if (!button) return;

  state.interfaceLanguage = button.dataset.language;
  renderAll();
});

dom.studentRoleButton.addEventListener("click", () => {
  state.role = "student";
  if (state.currentView === "teacher") {
    state.currentView = "dashboard";
  }
  renderAll();
});

dom.personalRoleButton.addEventListener("click", () => {
  state.role = "personal";
  if (state.currentView === "teacher") {
    state.currentView = "dashboard";
  }
  renderAll();
});

dom.teacherRoleButton.addEventListener("click", () => {
  state.role = "teacher";
  renderAll();
});

dom.loginTab.addEventListener("click", () => {
  state.authMode = "login";
  renderAll();
});

dom.createTab.addEventListener("click", () => {
  state.authMode = "create";
  renderAll();
});

dom.authForm.addEventListener("submit", handleLogin);

dom.logoutButton.addEventListener("click", () => {
  clearBillingRefreshTimer();
  state.isLoggedIn = false;
  state.subscriptionActive = false;
  state.currentView = "dashboard";
  dom.passwordInput.value = "";
  renderAll();
});

dom.studyLanguageSelect.addEventListener("change", (event) => {
  state.studyLanguage = event.target.value;
  state.flashcardIndex = 0;
  state.flashcardFlipped = false;
  renderAll();
});

document.getElementById("mainNav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  showView(button.dataset.view);
});

dom.flipCardButton.addEventListener("click", () => {
  state.flashcardFlipped = !state.flashcardFlipped;
  renderFlashcard();
  saveState();
});

dom.flashcard.addEventListener("click", () => {
  state.flashcardFlipped = !state.flashcardFlipped;
  renderFlashcard();
  saveState();
});

dom.nextCardButton.addEventListener("click", () => {
  state.flashcardIndex += 1;
  state.flashcardFlipped = false;
  incrementProgress(1);
  renderAll();
});

dom.refreshPracticeButton.addEventListener("click", () => {
  incrementProgress(1);
  renderDashboard();
  renderPracticeHub();
  saveState();
});

dom.generatePracticeButton.addEventListener("click", () => {
  incrementProgress(1);
  renderPracticeHub();
  saveState();
});

dom.generateTestButton.addEventListener("click", () => {
  generateTestQuestions();
  renderTestList();
  dom.testResult.textContent = "Your practice test is ready. Choose one answer for each question.";
  incrementProgress(2);
  saveState();
});

dom.testList.addEventListener("click", (event) => {
  const option = event.target.closest("[data-question-option]");
  if (!option) return;

  const questionId = option.dataset.questionId;
  state.selectedAnswers[questionId] = option.dataset.questionOption;
  renderTestList();
  saveState();
});

dom.markTestButton.addEventListener("click", () => {
  if (!state.generatedTest.length) {
    dom.testResult.textContent = t("testReadyStatus");
    return;
  }

  const score = state.generatedTest.reduce((total, question) => {
    return total + Number(state.selectedAnswers[question.id] === question.correctAnswer);
  }, 0);

  dom.testResult.textContent = `You scored ${score}/${state.generatedTest.length}. ${
    score === state.generatedTest.length ? "Excellent work." : "Review the flashcards and try again."
  }`;
  incrementProgress(score);
  renderDashboard();
  saveState();
});

dom.assignmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = dom.assignmentTitleInput.value.trim();
  const difficulty = dom.assignmentDifficultySelect.value;
  const seats = Number(dom.assignmentSeatsInput.value);

  if (!title || !seats) return;

  state.assignments.unshift({
    title,
    difficulty,
    seats,
    languageName: languageOptions.find((item) => item.key === state.studyLanguage)?.native || state.studyLanguage,
    createdAt: new Date().toLocaleDateString(),
  });

  dom.assignmentTitleInput.value = "";
  renderAssignments();
  renderDashboard();
  saveState();
});

dom.startCheckoutButton.addEventListener("click", () => {
  void startSecureCheckout();
});

dom.refreshSubscriptionButton.addEventListener("click", () => {
  void refreshSubscriptionStatus();
});

dom.openPortalButton.addEventListener("click", () => {
  void openBillingPortal();
});

document.addEventListener("click", (event) => {
  const paymentsButton = event.target.closest("[data-open-payments='true']");
  if (!paymentsButton) return;
  showView("payments");
});

dom.assistantTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openAssistant(trigger.dataset.assistant));
});

dom.closeAssistantButton.addEventListener("click", () => {
  dom.assistantPanel.classList.add("hidden");
});

dom.assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = dom.assistantInput.value.trim();
  if (!message) return;

  addAssistantMessage(message, "user");
  addAssistantMessage(answerAssistant(message), "bot");
  dom.assistantInput.value = "";
});

renderAll();

if (state.isLoggedIn) {
  void refreshSubscriptionStatus({ silent: true });
}

window.addEventListener("focus", () => {
  if (state.isLoggedIn) {
    void refreshSubscriptionStatus({ silent: true });
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.isLoggedIn) {
    void refreshSubscriptionStatus({ silent: true });
  }
});
