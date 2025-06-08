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

let reversed = true;

function renderPoems() {
  const arContainer = document.getElementById("poem-ar");
  const enContainer = document.getElementById("poem-en");
  const arLines = reversed ? [...arabicLines] : [...arabicLines].reverse();
  const enLines = reversed ? [...englishLines] : [...englishLines].reverse();

  arContainer.innerHTML = arLines.join("\\n");
  enContainer.innerHTML = enLines.join("\\n");
}

function reversePoems() {
  reversed = !reversed;
  renderPoems();
}

window.onload = renderPoems;
