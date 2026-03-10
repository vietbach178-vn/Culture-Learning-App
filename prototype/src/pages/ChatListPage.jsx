import { useNavigate } from "react-router-dom";
import { chatScenarios } from "../data/chatScenarios";
import TopBar from "../components/layout/TopBar";

const difficultyColors = {
  "A2": "bg-green-100 text-green-700",
  "A2-B1": "bg-blue-100 text-blue-700",
  "B1-B2": "bg-purple-100 text-purple-700",
};

export default function ChatListPage() {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <TopBar title="Hội thoại AI" />

      {/* Hero */}
      <div className="bg-gradient-to-br from-secondary/10 to-primary-bg px-4 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-txt">Luyện hội thoại</h1>
            <p className="text-xs text-txt-secondary">Thực hành giao tiếp qua các tình huống thực tế</p>
          </div>
        </div>
        <p className="text-[10px] text-txt-light leading-relaxed mt-2">
          Chọn 1 tình huống → Trả lời theo cách của bạn → Nhận feedback văn hóa & ngôn ngữ từ AI
        </p>
      </div>

      {/* Scenario list */}
      <div className="px-4 py-4 space-y-3">
        <h2 className="text-sm font-bold text-txt">Tình huống có sẵn</h2>

        {chatScenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => navigate(`/chat/${scenario.id}`)}
            className="w-full text-left bg-white rounded-2xl p-4 border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{scenario.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-txt mb-0.5">{scenario.title}</h3>
                <p className="text-xs text-txt-secondary line-clamp-2">{scenario.description}</p>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${difficultyColors[scenario.difficulty] || "bg-surface text-txt-light"}`}>
                    {scenario.difficulty}
                  </span>
                  <span className="text-[9px] bg-surface text-txt-light px-2 py-0.5 rounded-full">
                    {scenario.culture}
                  </span>
                  {scenario.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[9px] bg-accent/5 text-accent px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2" className="mt-1 flex-shrink-0">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        ))}

        {/* Coming soon */}
        <div className="bg-surface rounded-2xl p-4 text-center border border-dashed border-border">
          <p className="text-sm text-txt-light">Thêm tình huống sắp có...</p>
          <p className="text-[10px] text-txt-light mt-1">Hẹn hò, du lịch, gọi món ăn, phỏng vấn...</p>
        </div>
      </div>
    </div>
  );
}
