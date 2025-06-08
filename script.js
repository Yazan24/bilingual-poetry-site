const arabicLines = [
  "من أنا؟",
  "قصيدة مستوحاة من الريح، والجوع، والسؤال",
  "واضحاً، حاداً، كالسيف:",
  "يأتي السؤال،",
  "ووسط هذا الصمت،",
  "بل من هشاشتي أيضاً.",
  "لا من البرد فقط،",
  "أختبئ في معطفي",
  "أحاول أن ألملم نفسي،",
  "لكنّه يمرّ فيك.",
  "لا تراه،",
  "كالهواء:",
  "لكنه يُحَس—",
  "واقعٌ لا يُرى،",
  "روحٌ تبحث عن حقيقة واقعها.",
  "معنى لا يُقال،",
  "أشعر بشيءٍ تحت السطح،",
  "وأنا؟",
  "لا أغنية في انتظار المساء.",
  "لا بيت، لا ظلّ،",
  "إلى أين يذهبون؟",
  "على رصيف النسيان.",
  "مكسورة كقنينة",
  "إلا من أحلامٍ",
  "وجيوبهم فارغة",
  "يعدّون خُطى الجوع،",
  "أطفالٌ في الشوارع",
  "كأنني أقاوم زمناً لا يراني.",
  "وأنا أطوي ياقة معطفي",
  "تمرّ الريح في قلبي،"
];

const englishLines = [
  "Who am I?",
  "A poem inspired by the wind, hunger, and the question",
  "Sharp, clear, like a blade—",
  "the question arrives,",
  "within this silence.",
  "Not just from the cold,",
  "but from my own fragility.",
  "I hide inside my coat,",
  "trying to gather what remains of me.",
  "You do not see it,",
  "but it passes through you.",
  "Like the air—",
  "It is felt,",
  "not seen—",
  "a reality unseen,",
  "a soul seeking the truth of its own existence.",
  "An unspoken meaning,",
  "I feel something beneath the surface.",
  "And I?",
  "No song waiting in the evening.",
  "No home, no shade—",
  "Where do they go?",
  "On the curb of forgetting.",
  "Broken like a bottle,",
  "their pockets hold only",
  "empty dreams.",
  "They count the footsteps of hunger,",
  "children in the streets.",
  "As if resisting a time that does not see me.",
  "I fold the collar of my coat—",
  "the wind passes through my heart."
];

const hebrewLines = [
  "מי אני?",
  "שיר בהשראת הרוח, הרעב, והשאלה",
  "חד, ברור, כמו להב—",
  "השאלה מגיעה,",
  "בתוך השקט הזה.",
  "לא רק מהקור,",
  "אלא גם מהשבריריות שלי.",
  "אני מתחבא בתוך המעיל,",
  "מנסה לאסוף את מה שנשאר ממני.",
  "אתה לא רואה את זה,",
  "אבל זה עובר דרכך.",
  "כמו האוויר—",
  "זה מורגש,",
  "לא נראה—",
  "מציאות בלתי נראית,",
  "נשמה המחפשת את האמת של קיומה.",
  "משמעות שלא נאמרת,",
  "אני מרגיש משהו מתחת לפני השטח.",
  "ואני?",
  "אין שיר שמחכה בערב.",
  "אין בית, אין צל—",
  "לאן הם הולכים?",
  "על מדרכת השכחה.",
  "שבור כמו בקבוק,",
  "הכיסים שלהם מחזיקים רק",
  "חלומות ריקים.",
  "הם סופרים את צעדי הרעב,",
  "ילדים ברחובות.",
  "כאילו מתנגד לזמן שלא רואה אותי.",
  "אני מקפל את צווארון המעיל—",
  "הרוח עוברת דרך הלב שלי."
];

const languages = [
  {
    name: 'العربية',
    lines: arabicLines,
    class: 'rtl arabic',
    title: 'من أنا؟',
    lang: 'ar',
    voice: null
  },
  {
    name: 'English',
    lines: englishLines,
    class: 'ltr english',
    title: 'Who Am I?',
    lang: 'en',
    voice: null
  },
  {
    name: 'עברית',
    lines: hebrewLines,
    class: 'rtl hebrew',
    title: 'מי אני?',
    lang: 'he',
    voice: null
  }
];

let currentOrder = [0, 1, 2];
let reversed = false;
let speechUtterances = [null, null, null];
let speechSynthesis = window.speechSynthesis;

function renderPoems() {
  for (let i = 0; i < 3; i++) {
    const langIndex = currentOrder[i];
    const language = languages[langIndex];
    const lines = reversed ? [...language.lines].reverse() : language.lines;
    
    const contentElement = document.getElementById(`content-${i + 1}`);
    const titleElement = document.getElementById(`title-${i + 1}`);
    const poemElement = document.getElementById(`poem-${i + 1}`);
    
    contentElement.innerHTML = lines.join('\n');
    titleElement.textContent = language.title;
    poemElement.className = `poem ${language.class}`;
  }
  
  updateMainTitle();
}

function updateMainTitle() {
  const titles = currentOrder.map(i => languages[i].title);
  document.getElementById('main-title').textContent = titles.join(' | ');
}

function reversePoems() {
  reversed = !reversed;
  renderPoems();
}

function shuffleLanguages() {
  // Simple shuffle algorithm
  for (let i = currentOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentOrder[i], currentOrder[j]] = [currentOrder[j], currentOrder[i]];
  }
  renderPoems();
}

window.onload = function() {
  loadVoices();
  renderPoems();
  
  // Reload voices when they change (some browsers load voices asynchronously)
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
};

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  
  // Find best voices for each language
  languages[0].voice = voices.find(voice => voice.lang.startsWith('ar')) || 
                      voices.find(voice => voice.lang.includes('ar')) ||
                      voices[0]; // fallback
                      
  languages[1].voice = voices.find(voice => voice.lang.startsWith('en')) ||
                      voices.find(voice => voice.lang.includes('en')) ||
                      voices[0]; // fallback
                      
  languages[2].voice = voices.find(voice => voice.lang.startsWith('he')) ||
                      voices.find(voice => voice.lang.includes('he')) ||
                      voices.find(voice => voice.lang.startsWith('en')) || // Hebrew fallback to English
                      voices[0]; // final fallback
}

function toggleSpeech(poemIndex) {
  const langIndex = currentOrder[poemIndex];
  const language = languages[langIndex];
  const playBtn = document.getElementById(`play-btn-${poemIndex + 1}`);
  
  // Stop current speech if playing
  if (speechUtterances[poemIndex]) {
    speechSynthesis.cancel();
    speechUtterances[poemIndex] = null;
    playBtn.classList.remove('playing');
    playBtn.querySelector('.play-icon').textContent = '🔊';
    return;
  }
  
  // Stop all other speeches
  stopAllSpeech();
  
  // Create new utterance
  const lines = reversed ? [...language.lines].reverse() : language.lines;
  const text = lines.join(' ');
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set voice and language
  if (language.voice) {
    utterance.voice = language.voice;
  }
  utterance.lang = language.lang;
  utterance.rate = 0.8; // Slightly slower for poetry
  utterance.pitch = 1.0;
  
  // Event handlers
  utterance.onstart = function() {
    playBtn.classList.add('playing');
    playBtn.querySelector('.play-icon').textContent = '⏸️';
  };
  
  utterance.onend = function() {
    speechUtterances[poemIndex] = null;
    playBtn.classList.remove('playing');
    playBtn.querySelector('.play-icon').textContent = '🔊';
  };
  
  utterance.onerror = function() {
    speechUtterances[poemIndex] = null;
    playBtn.classList.remove('playing');
    playBtn.querySelector('.play-icon').textContent = '🔊';
    console.error('Speech synthesis error');
  };
  
  // Store and start speech
  speechUtterances[poemIndex] = utterance;
  speechSynthesis.speak(utterance);
}

function stopAllSpeech() {
  speechSynthesis.cancel();
  
  // Reset all buttons
  for (let i = 0; i < 3; i++) {
    speechUtterances[i] = null;
    const playBtn = document.getElementById(`play-btn-${i + 1}`);
    if (playBtn) {
      playBtn.classList.remove('playing');
      playBtn.querySelector('.play-icon').textContent = '🔊';
    }
  }
}