export const chatScenarios = [
  {
    id: "cookout-invite",
    title: "Được mời đi cookout",
    description: "Bạn bè mời bạn đến cookout cuối tuần. Hãy trả lời tự nhiên!",
    difficulty: "A2-B1",
    culture: "African American",
    icon: "🍖",
    tags: ["Casual", "Social", "Food"],
    relatedContent: "atlanta-s2e5",
    messages: [
      { id: 1, role: "ai", text: "Yo what's good! You free this Saturday? My family's having a cookout 🍖", delay: 0 },
      {
        id: 2, role: "user-choice", prompt: "Trả lời lời mời:",
        choices: [
          { text: "For sure! Should I bring something?", feedback: "Tuyệt vời! Rất tự nhiên và lịch sự — hỏi mang gì là phép lịch sự tốt.", score: "great", cultureTip: "Hỏi 'Should I bring something?' thể hiện bạn hiểu văn hóa potluck/cookout." },
          { text: "Yes, I would like to attend. What should I prepare?", feedback: "Đúng ngữ pháp nhưng hơi formal cho tình huống này. Bạn bè thường nói casual hơn.", score: "ok", cultureTip: "Với bạn bè, 'For sure!' hoặc 'Sounds good!' tự nhiên hơn 'I would like to attend'." },
          { text: "Bet! What time should I pull up?", feedback: "Đỉnh của chóp! Dùng slang hoàn hảo, rất tự nhiên với bạn bè.", score: "perfect", cultureTip: "'Bet' + 'pull up' = bạn đã hiểu văn hóa giao tiếp casual của giới trẻ Mỹ!" },
        ],
      },
      { id: 3, role: "ai", text: "Nah you good, just pull up around 4. My mom's making her famous mac and cheese 🧀", delay: 500 },
      {
        id: 4, role: "user-choice", prompt: "Phản ứng về mac and cheese của mẹ bạn:",
        choices: [
          { text: "Your mom's mac and cheese is fire! Can't wait!", feedback: "Tuyệt vời! Khen món ăn của mẹ bạn là cách kết bạn nhanh nhất.", score: "perfect", cultureTip: "Khen 'mom's cooking' là cách thể hiện sự tôn trọng gia đình trong văn hóa Mỹ." },
          { text: "That sounds delicious. I look forward to it.", feedback: "Lịch sự nhưng hơi formal. Thử dùng 'Sounds fire!' hoặc 'Can't wait!' cho tự nhiên hơn.", score: "ok", cultureTip: null },
          { text: "I don't really like mac and cheese.", feedback: "Hmm... không nên nói vậy khi được mời. Hãy thể hiện sự háo hứng!", score: "bad", cultureTip: "Trong văn hóa Mỹ, từ chối hoặc chê món ăn của gia đình bạn là rất bất lịch sự." },
        ],
      },
      { id: 5, role: "ai", text: "Haha she'll love hearing that! Oh and my cousin's coming too, she's mad cool. Y'all gonna vibe 😎", delay: 500 },
      {
        id: 6, role: "user-choice", prompt: "Kết thúc cuộc trò chuyện:",
        choices: [
          { text: "Sounds dope! Can't wait to meet her. See you Saturday! 🔥", feedback: "Hoàn hảo! Tự nhiên, nhiệt tình, đúng slang.", score: "perfect", cultureTip: null },
          { text: "Nice! I'll definitely be there. Later!", feedback: "Rất tốt! Tự nhiên và thân thiện.", score: "great", cultureTip: null },
          { text: "Okay, goodbye.", feedback: "Hơi ngắn và lạnh. Thử thêm nhiệt tình: 'Can't wait!' hoặc 'See you there!'", score: "ok", cultureTip: "Người Mỹ thường kết thúc hội thoại với nhiệt tình — không chỉ 'Goodbye' suông." },
        ],
      },
    ],
  },
  {
    id: "coffee-order",
    title: "Gọi đồ uống ở Starbucks",
    description: "Luyện cách gọi đồ uống và small talk với barista.",
    difficulty: "A2",
    culture: "American Daily Life",
    icon: "☕",
    tags: ["Service", "Daily", "Food"],
    relatedContent: null,
    messages: [
      { id: 1, role: "ai", text: "Hi there! Welcome to Starbucks. What can I get started for you? ☕", delay: 0 },
      {
        id: 2, role: "user-choice", prompt: "Gọi đồ uống:",
        choices: [
          { text: "Can I get a grande iced latte with oat milk, please?", feedback: "Hoàn hảo! Đúng format chuẩn: size + đồ uống + tuỳ chỉnh.", score: "perfect", cultureTip: "Ở Mỹ, gọi đồ bằng 'Can I get...' hoặc 'I'll have...' là phổ biến nhất." },
          { text: "I want one coffee.", feedback: "Quá chung chung — barista sẽ hỏi lại size, loại, nóng/lạnh. Nên cụ thể hơn.", score: "ok", cultureTip: "Starbucks có ngôn ngữ riêng: Tall/Grande/Venti thay vì Small/Medium/Large." },
          { text: "Give me a coffee.", feedback: "'Give me' nghe hơi ra lệnh. 'Can I get' hoặc 'I'd like' lịch sự hơn.", score: "bad", cultureTip: "Trong văn hóa Mỹ, thêm 'please' và dùng 'Can I get...' thể hiện sự lịch sự." },
        ],
      },
      { id: 3, role: "ai", text: "Grande iced oat milk latte, got it! Can I get a name for that?", delay: 500 },
      {
        id: 4, role: "user-choice", prompt: "Cho tên:",
        choices: [
          { text: "It's Minh. M-I-N-H.", feedback: "Thông minh! Đánh vần tên giúp barista viết đúng. Rất phổ biến ở Mỹ.", score: "perfect", cultureTip: "Người Mỹ thường đánh vần tên khó — 'It's Sarah, S-A-R-A-H'. Đây là bình thường!" },
          { text: "Minh.", feedback: "OK nhưng barista có thể viết sai. Đánh vần sẽ tốt hơn!", score: "ok", cultureTip: null },
          { text: "Why do you need my name?", feedback: "Đây là văn hóa Starbucks — họ viết tên lên cốc. Không phải hỏi thông tin cá nhân.", score: "bad", cultureTip: "Viết tên lên cốc là 'đặc sản' của Starbucks. Nhiều người còn cố ý dùng tên giả vui!" },
        ],
      },
      { id: 5, role: "ai", text: "Awesome! That'll be $5.75. Have a great day! 😊", delay: 500 },
      {
        id: 6, role: "user-choice", prompt: "Trả lời khi thanh toán:",
        choices: [
          { text: "Thanks, you too! Have a good one!", feedback: "Hoàn hảo! 'Have a good one' là cách chào tạm biệt rất tự nhiên ở Mỹ.", score: "perfect", cultureTip: "'You too!' + 'Have a good one!' là combo chào tạm biệt phổ biến nhất ở Mỹ." },
          { text: "Thank you.", feedback: "Lịch sự nhưng hơi ngắn. Thêm 'you too' khi họ chúc bạn nice day.", score: "ok", cultureTip: null },
          { text: "*im lặng trả tiền*", feedback: "Ở Mỹ, không nói gì khi thanh toán bị coi là bất lịch sự. Ít nhất nói 'Thanks!'", score: "bad", cultureTip: "Small talk với nhân viên phục vụ là phần quan trọng của văn hóa Mỹ." },
        ],
      },
    ],
  },
  {
    id: "meeting-intro",
    title: "Tự giới thiệu trong meeting",
    description: "Luyện cách giới thiệu bản thân trong môi trường công việc Mỹ.",
    difficulty: "B1-B2",
    culture: "American Workplace",
    icon: "💼",
    tags: ["Work", "Formal", "Introduction"],
    relatedContent: null,
    messages: [
      { id: 1, role: "ai", text: "Alright everyone, let's go around the room and introduce ourselves. New folks, tell us a bit about yourself! 👋", delay: 0 },
      {
        id: 2, role: "user-choice", prompt: "Tự giới thiệu:",
        choices: [
          { text: "Hey everyone! I'm Minh, just joined the product team. Super excited to be here — I've heard great things about this team!", feedback: "Tuyệt vời! Thân thiện, chuyên nghiệp, và có compliment cho team.", score: "perfect", cultureTip: "Ở Mỹ, giới thiệu bản thân nên có: tên, vai trò, và 1 câu tích cực. 'Excited to be here' là must-have." },
          { text: "My name is Minh. I am a new member of the product team. Nice to meet everyone.", feedback: "Đúng nhưng hơi formal và khô khan. Thử thêm cảm xúc và personality!", score: "ok", cultureTip: "Văn hóa công sở Mỹ coi trọng 'personality' — không chỉ facts mà còn thể hiện con người bạn." },
          { text: "Hi. I'm Minh.", feedback: "Quá ngắn! Mọi người muốn biết thêm về bạn. Thử thêm role và 1 fun fact.", score: "bad", cultureTip: "Giới thiệu quá ngắn bị coi là không quan tâm. Người Mỹ mong đợi sự nhiệt tình." },
        ],
      },
      { id: 3, role: "ai", text: "Welcome Minh! Great to have you. So what were you up to before joining us?", delay: 500 },
      {
        id: 4, role: "user-choice", prompt: "Kể về kinh nghiệm trước:",
        choices: [
          { text: "I was at a startup in Vietnam working on mobile apps. Learned a ton there, but I'm really looking forward to the new challenges here!", feedback: "Tuyệt vời! Chia sẻ kinh nghiệm + thể hiện sự háo hứng về cơ hội mới.", score: "perfect", cultureTip: "'Learned a ton' + 'looking forward to' cho thấy bạn là người có growth mindset — rất được đánh giá cao ở Mỹ." },
          { text: "I worked at a company in Vietnam for 3 years as a product manager.", feedback: "OK nhưng hơi khô khan. Thử thêm cảm xúc và kết nối với role mới.", score: "ok", cultureTip: null },
          { text: "Nothing special, just worked at a small company.", feedback: "Tự hạ thấp bản thân. Ở Mỹ, hãy tự tin chia sẻ thành tựu của mình!", score: "bad", cultureTip: "Văn hóa Mỹ khuyến khích self-promotion (lịch sự). 'Nothing special' bị coi là thiếu tự tin." },
        ],
      },
      { id: 5, role: "ai", text: "That's awesome! We love diverse perspectives. Feel free to reach out if you need anything — my door's always open! 🙌", delay: 500 },
      {
        id: 6, role: "user-choice", prompt: "Trả lời:",
        choices: [
          { text: "Thanks so much, really appreciate that! I'll definitely take you up on that. 😊", feedback: "Hoàn hảo! 'Take you up on that' = chấp nhận lời đề nghị một cách tự nhiên.", score: "perfect", cultureTip: "'My door's always open' là câu nói phổ biến — hãy đáp lại bằng 'I'll take you up on that' để thể hiện bạn đánh giá cao sự giúp đỡ." },
          { text: "Thank you, that's very kind.", feedback: "Lịch sự nhưng có thể thêm 'I'll definitely reach out!' cho chủ động hơn.", score: "great", cultureTip: null },
          { text: "OK.", feedback: "Quá ngắn! Người ta đang thân thiện với bạn — hãy đáp lại tương xứng.", score: "bad", cultureTip: "Trong văn hóa công sở Mỹ, trả lời ngắn gọn quá bị coi là lạnh nhạt hoặc không quan tâm." },
        ],
      },
    ],
  },
];
