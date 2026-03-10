# CultureLingo — Học Ngôn Ngữ Qua Văn Hoá

> Brainstorming Document v0.3 — Entity-driven structure: JTBD → Input → Entity Model → Tab Navigation → Key Features

---

## 1. Jobs To Be Done (JTBD)

Người học không "học ngôn ngữ" — họ muốn **làm được một điều gì đó** bằng ngôn ngữ đích. Mỗi JTBD sẽ quyết định input, cách học, và features.

### JTBD Map

| # | JTBD | Mô tả cụ thể | Đo lường thành công |
|---|---|---|---|
| J1 | **Xem phim/series không sub** | Xem Netflix, YouTube, K-drama,... hiểu 90%+ mà không cần subtitle tiếng Việt | Tự tin tắt sub, hiểu được cả slang, humor, cultural reference |
| J2 | **Đọc sách/truyện gốc** | Đọc novel, manga, webtoon, blog bằng ngôn ngữ gốc — hiểu cả nuance | Đọc hết 1 cuốn sách/series mà không cần dịch liên tục |
| J3 | **Nghe nhạc hiểu lời** | Hiểu lyrics bài hát yêu thích — cả nghĩa đen, nghĩa bóng, và bối cảnh văn hoá | Nghe bài mới → hiểu được ý chính mà không cần tra |
| J4 | **Giao tiếp tự nhiên với người bản xứ** | Nói chuyện, chat mà không "nghe như sách giáo khoa" — dùng đúng slang, register, tone | Người bản xứ cảm thấy thoải mái nói chuyện, không phải "dumb down" |
| J5 | **Hiểu văn hoá để sống/làm việc** | Hiểu way of living, social norms, workplace culture để không bị "lạc lõng" | Navigate được tình huống xã hội phức tạp (mỉa mai, lịch sự, taboo...) |
| J6 | **Nghe podcast/tin tức chuyên đề** | Theo dõi podcast, news bằng ngôn ngữ đích về chủ đề quan tâm | Nghe 1 episode podcast 30 phút, nắm được 80%+ nội dung |

---

## 2. JTBD → Input Mapping

Từ mỗi JTBD, xác định nguồn input **thực tế nhất** mà người học sẽ dùng ngoài đời.

| JTBD | Input chính | Nguồn cụ thể | Dữ liệu khai thác |
|---|---|---|---|
| **J1: Xem phim không sub** | Video + Subtitle | Netflix, YouTube, VieOn, FPT Play, Disney+, K-drama platforms | Subtitle files (.srt/.vtt), audio tracks, scene metadata |
| **J2: Đọc sách gốc** | Text gốc | Kindle, Project Gutenberg, Open Library, Webtoon, Manga apps | Full text, chapter segments, dialogue extraction |
| **J3: Nghe nhạc hiểu lời** | Lyrics + Audio | Spotify, Apple Music, YouTube Music, Musixmatch | Lyrics synced, audio segments, artist/genre metadata |
| **J4: Giao tiếp tự nhiên** | Hội thoại thực | YouTube vlogs, podcast conversations, reality shows, talk shows | Transcript hội thoại thực, slang/idiom database |
| **J5: Hiểu văn hoá** | Multi-format | Documentaries, travel vlogs, blog văn hoá, Reddit, Quora | Cultural context articles, social norm explanations |
| **J6: Nghe podcast/news** | Audio + Transcript | Spotify podcasts, BBC, NHK, TED Talks, NPR | Auto-transcript (Whisper), topic tags, difficulty score |

### Cách lấy dữ liệu (cho demo và production)

**Subtitle/Transcript — nguồn dữ liệu cốt lõi:**
- YouTube: API chính thức lấy CC/auto-caption miễn phí
- Netflix/streaming: User tự có subtitle khi đăng ký → app tham chiếu (link tới nền tảng gốc để xem), chỉ xử lý subtitle
- Podcast: RSS public → Whisper AI tự tạo transcript
- Sách: Public domain (Gutenberg) cho demo; partnership cho production

**Cho demo:** Fake data + YouTube subtitle API + vài subtitle Netflix mẫu là đủ

---

## 3. Entity Model — Cấu Trúc Thực Thể

> Hệ thống được xây dựng quanh 4 thực thể cốt lõi, liên kết chặt chẽ với nhau.

### 3.1 Từ vựng (Word) — Đơn vị nhỏ nhất

Từ đơn là đơn vị cơ bản nhất trong hệ thống.

| Thuộc tính | Mô tả |
|---|---|
| `word` | Từ gốc (e.g. "cookout", "trippin'") |
| `meaning` | Nghĩa tiếng Việt |
| `pronunciation` | IPA / phiên âm |
| `partOfSpeech` | noun, verb, adj, adv... |
| `status` | `known` / `unknown` — **user mark thủ công** |
| `isRichPoint` | Boolean — từ này có điểm văn hoá đặc biệt không? |
| `culturalStamps` | Link tới 0+ Tem văn hoá (chỉ khi `isRichPoint = true`) |
| `sources` | Thuộc 1+ Input (từ này xuất hiện trong content nào) |
| `layers` | 3-layer data: Language, Context, Culture |

### 3.2 Từ ghép / Idiom (Compound) — Entity riêng biệt

Cụm từ, thành ngữ, phrasal verb — không phải tổng nghĩa của từng từ đơn.

| Thuộc tính | Mô tả |
|---|---|
| `phrase` | Cụm từ gốc (e.g. "pull up", "mac and cheese", "you good") |
| `meaning` | Nghĩa cụm từ |
| `components` | Danh sách Words cấu thành |
| `type` | `compound` / `idiom` / `phrasal_verb` / `slang` |
| `status` | `known` / `unknown` — user mark thủ công |
| `isRichPoint` | Boolean |
| `culturalStamps` | Link tới 0+ Tem văn hoá |
| `layers` | 3-layer data: Language, Context, Culture |

### 3.3 Input — Đơn vị nội dung

Mỗi Input là một nội dung user lựa chọn để học.

| Thuộc tính | Mô tả |
|---|---|
| `title` | Tên content |
| `type` | `video` / `podcast` / `episode` / `song` / `book_chapter` |
| `source` | Netflix, YouTube, Spotify, TED... |
| `language` | Ngôn ngữ đích |
| `difficulty` | CEFR level (A1-C2) |
| `duration` | Thời lượng |
| `transcript` | Transcript chứa Words + Compounds |
| `progress` | % hoàn thành của user |

### 3.4 Tem Văn Hoá (Cultural Stamp) — Hybrid 2-Layer Classification

Hệ thống phân loại tem văn hoá theo 2 lớp: **Category** (nhóm lớn) + **Tags** (chi tiết).

#### Layer 1 — Category (6 nhóm)

| # | Category | Ví dụ nội dung |
|---|---|---|
| 1 | **Social & Relationships** | Cách chào hỏi, small talk, friendzone, dating culture |
| 2 | **Food & Dining** | Comfort food, table manners, tipping, potluck |
| 3 | **Language & Communication** | Slang, sarcasm, register, indirect speech |
| 4 | **Work & Education** | Workplace culture, hierarchy, email etiquette |
| 5 | **Entertainment & Media** | Hip-hop, meme culture, K-drama tropes |
| 6 | **Identity & Values** | Race, gender, religion, generational differences |

#### Layer 2 — Tags (chi tiết, mở rộng linh hoạt)

Mỗi Tem thuộc **1 Category** + **nhiều Tags**. Tags có thể cross-category.

Ví dụ tags: `Slang`, `Sarcasm`, `Table Manners`, `Small Talk`, `Hip-hop`, `Race`, `Generation`, `Religion`, `Humor`, `In-group Language`, `Body Language`, `Taboo`, `Politeness`, `Community`, `Family Dynamics`...

#### Ví dụ Tem văn hoá

```
Tem: "The Cookout"
├── Category: Food & Dining
├── Tags: [Community, Black Culture, Family Dynamics, Social Norms]
├── Description: BBQ cộng đồng trong văn hoá African American...
├── Deep Dive: Full article với comparison, do's/don'ts
└── Linked rich points: "cookout", "pull up", "fix a plate", "bring a dish"

Tem: "Sarcasm in Daily Life"
├── Category: Language & Communication
├── Tags: [Humor, Tone, Indirect Speech, British Culture]
├── Description: Cách dùng sarcasm trong giao tiếp hàng ngày...
├── Deep Dive: Khi nào sarcasm, khi nào thật, cách nhận biết
└── Linked rich points: "sure", "whatever", "great", "oh really"

Tem: "The N-Word"
├── Category: Identity & Values
├── Tags: [Race, In-group Language, Taboo, Hip-hop, History]
├── Description: Từ nhạy cảm nhất trong tiếng Anh Mỹ...
├── Deep Dive: Lịch sử, ai được dùng, vì sao learner không nên dùng
└── Linked rich points: "nigga", "the n-word"
```

### 3.5 Entity Relationships

```
Input ──has──→ Transcript ──contains──→ Word (đơn từ)
                                    └──→ Compound (từ ghép/idiom)
                                              │
                                       isRichPoint?
                                         │ yes
                                         ▼
                                  Cultural Stamp
                                   ├── Category (1)
                                   └── Tags[] (nhiều)

User ──marks──→ Word/Compound status (known/unknown)
User ──collects──→ Cultural Stamps (via learning rich points)
```

**Luồng dữ liệu:**
1. User chọn **Input** (video, podcast...) → app tạo transcript
2. AI phân tích transcript → extract **Words** + **Compounds**
3. AI flag **Rich Points** → link tới **Cultural Stamps**
4. User xem content → tap từ → thấy 3-layer breakdown
5. User **mark thủ công** known/unknown cho từng từ
6. Từ rich point đã học → stamp progress tăng lên

---

## 4. Tab Navigation v2 — Cấu Trúc 5 Tab

> Thay đổi từ 4 tab (Home | Library | Chat | Passport) → 5 tab entity-driven

### Overview

```
┌─────────┬──────────┬────────────┬──────────┬──────────┐
│  Home   │ Library  │ Vocabulary │ Practice │ Passport │
│  🏠     │  📚     │  📝       │  🎯     │  🌍     │
└─────────┴──────────┴────────────┴──────────┴──────────┘
```

| Tab | Mục đích | Nội dung chính |
|-----|----------|----------------|
| **Home** | Entrypoint tổng quan | Continue learning, quick actions, daily stats, SRS reminder |
| **Library** | Browse & import content | Search, browse by type/culture, paste URL tạo bài học |
| **Vocabulary** | Quản lý từ vựng + Ôn tập | Word bank + Filter + SRS spaced repetition review |
| **Practice** | Hub luyện tập tổng hợp | Scene Practice, Fill-in-blank, Speaking, Chat AI, Flashcard |
| **Passport** | Profile & tiến độ | Cultural stamps collection, skill breakdown, stats |

### Home — Entrypoint

```
┌──────────────────────────────────────────┐
│  Xin chào, Minh 👋         🔥 12 ngày   │
│                                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │142 │ │ 5  │ │ B1 │ │1250│           │
│  │từ  │ │VH  │ │lv  │ │ XP │           │
│  └────┘ └────┘ └────┘ └────┘           │
│                                          │
│  ⏰ 8 từ cần ôn hôm nay → [Ôn ngay]    │
│                                          │
│  📖 TIẾP TỤC HỌC                        │
│  ├── Atlanta S2E5 ████░░ 40%            │
│  └── Friends S1E1 ██░░░░ 20%            │
│                                          │
│  ⚡ HÀNH ĐỘNG NHANH                      │
│  ┌─────────┐ ┌──────────┐               │
│  │🎬 Xem   │ │📝 Ôn từ  │ → Vocab tab  │
│  │ phim    │ │ vựng     │               │
│  └─────────┘ └──────────┘               │
│  ┌─────────┐ ┌──────────┐               │
│  │🎯 Luyện │ │➕ Thêm   │ → Library    │
│  │ tập     │ │ mới      │               │
│  └─────────┘ └──────────┘               │
│                                          │
│  🎯 GỢI Ý PRACTICE                      │
│  Scene: Atlanta Barbershop → [Luyện]     │
└──────────────────────────────────────────┘
```

Home là trung tâm điều hướng:
- **SRS reminder** → dẫn tới Vocabulary tab
- **Continue learning** → dẫn tới Player (trong Library flow)
- **Quick actions** → dẫn tới Library, Vocabulary, Practice
- **Practice suggestion** → dẫn tới Practice tab

### Vocabulary — Word Bank + SRS Review

```
┌──────────────────────────────────────────┐
│  📝 TỪ VỰNG CỦA TÔI                     │
│                                          │
│  [Danh sách]        [Ôn tập 🔔 8]       │
│                                          │
│  ── Tab: Danh sách ──                    │
│  Filter:                                 │
│  [All] [Chưa biết] [Rich Point ⭐]      │
│  [Theo Input ▼] [Theo Tem ▼]            │
│  [Từ đơn] [Từ ghép/Idiom]               │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ cookout         ⭐ 🏷Food          │  │
│  │ n. — BBQ cộng đồng                │  │
│  │ Status: [Chưa biết]  [Đã biết ✓]  │  │
│  ├────────────────────────────────────┤  │
│  │ pull up          ⭐ 🏷Social       │  │
│  │ phrasal v. — ghé qua, đến         │  │
│  │ Status: [Chưa biết]  [Đã biết ✓]  │  │
│  ├────────────────────────────────────┤  │
│  │ deadline                           │  │
│  │ n. — hạn chót                      │  │
│  │ Status: [Chưa biết]  [✓ Đã biết]  │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ── Tab: Ôn tập (SRS) ──               │
│  8 từ cần ôn hôm nay                    │
│  [Bắt đầu ôn tập]                       │
│                                          │
│  Flashcard mode:                         │
│  ┌────────────────────────┐              │
│  │      "cookout"         │              │
│  │                        │              │
│  │    [Tap to reveal]     │              │
│  │                        │              │
│  │  [Khó] [OK] [Dễ]      │              │
│  └────────────────────────┘              │
└──────────────────────────────────────────┘
```

**Chức năng chính:**
- **Word bank**: Tất cả từ đã gặp, lọc theo known/unknown, rich point, input source, tem văn hoá, loại (từ đơn vs từ ghép)
- **Manual mark**: User bấm toggle known/unknown cho từng từ
- **SRS Review**: Spaced repetition flashcard, hiện số từ cần ôn, interval tự điều chỉnh theo đánh giá (Khó/OK/Dễ)
- **Tap vào từ** → mở 3-Layer Word Explorer (chi tiết Language/Context/Culture)

### Practice — Hub Luyện Tập

```
┌──────────────────────────────────────────┐
│  🎯 LUYỆN TẬP                            │
│                                          │
│  🎬 Scene Practice                       │
│  3 scenes sẵn sàng từ content đã xem    │
│  ├── Atlanta S2E5 — Barbershop           │
│  ├── Friends S1E1 — Central Perk         │
│  └── Parasite — Dinner scene             │
│                                          │
│  📝 Fill-in-the-blank                    │
│  12 câu từ Atlanta, 8 câu từ Friends     │
│                                          │
│  🗣️ Chat AI                             │
│  Luyện hội thoại với AI theo scenario    │
│  ├── Cookout invitation                  │
│  ├── Ordering street food                │
│  └── Job interview small talk            │
│                                          │
│  🎤 Speaking Practice                    │
│  Lặp lại câu, đóng vai nhân vật         │
│                                          │
│  🃏 Flashcard Review                     │
│  Quick review → link tới Vocab SRS       │
│                                          │
└──────────────────────────────────────────┘
```

**Lưu ý:** Chat AI (trước đây là tab riêng) nay nằm trong Practice Hub — bản chất là một dạng luyện tập hội thoại.

---

## 5. Từ Transcript → Learning Design (Content Processing)

Đây là phần cốt lõi: **Khi có transcript/text rồi, ta tạo ra nội dung học như thế nào?**

### 5.1 Nguyên tắc: "Deep Understanding" — không chỉ dịch, mà HIỂU

Lấy ví dụ 1 câu từ phim: *"Yo what's good my nigga, you trippin'"*

Cách học truyền thống chỉ dịch: "Ê sao rồi bạn, bạn làm quá đấy"

**Cách của CultureLingo — 3 tầng hiểu:**

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: LANGUAGE (Ngôn ngữ)                               │
│  ├─ Vocabulary: "trippin'" = tripping = phản ứng thái quá   │
│  ├─ Grammar: Dropping "are" → informal register              │
│  ├─ Pronunciation: "what's good" → /wʌts gʊd/ nối âm       │
│  └─ Slang: "my nigga" = thân mật giữa bạn bè               │
│                                                              │
│  LAYER 2: CONTEXT (Ngữ cảnh sử dụng)                        │
│  ├─ Register: Chỉ dùng giữa bạn thân, cực kỳ informal      │
│  ├─ Tone: Vui vẻ, trách nhẹ kiểu bạn bè                    │
│  ├─ Situation: Khi nào nói được, khi nào tuyệt đối không    │
│  └─ Alternatives: "What's up bro" (safe), "Hey man" (safe)  │
│                                                              │
│  LAYER 3: CULTURE (Văn hoá & Way of Living)                  │
│  ├─ Lịch sử: Nguồn gốc từ "nigga" trong văn hoá Mỹ —      │
│  │   từ sự áp bức → reclaim bởi cộng đồng African American  │
│  ├─ Social rule: Ai được dùng, ai không? Vì sao?            │
│  ├─ Pop culture: Xuất hiện nhiều trong Hip-hop, phim —       │
│  │   nhưng nghe trong phim ≠ dùng ngoài đời                 │
│  ├─ Tương đương xuyên văn hoá: Từ nào trong tiếng Việt      │
│  │   cũng có tính "in-group only" tương tự?                 │
│  └─ Real-world advice: Là người nước ngoài, bạn KHÔNG nên   │
│     dùng từ này — đây là lý do...                            │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Content Processing Pipeline

Từ raw transcript → learning content theo 3 layers:

```
Raw Transcript (subtitle/text/lyrics)
    │
    ▼
┌─────────────────────────────────────┐
│  AI Analysis Engine                  │
│                                      │
│  1. Sentence segmentation            │
│  2. Difficulty scoring (CEFR)        │
│  3. Element detection:               │
│     - Vocabulary (từ mới, tần suất)  │
│     - Grammar patterns               │
│     - Slang / Idioms / Colloquial    │
│     - Cultural references            │
│     - Emotional tone / Register      │
│  4. Flag "Rich Points" — điểm mà    │
│     người học sẽ bất ngờ hoặc hiểu  │
│     sai nếu chỉ dịch từng chữ       │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Learning Content Generation         │
│                                      │
│  Per sentence/segment, generate:     │
│                                      │
│  [Layer 1] Language Cards            │
│  - Vocab flashcard + pronunciation   │
│  - Grammar breakdown                 │
│  - Cloze exercise (điền từ)          │
│  - Listening drill (nghe điền)       │
│                                      │
│  [Layer 2] Context Cards             │
│  - When to use / not use             │
│  - Register explanation              │
│  - Similar expressions by formality  │
│  - Dialogue practice (role-play)     │
│                                      │
│  [Layer 3] Culture Cards             │
│  - Cultural background article       │
│  - Cross-cultural comparison         │
│  - "Rich Point" deep dive            │
│  - Real-world do's and don'ts        │
└─────────────────────────────────────┘
```

### 5.3 Learning Design per JTBD

#### J1: Xem phim không sub → "Scene-Based Learning"

**Input:** 1 scene phim (30s-3min) + subtitle

**Flow học:**
1. **Watch** — Xem scene với subtitle ngôn ngữ đích (không dịch)
2. **Breakdown** — Mỗi câu được tách ra, tap để xem 3 layers
3. **Practice** — Nghe lại không sub, điền từ bị ẩn
4. **Rewatch** — Xem lại toàn bộ scene → cảm nhận sự khác biệt khi đã hiểu
5. **Level up** — Scene tiếp theo khó hơn, ít hỗ trợ hơn

**Mục tiêu dài hạn:** Sau N bài, user thử xem 1 episode đầy đủ, app đo % hiểu được (self-report + quiz)

#### J2: Đọc sách gốc → "Page-Based Learning"

**Input:** 1 đoạn sách/truyện (1-2 trang)

**Flow học:**
1. **Read** — Đọc đoạn gốc, tap từ lạ để xem nghĩa nhanh
2. **Deep words** — AI highlight từ/cụm quan trọng → flashcard với context
3. **Culture note** — Pop-up giải thích cultural reference nếu có
4. **Comprehension** — Quiz ngắn: hiểu nội dung? Hiểu nuance?
5. **Journal** — Viết 1-2 câu phản hồi về đoạn đã đọc

#### J3: Nghe nhạc hiểu lời → "Lyrics-Based Learning"

**Input:** 1 bài hát + lyrics synced

**Flow học:**
1. **Listen** — Nghe bài hát, lyrics hiện synced theo nhịp
2. **Tap to explore** — Tap vào dòng lyrics → 3 layers giải thích
3. **Sing along** — Karaoke mode, luyện phát âm theo nhịp
4. **Fill the lyrics** — Nghe lại, điền từ bị ẩn trong lyrics
5. **Story behind** — Bài hát này nói về gì? Bối cảnh văn hoá?

#### J4: Giao tiếp tự nhiên → "Conversation-Based Learning"

**Input:** Hội thoại thực từ vlog/podcast/reality show

**Flow học:**
1. **Observe** — Xem/nghe 1 đoạn hội thoại thực
2. **Decode** — Phân tích: formal hay informal? Quan hệ giữa 2 người? Cảm xúc?
3. **Role-play** — AI đóng vai 1 người, user đóng vai người còn lại
4. **Free talk** — AI mở rộng conversation, user nói tự do
5. **Feedback** — AI nhận xét: tự nhiên không? Register đúng không?

#### J5: Hiểu văn hoá → "Culture Deep Dive"

**Input:** Documentary clip / cultural article / social media discourse

**Flow học:**
1. **Discover** — Xem/đọc nội dung về 1 khía cạnh văn hoá
2. **Rich Points** — AI highlight những điểm "bất ngờ" đối với người ngoài văn hoá
3. **Compare** — So sánh với văn hoá của người học: "Ở nước bạn thì sao?"
4. **Vocabulary** — Học từ vựng liên quan đến chủ đề văn hoá này
5. **Scenario** — Tình huống giả lập: bạn sẽ xử lý thế nào?

---

## 6. Key Features — Mô Tả UX Chi Tiết

### Feature 1: Smart Transcript Player

> **Mục tiêu:** Biến bất kỳ video/audio nào thành bài học tương tác

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │                                               │  │
│  │            [  Video Player  ]                 │  │
│  │                                               │  │
│  │          advancement of civilization           │  │
│  │  ◄◄   ▶   ►►   🔄 0.75x   🐢 Slow mode      │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  TRANSCRIPT (auto-scroll, synced with video):        │
│  ──────────────────────────────────────────────      │
│                                                      │
│  00:32  "Yo what's good, you coming to              │
│          the cookout this weekend?"                   │
│                                                      │
│  00:35  "For sure! Should I bring                    │
│          something? Like a dish?"                     │
│                                                      │
│  00:38  "Nah you good, just pull up.     ← NOW      │
│          My mom's making her famous                   │
│          mac and cheese"                              │
│                                                      │
│  ─────────────────────────────────────────────       │
│  Tap any word or phrase for instant breakdown:       │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  "pull up"                                   │    │
│  │                                              │    │
│  │  LANGUAGE: đến, ghé qua (informal)           │    │
│  │  Không phải "kéo lên" (nghĩa gốc)           │    │
│  │                                              │    │
│  │  CONTEXT: Dùng với bạn bè, rất casual        │    │
│  │  "Come over" = lịch sự hơn                   │    │
│  │  "Please join us" = formal                   │    │
│  │                                              │    │
│  │  CULTURE: "Cookout" = BBQ cộng đồng,         │    │
│  │  rất quan trọng trong văn hoá African         │    │
│  │  American — nơi gia đình, hàng xóm gắn       │    │
│  │  kết. Mang đồ ăn đến = phép lịch sự,         │    │
│  │  nhưng "you good" = thân đến mức không        │    │
│  │  cần khách sáo.                               │    │
│  │                                              │    │
│  │  [ Add to vocabulary ]  [ Practice this ]    │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ──────────────────────────────────────────────      │
│  Bottom bar:                                         │
│  [ Transcript ]  [ Vocab List ]  [ Culture Notes ]  │
└─────────────────────────────────────────────────────┘
```

**UX Details:**
- Video/audio player ở trên, transcript cuộn bên dưới, synced real-time
- Tap vào bất kỳ từ/cụm từ → popup 3 tầng (Language / Context / Culture)
- Slow mode: phát chậm từng câu, lặp lại
- Loop mode: lặp 1 câu cho đến khi nghe rõ
- Từ mới tự động highlight (dựa trên level hiện tại của user)
- Nút "Add to vocabulary" lưu từ vào hệ thống spaced repetition
- Nút "Practice this" → nhảy sang bài tập cho câu/từ đó

---

### Feature 2: 3-Layer Word Explorer

> **Mục tiêu:** Mỗi từ/cụm từ không chỉ được dịch — mà được HIỂU ở 3 tầng

```
┌──────────────────────────────────────────────┐
│  "mac and cheese"                             │
│                                               │
│  ┌──────────┬──────────┬──────────────────┐  │
│  │ LANGUAGE │ CONTEXT  │ CULTURE          │  │
│  │ (active) │          │                  │  │
│  └──────────┴──────────┴──────────────────┘  │
│                                               │
│  Tab: LANGUAGE                                │
│  ─────────────                                │
│  Meaning: Macaroni and cheese — mì ống        │
│  trộn phô mai nướng                           │
│                                               │
│  Pronunciation: /mæk ən tʃiːz/               │
│  [▶ Hear it]  [🎤 Try saying it]             │
│                                               │
│  Grammar note: Viết tắt "macaroni and"        │
│  → "mac and" (rất phổ biến)                   │
│  ─────────────────────────────────────────    │
│                                               │
│  Tab: CONTEXT                                 │
│  ─────────────                                │
│  Register: Casual, dùng trong gia đình, bạn   │
│  bè. Formal hơn: "baked macaroni and cheese"  │
│                                               │
│  Common phrases:                              │
│  • "homemade mac and cheese" (tự làm)         │
│  • "box mac and cheese" (ăn liền, Kraft)      │
│  • "mom's famous mac and cheese" (đặc sản     │
│     của mẹ — ngụ ý niềm tự hào gia đình)     │
│  ─────────────────────────────────────────    │
│                                               │
│  Tab: CULTURE                                 │
│  ─────────────                                │
│  Mac and cheese là "comfort food" biểu        │
│  tượng của Mỹ, đặc biệt trong văn hoá        │
│  African American & miền Nam Mỹ.              │
│                                               │
│  "My mom's famous..." → gia đình Mỹ thường   │
│  có 1 món "signature" mà ai cũng biết.       │
│  Đây là cách thể hiện bản sắc gia đình       │
│  thông qua ẩm thực.                          │
│                                               │
│  So sánh: Tương tự như "bún bò mẹ nấu"       │
│  trong văn hoá Việt — mỗi nhà có 1 công      │
│  thức riêng, là niềm tự hào.                 │
│                                               │
│  [Xem thêm: Soul Food trong văn hoá Mỹ →]   │
│                                               │
│  ─────────────────────────────────────────    │
│  [ Add to Vocab ]  [ Practice ]  [ Share ]   │
└──────────────────────────────────────────────┘
```

**UX Details:**
- 3 tab chuyển đổi: Language (mặc định) → Context → Culture
- Beginner: tự động mở tab Language trước
- Intermediate+: có thể set mặc định mở tab Culture
- Culture tab có "Xem thêm" → link tới Culture Deep Dive article
- "So sánh" luôn liên hệ với văn hoá gốc của người học → tạo "Rich Point"

---

### Feature 3: Scene Practice Mode

> **Mục tiêu:** Biến 1 scene phim thành bài luyện tập đa kỹ năng

```
┌──────────────────────────────────────────────┐
│  SCENE PRACTICE                               │
│  "The Cookout Invitation" (from: Atlanta S2)  │
│                                               │
│  Progress: ████████░░ Step 3/5                │
│                                               │
│  ─── STEP 3: LISTEN & FILL ───               │
│                                               │
│  [▶ Play audio]                               │
│                                               │
│  "Nah you _____, just _____ _____.            │
│   My mom's making her _____ mac and cheese"   │
│                                               │
│  Your answers:                                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│  │ good   │ │ pull   │ │ up     │ │ famous ││
│  └────────┘ └────────┘ └────────┘ └────────┘│
│                                               │
│  [▶ Hear again]      [CHECK ANSWER]          │
│                                               │
│  ─────────────────────────────────────────    │
│  Steps:                                       │
│  ✅ 1. Watch scene (với sub)                  │
│  ✅ 2. Word explorer (tap để hiểu)            │
│  → 3. Listen & Fill (đang làm)               │
│  ○ 4. Speak — đóng vai nhân vật              │
│  ○ 5. Rewatch — xem lại không sub            │
│                                               │
└──────────────────────────────────────────────┘
```

**5 Steps chi tiết:**

| Step | Kỹ năng | UX |
|---|---|---|
| 1. Watch | Listening + Reading | Xem scene với subtitle ngôn ngữ đích. Thoải mái, không áp lực |
| 2. Explore | Vocabulary + Culture | Transcript hiện ra, tap vào từ/cụm từ → 3-Layer Explorer. AI highlight từ nên học |
| 3. Listen & Fill | Listening | Nghe lại KHÔNG sub, điền từ bị ẩn. Có thể nghe lại, nghe chậm |
| 4. Speak | Speaking | AI phát lại từng câu → user lặp lại hoặc đóng vai nhân vật. AI chấm phát âm + tự nhiên |
| 5. Rewatch | Comprehension | Xem lại toàn bộ scene không sub. Cảm nhận sự tiến bộ. Self-rate: hiểu bao nhiêu %? |

---

### Feature 4: Culture Deep Dive Cards

> **Mục tiêu:** Mở rộng từ 1 từ/cụm từ → bài học ngắn về way of living

```
┌──────────────────────────────────────────────┐
│  CULTURE DEEP DIVE                            │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │  [Image: A backyard cookout scene]     │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  "The Cookout" — Nhiều hơn một bữa BBQ       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│                                               │
│  Trong văn hoá African American, "cookout"    │
│  không chỉ là nướng thịt ngoài trời. Đó là   │
│  nơi cả cộng đồng gắn kết — hàng xóm, bạn   │
│  bè, gia đình mở rộng.                       │
│                                               │
│  Quy tắc ngầm:                               │
│  • Ai đó nói "pull up" = bạn được mời thật   │
│  • Mang theo 1 món ăn = phép lịch sự         │
│  • "You good" = thân đến mức không cần        │
│    khách sáo                                  │
│  • Không ai về sớm — ở đến tối là bình       │
│    thường                                     │
│                                               │
│  Từ vựng cookout:                             │
│  • Grill / Pit master / Side dish / Cooler    │
│  • "Fix a plate" = lấy đồ ăn vào đĩa        │
│  • "Bring a plus one" = dẫn thêm 1 người     │
│                                               │
│  🔄 So sánh với văn hoá bạn:                 │
│  "Ở Việt Nam, tương tự nhất là đám giỗ hoặc  │
│  tiệc tất niên — cũng là dịp gia đình mở     │
│  rộng, hàng xóm tụ họp, mỗi nhà mang 1 món" │
│                                               │
│  ─────────────────────────────────────────    │
│  Nội dung liên quan:                          │
│  📺 Scene: Atlanta S2E5 — cookout scene       │
│  🎵 Song: Kendrick Lamar — "m.A.A.d city"    │
│  📖 Read: "Between the World and Me"          │
│                                               │
│  [ Mark as Learned ✓ ]  [ Save for Later ]   │
└──────────────────────────────────────────────┘
```

**UX Details:**
- Khi user gặp từ có cultural depth → gợi ý "Tìm hiểu thêm" → mở Deep Dive
- Mỗi card: 2-3 phút đọc, có hình ảnh minh hoạ
- Luôn có phần "So sánh với văn hoá bạn" → tạo Rich Point
- Cuối card: link tới content liên quan (phim, nhạc, sách) → tạo learning loop
- Cards được lưu vào "Cultural Passport" của user

---

### Feature 5: AI Conversation Partner

> **Mục tiêu:** Luyện nói tự nhiên trong bối cảnh văn hoá cụ thể, không phải hội thoại giáo khoa

```
┌──────────────────────────────────────────────┐
│  AI CONVERSATION                              │
│  Scenario: You're invited to a cookout        │
│  AI plays: Your American friend, Marcus       │
│                                               │
│  ─────────────────────────────────────────    │
│                                               │
│  Marcus: "Yo! We're having a cookout          │
│  this Saturday at my place. You should         │
│  come through!"                                │
│                                               │
│                    You: "That sounds great!    │
│                    What should I bring?"       │
│                                               │
│  Marcus: "You don't gotta bring nothing,      │
│  just pull up around 4. But if you wanna,     │
│  some drinks would be cool"                    │
│                                               │
│               [🎤 Tap to respond by voice]    │
│               [⌨️ Or type your response]      │
│                                               │
│  ─────────────────────────────────────────    │
│                                               │
│  💡 LIVE HINTS (toggle on/off):               │
│  ┌─────────────────────────────────────────┐ │
│  │ Gợi ý: Có thể hỏi thêm về dress code  │ │
│  │ hoặc ai sẽ đến. Nói casual nhé —       │ │
│  │ đây là bạn thân!                        │ │
│  │                                         │ │
│  │ Try: "Bet! Who's all gonna be there?"   │ │
│  │ hoặc: "For sure! Is it like a          │ │
│  │ casual thing?"                          │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ─────────────────────────────────────────    │
│  After conversation:                          │
│  [ Review Transcript ] → xem lại + feedback   │
│  [ New Words Learned: 4 ] → lưu vào vocab    │
│  [ Cultural Notes: 2 ] → lưu vào passport    │
└──────────────────────────────────────────────┘
```

**UX Details:**
- AI đóng vai nhân vật cụ thể (tên, tính cách, bối cảnh)
- User chọn voice hoặc text
- Live Hints (bật/tắt): gợi ý nên nói gì, dùng expression nào
- AI điều chỉnh độ khó theo level: level thấp → nói chậm, đơn giản; level cao → dùng slang, nói nhanh
- Sau conversation: transcript review với highlight từ mới + cultural notes
- AI feedback: "Bạn nói tự nhiên! Nhưng 'What should I bring?' hơi formal — thử 'Should I bring anything?' hoặc 'Want me to bring something?'"

---

### Feature 6: Lyrics Lab

> **Mục tiêu:** Học ngôn ngữ qua nhạc — hiểu cả nghĩa đen, nghĩa bóng, và văn hoá đằng sau

```
┌──────────────────────────────────────────────┐
│  LYRICS LAB                                   │
│  🎵 "HUMBLE." — Kendrick Lamar                │
│                                               │
│  [▶ advancement of civilization] advancement of civilization            │
│   advancement of civilizationadvancement of civilization──────────────advancement of civilization│
│                                               │
│  ♪  "Be humble"                               │
│  ♪  "Sit down"                                │
│  ♪  "Be humble"                  ← NOW        │
│  ♪  "Hol' up, lil' bitch"                    │
│                                               │
│  Tap dòng "Hol' up, lil' bitch":             │
│  ┌─────────────────────────────────────────┐ │
│  │  LANGUAGE: "Hold up" = khoan đã          │ │
│  │  "lil'" = little (viết tắt)             │ │
│  │                                          │ │
│  │  CONTEXT: Giọng điệu assertive,         │ │
│  │  dominant. Hip-hop thường dùng ngôn      │ │
│  │  ngữ mạnh để thể hiện confidence.        │ │
│  │  Không dùng trong giao tiếp bình thường! │ │
│  │                                          │ │
│  │  CULTURE: Kendrick đang nói về sự        │ │
│  │  khiêm tốn trong bối cảnh thành công     │ │
│  │  — mâu thuẫn có chủ đích giữa lời       │ │
│  │  "humble" và giọng aggressive.           │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  Practice modes:                              │
│  [🎤 Karaoke]  [📝 Fill lyrics]  [📖 Story]  │
│                                               │
│  📖 Story behind the song:                    │
│  "HUMBLE là single từ album DAMN (2017)..."   │
│                                               │
└──────────────────────────────────────────────┘
```

**UX Details:**
- Lyrics synced với nhạc, auto-scroll
- Tap vào bất kỳ dòng → 3-layer breakdown
- Karaoke mode: hát theo, AI chấm phát âm + rhythm
- Fill lyrics: nghe nhạc, điền từ bị ẩn
- Story mode: đọc về background bài hát, nghệ sĩ, thể loại nhạc
- Playlist theo chủ đề văn hoá: "Hip-hop & Black Culture", "J-pop & Kawaii Culture", "K-pop & Hallyu Wave"

---

### Feature 7: Cultural Passport & Progress

> **Mục tiêu:** Gamification có ý nghĩa — track cả language progress VÀ cultural understanding

```
┌──────────────────────────────────────────────┐
│  MY CULTURAL PASSPORT                         │
│  ─────────────────────                        │
│                                               │
│  🔥 Streak: 12 days    ⭐ XP: 2,450          │
│  📚 Words learned: 347  🌍 Cultures: 3       │
│                                               │
│  ━━━ STAMPS COLLECTED ━━━                     │
│                                               │
│  [🍔 American       ] [🍜 Vietnamese    ]    │
│  [  Food Culture     ] [  Street Food    ]    │
│  [  ████████ 80%     ] [  ████░░░░ 45%   ]    │
│                                               │
│  [🎵 Hip-Hop        ] [🎌 Japanese      ]    │
│  [  Culture          ] [  Politeness     ]    │
│  [  ██████░░ 60%     ] [  ██░░░░░░ 20%   ]    │
│                                               │
│  [🔒 British Humor  ] [🔒 K-Drama       ]    │
│  [  Coming soon...   ] [  Relationships  ]    │
│                                               │
│  ━━━ RECENT ACTIVITY ━━━                      │
│                                               │
│  Today:                                       │
│  ✅ Watched: Atlanta S2E5 cookout scene       │
│  ✅ Learned: 8 new words, 2 cultural notes    │
│  ✅ Conversation: Cookout invitation (85%)    │
│                                               │
│  ━━━ SKILL BREAKDOWN ━━━                      │
│                                               │
│  Listening:  ████████░░ B2                    │
│  Speaking:   ██████░░░░ B1                    │
│  Reading:    █████████░ B2+                   │
│  Writing:    █████░░░░░ B1                    │
│  Culture:    ███████░░░ Intermediate           │
│                                               │
└──────────────────────────────────────────────┘
```

**UX Details:**
- "Passport" thay cho skill tree — mỗi chủ đề văn hoá = 1 stamp
- Progress theo cả CEFR level (language) + Cultural Understanding level
- Streak đếm ngày liên tục, nhưng cũng track "Cultural Discovery" (bao nhiêu rich points đã khám phá)
- Weekly report: "Tuần này bạn đã học 45 từ mới và khám phá 3 khía cạnh văn hoá Mỹ"

---

### Feature 8: Content Library (Browse & Search)

> **Mục tiêu:** User chọn content mình THÍCH để học, không phải học theo curriculum cứng nhắc

```
┌──────────────────────────────────────────────┐
│  LIBRARY                                      │
│  ─────────                                    │
│  What do you want to explore today?           │
│                                               │
│  [🔍 Search: "friends sitcom"              ]  │
│                                               │
│  ━━━ BROWSE BY TYPE ━━━                       │
│  [ 🎬 Movies & Series ]  [ 📖 Books ]        │
│  [ 🎵 Music ]  [ 🎙 Podcasts ]  [ 📺 YouTube]│
│                                               │
│  ━━━ TRENDING NOW ━━━                         │
│  ┌────────────┐ ┌────────────┐ ┌───────────┐ │
│  │ 🎬         │ │ 🎵         │ │ 📺        │ │
│  │ Squid Game │ │ BTS -      │ │ Abroad in │ │
│  │ S2E1       │ │ Dynamite   │ │ Japan     │ │
│  │ ⭐ B1-B2   │ │ ⭐ A2-B1   │ │ ⭐ A2     │ │
│  │ 🇰🇷 Korean │ │ 🇰🇷 Korean │ │ 🇯🇵 Japan │ │
│  └────────────┘ └────────────┘ └───────────┘ │
│                                               │
│  ━━━ RECOMMENDED FOR YOU ━━━                  │
│  Based on: You like K-drama + B1 level        │
│  • Crash Landing on You — Episode 3           │
│  • IU — "Love Poem" lyrics                    │
│  • Korean Work Culture (Deep Dive)            │
│                                               │
│  ━━━ BY CULTURE ━━━                           │
│  [🇺🇸 American] [🇰🇷 Korean] [🇯🇵 Japanese] │
│  [🇻🇳 Vietnamese] [🇬🇧 British] [🇫🇷 French]│
│                                               │
└──────────────────────────────────────────────┘
```

**UX Details:**
- User chọn content theo sở thích, KHÔNG bị ép theo curriculum
- Mỗi content item hiển thị: difficulty level (CEFR), ngôn ngữ, thể loại
- AI recommend dựa trên: level hiện tại + sở thích + gap trong knowledge
- Khi user paste 1 YouTube URL hoặc nhập tên phim → app tự tạo bài học từ subtitle
- "Bring Your Own Content": user import subtitle file bất kỳ → app biến thành bài học

---

## 7. Feature Summary & Priority

| # | Feature | JTBD served | Tab | Priority | Lý do |
|---|---|---|---|---|---|
| F1 | **Smart Transcript Player** | J1, J3, J6 | Library → Player | P0 — Must have | Core experience, mọi thứ xây trên này |
| F2 | **3-Layer Word Explorer** | All | Popup (từ Player/Vocab) | P0 — Must have | Unique selling point, tạo khác biệt |
| F3 | **Scene Practice Mode** | J1, J4 | Practice | P0 — Must have | Đây là "bài học" chính |
| F4 | **Culture Deep Dive Cards** | J5 | Passport + Vocab | P1 — Should have | Tạo depth, nhưng demo có thể fake vài cards |
| F5 | **AI Conversation Partner** | J4, J5 | Practice (gộp) | P1 — Should have | Gộp vào Practice Hub thay vì tab riêng |
| F6 | **Lyrics Lab** | J3 | Library → Player | P2 — Nice to have | Engaging nhưng không phải core flow |
| F7 | **Cultural Passport** | All | Passport | P1 — Should have | Gamification + progress tracking |
| F8 | **Content Library** | All | Library | P1 — Should have | Content discovery, nhưng demo có thể hardcode |
| F9 | **Vocabulary Management** | All | Vocabulary | P0 — Must have | Word bank + SRS Review, quản lý known/unknown |

---

## 8. User Flow Tổng Quan (v2 — 5 Tab)

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  ONBOARDING                                              │
│  ├─ Chọn ngôn ngữ muốn học                              │
│  ├─ Chọn level hiện tại (A1-C2 hoặc quiz nhanh)         │
│  ├─ Chọn sở thích: Phim? Nhạc? Sách? Podcast?           │
│  └─ Chọn mục tiêu (JTBD): "Tôi muốn xem phim không     │
│     sub" / "Tôi muốn giao tiếp tự nhiên" / ...          │
│                                                          │
│  DAILY EXPERIENCE (5 Tab)                                │
│  ├─ 🏠 Home: SRS reminder, continue learning,           │
│  │   quick actions → dẫn tới các tab khác                │
│  ├─ 📚 Library: Tìm/import content, paste URL            │
│  ├─ 📝 Vocabulary: Word bank, filter, mark known/unknown │
│  │   + SRS spaced repetition ôn tập hàng ngày            │
│  ├─ 🎯 Practice: Scene Practice, Fill-in-blank,          │
│  │   Chat AI, Speaking, Flashcard                        │
│  └─ 🌍 Passport: Cultural stamps, skills, stats          │
│                                                          │
│  CONTENT LOOP                                            │
│  ├─ User chọn/tìm content (Library tab hoặc Home)        │
│  ├─ Xem/nghe với Smart Transcript Player                 │
│  ├─ Tap từ mới → 3-Layer Explorer                        │
│  ├─ Mark known/unknown → lưu vào Vocabulary tab          │
│  ├─ Gặp rich point → link tới Cultural Stamp             │
│  ├─ Làm Practice (scene, fill, chat AI, speak)           │
│  └─ SRS tự nhắc ôn từ vào ngày mai (Home + Vocab tab)   │
│                                                          │
│  ENTITY FLOW                                             │
│  ├─ Input → extract Words + Compounds                    │
│  ├─ AI flag Rich Points → link Cultural Stamps           │
│  ├─ User mark known/unknown thủ công                     │
│  ├─ Unknown words → SRS queue                            │
│  └─ Rich points learned → Stamp progress tăng            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 9. Câu Hỏi Mở

1. **Ưu tiên ngôn ngữ nào cho demo?** (Anh, Hàn, Nhật, Việt?)
2. **"Bring Your Own Content" có nên là core feature?** (User paste URL → app tạo bài học)
3. **Community features:** Có cần social element (share progress, discussion) không?
4. **Monetization:** Freemium (giới hạn content/ngày) hay subscription?
5. **SRS algorithm:** Dùng SM-2 (Anki-style) hay custom interval? Áp dụng cho cả Words lẫn Compounds?
6. **Tem văn hoá - Tags mở rộng:** Cho phép user tự tạo tags hay chỉ system-defined?
7. **Practice difficulty scaling:** Mỗi loại practice trong Hub có tự điều chỉnh độ khó theo user level không?

---

*v0.3 — Entity-driven restructure: Entity Model, 5-Tab Navigation, Hybrid Cultural Stamps*
