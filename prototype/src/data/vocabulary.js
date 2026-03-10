// Vocabulary data extracted from transcripts + mock data
// Entity model: Word (đơn từ) + Compound (từ ghép/idiom)

export const vocabularyItems = [
  // === WORDS (đơn từ) ===
  {
    id: "w-cookout",
    type: "word",
    word: "cookout",
    meaning: "Tiệc nướng ngoài trời (outdoor BBQ party)",
    pronunciation: "/ˈkʊkaʊt/",
    partOfSpeech: "noun",
    status: "unknown",
    isRichPoint: true,
    culturalStamps: ["food-culture"],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Tiệc nướng ngoài trời (outdoor BBQ party)",
        pronunciation: "/ˈkʊkaʊt/",
        partOfSpeech: "Noun",
        examples: ["We're having a cookout Saturday", "The whole block came to the cookout"],
      },
      context: {
        register: "Casual, dùng trong gia đình và bạn bè",
        tone: "Ấm áp, community",
        whenToUse: "Khi nói về tiệc ngoài trời của gia đình/cộng đồng",
        alternatives: [
          { text: "BBQ", register: "General" },
          { text: "Barbecue party", register: "Neutral" },
          { text: "Outdoor gathering", register: "Formal" },
        ],
      },
      culture: {
        note: "Trong văn hóa African American, 'cookout' không chỉ là nướng thịt — đó là nơi cả cộng đồng gắn kết.",
        richPoint: true,
        deepDiveId: "cookout-culture",
        comparison: "Tương tự đám giỗ hoặc tiệc tất niên ở Việt Nam.",
        dosDonts: "Mang theo đồ ăn/uống là phép lịch sự. Không ai về sớm.",
      },
    },
  },
  {
    id: "w-trippin",
    type: "word",
    word: "trippin'",
    meaning: "Phản ứng thái quá, làm quá lên",
    pronunciation: "/ˈtrɪpɪn/",
    partOfSpeech: "verb (slang)",
    status: "unknown",
    isRichPoint: false,
    culturalStamps: [],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Phản ứng thái quá, nói/làm điều vô lý",
        pronunciation: "/ˈtrɪpɪn/",
        partOfSpeech: "Verb (slang)",
        examples: ["You trippin'!", "Stop trippin' over nothing"],
      },
      context: {
        register: "Rất informal, slang",
        tone: "Trách nhẹ, bạn bè",
        whenToUse: "Chỉ với bạn thân",
        alternatives: [
          { text: "overreacting", register: "Neutral" },
          { text: "being dramatic", register: "Casual" },
        ],
      },
      culture: {
        note: "Slang phổ biến trong AAVE và giới trẻ Mỹ.",
        richPoint: false,
      },
    },
  },
  {
    id: "w-fire",
    type: "word",
    word: "fire",
    meaning: "Tuyệt vời, xuất sắc (slang)",
    pronunciation: "/faɪər/",
    partOfSpeech: "adj (slang)",
    status: "known",
    isRichPoint: false,
    culturalStamps: [],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Tuyệt vời, ngon, xuất sắc (không phải 'lửa')",
        pronunciation: "/faɪər/",
        partOfSpeech: "Adjective (slang)",
        examples: ["This food is fire!", "That song is fire"],
      },
      context: {
        register: "Slang, rất casual",
        tone: "Khen ngợi nhiệt tình",
        whenToUse: "Với bạn bè, mạng xã hội",
        alternatives: [
          { text: "amazing", register: "Neutral" },
          { text: "excellent", register: "Formal" },
        ],
      },
      culture: {
        note: "Slang Gen Z, phổ biến trên TikTok và social media.",
        richPoint: false,
      },
    },
  },
  {
    id: "w-bet",
    type: "word",
    word: "bet",
    meaning: "OK, đồng ý, chắc chắn rồi",
    pronunciation: "/bɛt/",
    partOfSpeech: "interjection (slang)",
    status: "unknown",
    isRichPoint: true,
    culturalStamps: ["slang"],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "OK / Đồng ý / Chắc chắn rồi",
        pronunciation: "/bɛt/",
        partOfSpeech: "Interjection (slang)",
        examples: ["'Wanna grab food?' 'Bet!'", "Bet, I'll be there"],
      },
      context: {
        register: "Slang, chỉ casual",
        tone: "Đồng ý nhiệt tình",
        whenToUse: "Với bạn bè, nghĩa là 'OK deal'",
        alternatives: [
          { text: "Sure!", register: "Casual" },
          { text: "Sounds good", register: "Neutral" },
          { text: "Absolutely", register: "Formal" },
        ],
      },
      culture: {
        note: "AAVE origin, nay mainstream trong Gen Z. Ngắn gọn, thể hiện sự cool.",
        richPoint: true,
        deepDiveId: "slang-evolution",
        comparison: "Tương tự 'oke luôn' hoặc 'chuẩn' trong tiếng Việt giới trẻ.",
      },
    },
  },
  {
    id: "w-vibe",
    type: "word",
    word: "vibe",
    meaning: "Cảm giác, không khí, hợp nhau",
    pronunciation: "/vaɪb/",
    partOfSpeech: "noun / verb",
    status: "known",
    isRichPoint: true,
    culturalStamps: ["slang"],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Cảm giác, bầu không khí / hợp nhau",
        pronunciation: "/vaɪb/",
        partOfSpeech: "Noun / Verb",
        examples: ["This place has good vibes", "We really vibe together"],
      },
      context: {
        register: "Casual, social media",
        tone: "Tích cực, chill",
        whenToUse: "Mô tả không khí hoặc sự hợp nhau",
        alternatives: [
          { text: "atmosphere", register: "Neutral" },
          { text: "get along", register: "Neutral" },
        ],
      },
      culture: {
        note: "Từ 'vibe' đã trở thành core vocabulary của Gen Z. 'Vibe check' = kiểm tra cảm giác.",
        richPoint: true,
        deepDiveId: "vibe-culture",
      },
    },
  },
  {
    id: "w-humble",
    type: "word",
    word: "humble",
    meaning: "Khiêm tốn",
    pronunciation: "/ˈhʌmbl/",
    partOfSpeech: "adjective",
    status: "known",
    isRichPoint: false,
    culturalStamps: [],
    sources: ["kendrick-humble"],
    layers: {
      language: {
        meaning: "Khiêm tốn, không kiêu ngạo",
        pronunciation: "/ˈhʌmbl/",
        partOfSpeech: "Adjective",
        examples: ["Stay humble", "He's very humble despite his success"],
      },
      context: {
        register: "Neutral, dùng mọi ngữ cảnh",
        tone: "Tích cực",
        whenToUse: "Khen ai đó khiêm tốn, hoặc khuyên ai đó",
        alternatives: [
          { text: "modest", register: "Formal" },
          { text: "down-to-earth", register: "Casual" },
        ],
      },
      culture: {
        note: "Trong bài HUMBLE của Kendrick Lamar, sự mâu thuẫn giữa 'humble' và giọng aggressive là có chủ đích.",
        richPoint: false,
      },
    },
  },
  {
    id: "w-dope",
    type: "word",
    word: "dope",
    meaning: "Tuyệt vời, cool (slang)",
    pronunciation: "/doʊp/",
    partOfSpeech: "adj (slang)",
    status: "unknown",
    isRichPoint: false,
    culturalStamps: [],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Tuyệt vời, cool",
        pronunciation: "/doʊp/",
        partOfSpeech: "Adjective (slang)",
        examples: ["That's dope!", "Your outfit is dope"],
      },
      context: {
        register: "Slang, casual",
        tone: "Khen ngợi",
        whenToUse: "Với bạn bè, giới trẻ",
        alternatives: [
          { text: "cool", register: "Casual" },
          { text: "awesome", register: "Casual" },
          { text: "excellent", register: "Formal" },
        ],
      },
      culture: {
        note: "Gốc hip-hop, nay phổ biến mainstream.",
        richPoint: false,
      },
    },
  },
  {
    id: "w-barista",
    type: "word",
    word: "barista",
    meaning: "Người pha chế cà phê",
    pronunciation: "/bəˈriːstə/",
    partOfSpeech: "noun",
    status: "known",
    isRichPoint: false,
    culturalStamps: [],
    sources: ["coffee-order"],
    layers: {
      language: {
        meaning: "Người pha chế cà phê",
        pronunciation: "/bəˈriːstə/",
        partOfSpeech: "Noun",
        examples: ["The barista made my latte", "She works as a barista"],
      },
      context: {
        register: "Neutral",
        tone: "Bình thường",
        whenToUse: "Tại quán cà phê",
        alternatives: [
          { text: "coffee maker", register: "Informal" },
        ],
      },
      culture: {
        note: "Starbucks culture: tên trên cốc, small talk với barista là bình thường ở Mỹ.",
        richPoint: false,
      },
    },
  },

  // === COMPOUNDS (từ ghép / idiom) ===
  {
    id: "c-pull-up",
    type: "compound",
    word: "pull up",
    meaning: "Ghé qua, đến (informal)",
    pronunciation: "/pʊl ʌp/",
    partOfSpeech: "phrasal verb",
    compoundType: "phrasal_verb",
    status: "unknown",
    isRichPoint: true,
    culturalStamps: ["food-culture", "slang"],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Ghé qua, đến nơi (không phải 'kéo lên')",
        pronunciation: "/pʊl ʌp/",
        partOfSpeech: "Phrasal Verb",
        examples: ["Pull up to the cookout", "Just pull up around 4"],
      },
      context: {
        register: "Rất casual, slang",
        tone: "Thân thiện, mời mọc",
        whenToUse: "Mời bạn bè đến",
        alternatives: [
          { text: "come over", register: "Casual" },
          { text: "stop by", register: "Casual" },
          { text: "please join us", register: "Formal" },
        ],
      },
      culture: {
        note: "'Pull up' trong context cookout = bạn được mời thật sự, thân thiết.",
        richPoint: true,
        deepDiveId: "cookout-culture",
        comparison: "'Ghé nhà chơi đi' trong tiếng Việt — thân mật, không khách sáo.",
      },
    },
  },
  {
    id: "c-mac-and-cheese",
    type: "compound",
    word: "mac and cheese",
    meaning: "Mì ống trộn phô mai nướng",
    pronunciation: "/mæk ən tʃiːz/",
    partOfSpeech: "noun",
    compoundType: "compound",
    status: "unknown",
    isRichPoint: true,
    culturalStamps: ["food-culture"],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Macaroni and cheese — mì ống trộn phô mai nướng",
        pronunciation: "/mæk ən tʃiːz/",
        partOfSpeech: "Noun",
        examples: ["Mom's famous mac and cheese", "Box mac and cheese"],
      },
      context: {
        register: "Casual, gia đình",
        tone: "Ấm cúng, comfort",
        whenToUse: "Nói về ẩm thực gia đình Mỹ",
        alternatives: [
          { text: "macaroni and cheese", register: "Full form" },
          { text: "baked macaroni", register: "Neutral" },
        ],
      },
      culture: {
        note: "Comfort food biểu tượng Mỹ, đặc biệt trong văn hóa African American & miền Nam Mỹ. 'Mom's famous...' = niềm tự hào gia đình.",
        richPoint: true,
        deepDiveId: "comfort-food",
        comparison: "Tương tự 'bún bò mẹ nấu' — mỗi nhà có công thức riêng.",
      },
    },
  },
  {
    id: "c-whats-good",
    type: "compound",
    word: "what's good",
    meaning: "Sao rồi, khỏe không (casual greeting)",
    pronunciation: "/wʌts gʊd/",
    partOfSpeech: "greeting / idiom",
    compoundType: "idiom",
    status: "known",
    isRichPoint: false,
    culturalStamps: [],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Sao rồi, khỏe không (informal greeting)",
        pronunciation: "/wʌts gʊd/",
        partOfSpeech: "Greeting / Idiom",
        examples: ["What's good bro?", "Yo what's good!"],
      },
      context: {
        register: "Rất casual, bạn bè",
        tone: "Thân thiện, vui vẻ",
        whenToUse: "Với bạn thân, cùng tuổi",
        alternatives: [
          { text: "How are you?", register: "Formal" },
          { text: "What's up?", register: "Casual" },
        ],
      },
      culture: {
        note: "Phổ biến trong AAVE và giới trẻ Mỹ, xuất hiện nhiều trong hip-hop.",
        richPoint: false,
      },
    },
  },
  {
    id: "c-you-good",
    type: "compound",
    word: "you good",
    meaning: "Không cần đâu, thoải mái đi",
    pronunciation: "/juː gʊd/",
    partOfSpeech: "expression",
    compoundType: "idiom",
    status: "unknown",
    isRichPoint: true,
    culturalStamps: ["food-culture"],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Không cần (mang gì) đâu / Thoải mái đi",
        pronunciation: "/juː gʊd/",
        partOfSpeech: "Expression",
        examples: ["'Should I bring something?' 'Nah you good'"],
      },
      context: {
        register: "Rất casual",
        tone: "Thân thiện, reassuring",
        whenToUse: "Khi muốn nói 'không cần khách sáo'",
        alternatives: [
          { text: "Don't worry about it", register: "Casual" },
          { text: "That's not necessary", register: "Formal" },
        ],
      },
      culture: {
        note: "'You good' = thân đến mức không cần khách sáo. Trong cookout context, nghĩa là bạn là family.",
        richPoint: true,
        deepDiveId: "cookout-culture",
      },
    },
  },
  {
    id: "c-fix-a-plate",
    type: "compound",
    word: "fix a plate",
    meaning: "Lấy đồ ăn vào đĩa",
    pronunciation: "/fɪks ə pleɪt/",
    partOfSpeech: "expression",
    compoundType: "idiom",
    status: "unknown",
    isRichPoint: true,
    culturalStamps: ["food-culture"],
    sources: ["atlanta-s2e5"],
    layers: {
      language: {
        meaning: "Lấy đồ ăn vào đĩa (không phải 'sửa đĩa')",
        pronunciation: "/fɪks ə pleɪt/",
        partOfSpeech: "Idiom",
        examples: ["Go fix yourself a plate!", "Let me fix you a plate"],
      },
      context: {
        register: "Casual, gia đình / cộng đồng",
        tone: "Ấm áp, chăm sóc",
        whenToUse: "Tại bữa tiệc, cookout, family gathering",
        alternatives: [
          { text: "Get some food", register: "Casual" },
          { text: "Help yourself", register: "Neutral" },
          { text: "Please serve yourself", register: "Formal" },
        ],
      },
      culture: {
        note: "Trong văn hóa miền Nam Mỹ và African American, 'fix a plate' = bạn được chào đón. Nếu ai đó fix plate cho bạn = họ rất care.",
        richPoint: true,
        deepDiveId: "cookout-culture",
      },
    },
  },
];

// Cultural stamp categories matching README v0.3
export const culturalStampCategories = [
  { id: "social", name: "Social & Relationships", icon: "🤝" },
  { id: "food", name: "Food & Dining", icon: "🍽️" },
  { id: "language", name: "Language & Communication", icon: "💬" },
  { id: "work", name: "Work & Education", icon: "💼" },
  { id: "entertainment", name: "Entertainment & Media", icon: "🎬" },
  { id: "identity", name: "Identity & Values", icon: "🪪" },
];

// Map stamp IDs to categories
export const stampToCategory = {
  "food-culture": "food",
  "greeting": "social",
  "hip-hop": "entertainment",
  "workplace": "work",
  "humor": "language",
  "sports": "entertainment",
  "holidays": "social",
  "slang": "language",
};

// Helper: get SRS review queue (unknown words)
export function getSrsQueue() {
  return vocabularyItems.filter((item) => item.status === "unknown");
}

// Helper: filter vocabulary
export function filterVocabulary({ statusFilter, richPointOnly, sourceFilter, stampFilter, typeFilter }) {
  return vocabularyItems.filter((item) => {
    if (statusFilter === "unknown" && item.status !== "unknown") return false;
    if (statusFilter === "known" && item.status !== "known") return false;
    if (richPointOnly && !item.isRichPoint) return false;
    if (sourceFilter && !item.sources.includes(sourceFilter)) return false;
    if (stampFilter && !item.culturalStamps.includes(stampFilter)) return false;
    if (typeFilter === "word" && item.type !== "word") return false;
    if (typeFilter === "compound" && item.type !== "compound") return false;
    return true;
  });
}
