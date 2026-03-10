import { useNavigate } from "react-router-dom";
import { contentItems } from "../data/library";
import { chatScenarios } from "../data/chatScenarios";
import { getSrsQueue } from "../data/vocabulary";

export default function PracticeHubPage() {
  const navigate = useNavigate();
  const practiceContent = contentItems.filter((c) => c.hasPractice && c.imported);
  const srsCount = getSrsQueue().length;

  const practiceTypes = [
    {
      id: "scene",
      icon: "🎬",
      title: "Scene Practice",
      desc: "Luyện nghe, nói, điền từ theo scene phim",
      color: "from-purple-500 to-indigo-600",
      badge: practiceContent.length > 0 ? `${practiceContent.length} scenes` : null,
    },
    {
      id: "fill",
      icon: "📝",
      title: "Fill-in-the-blank",
      desc: "Nghe và điền từ bị ẩn trong câu",
      color: "from-blue-500 to-cyan-600",
      badge: practiceContent.length > 0 ? `${practiceContent.reduce((sum, c) => sum + (c.scenes || 0), 0)} câu` : null,
    },
    {
      id: "chat",
      icon: "🗣️",
      title: "Chat AI",
      desc: "Luyện hội thoại với AI theo scenario văn hóa",
      color: "from-pink-500 to-rose-600",
      badge: `${chatScenarios.length} scenarios`,
    },
    {
      id: "speak",
      icon: "🎤",
      title: "Speaking Practice",
      desc: "Lặp lại câu, đóng vai nhân vật trong scene",
      color: "from-orange-500 to-amber-600",
      badge: null,
    },
    {
      id: "flashcard",
      icon: "🃏",
      title: "Flashcard Review",
      desc: "Ôn từ vựng nhanh với spaced repetition",
      color: "from-green-500 to-emerald-600",
      badge: srsCount > 0 ? `${srsCount} từ cần ôn` : "Đã ôn xong",
    },
  ];

  const handlePracticeClick = (type) => {
    switch (type) {
      case "scene":
        if (practiceContent.length > 0) {
          // Navigate to first available practice
          navigate(`/practice/${practiceContent[0].id}`);
        }
        break;
      case "fill":
        if (practiceContent.length > 0) {
          navigate(`/practice/${practiceContent[0].id}`);
        }
        break;
      case "chat":
        navigate("/chat");
        break;
      case "speak":
        if (practiceContent.length > 0) {
          navigate(`/practice/${practiceContent[0].id}`);
        }
        break;
      case "flashcard":
        navigate("/vocabulary");
        break;
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-5 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-white text-xl font-bold mb-1">Luyện tập</h1>
        <p className="text-white/70 text-sm">Chọn loại bài tập phù hợp với bạn</p>
      </div>

      <div className="px-4 -mt-4">
        {/* Practice types */}
        <div className="space-y-3">
          {practiceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handlePracticeClick(type.id)}
              className="w-full bg-card rounded-2xl border border-border shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 p-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{type.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-txt">{type.title}</h3>
                    {type.badge && (
                      <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {type.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-txt-secondary mt-0.5 line-clamp-1">{type.desc}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Scene Practice detail */}
        {practiceContent.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-bold text-txt mb-3">Scenes sẵn sàng luyện tập</h2>
            <div className="space-y-2">
              {practiceContent.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/practice/${item.id}`)}
                  className="w-full flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🎬</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-txt line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        item.difficulty === "B2" ? "bg-orange-100 text-orange-700" :
                        item.difficulty === "B1" ? "bg-green-100 text-green-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>{item.difficulty}</span>
                      <span className="text-[10px] text-txt-light">{item.duration}</span>
                      <span className="text-[10px] text-txt-light">{item.scenes} scenes</span>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat scenarios preview */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-txt">Chat AI Scenarios</h2>
            <button onClick={() => navigate("/chat")} className="text-xs font-semibold text-primary">
              Xem tất cả
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
            {chatScenarios.slice(0, 4).map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => navigate(`/chat/${scenario.id}`)}
                className="flex-shrink-0 w-[160px] bg-card rounded-xl border border-border p-3 text-left hover:shadow-sm transition-shadow"
              >
                <span className="text-2xl">{scenario.icon}</span>
                <h3 className="text-xs font-semibold text-txt mt-2 line-clamp-2">{scenario.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    {scenario.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
