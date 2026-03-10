import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { chatScenarios } from "../data/chatScenarios";

const scoreColors = {
  perfect: { bg: "bg-success/10", border: "border-success/20", text: "text-success", label: "Hoàn hảo!" },
  great: { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary", label: "Rất tốt!" },
  ok: { bg: "bg-warning/10", border: "border-warning/20", text: "text-warning", label: "Khá ổn!" },
  bad: { bg: "bg-accent/10", border: "border-accent/20", text: "text-accent", label: "Cần cải thiện" },
};

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scenario = chatScenarios.find((s) => s.id === id);
  const scrollRef = useRef(null);

  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [totalScore, setTotalScore] = useState({ perfect: 0, great: 0, ok: 0, bad: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping, showFeedback]);

  // Auto-advance AI messages
  useEffect(() => {
    if (!scenario) return;
    const msg = scenario.messages[currentMsgIdx];
    if (!msg) return;

    if (msg.role === "ai") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, msg]);
        setCurrentMsgIdx((i) => i + 1);
      }, msg.delay + 800);
      return () => clearTimeout(timer);
    }
  }, [currentMsgIdx, scenario]);

  if (!scenario) {
    return (
      <div className="pb-20 pt-14 px-4 text-center">
        <p className="text-4xl mb-3">💬</p>
        <p className="text-sm text-txt-secondary">Không tìm thấy tình huống này</p>
        <button onClick={() => navigate(-1)} className="mt-3 text-sm text-primary font-semibold">← Quay lại</button>
      </div>
    );
  }

  const currentMsg = scenario.messages[currentMsgIdx];
  const isChoiceStep = currentMsg?.role === "user-choice" && !selectedChoice;

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
    setTotalScore((prev) => ({ ...prev, [choice.score]: prev[choice.score] + 1 }));

    // Add user message
    setVisibleMessages((prev) => [...prev, { id: `user-${currentMsgIdx}`, role: "user", text: choice.text }]);
  };

  const handleContinue = () => {
    setSelectedChoice(null);
    setShowFeedback(false);
    const nextIdx = currentMsgIdx + 1;
    if (nextIdx >= scenario.messages.length) {
      setIsComplete(true);
    } else {
      setCurrentMsgIdx(nextIdx);
    }
  };

  const totalAnswers = totalScore.perfect + totalScore.great + totalScore.ok + totalScore.bad;

  if (isComplete) {
    const bestCount = totalScore.perfect + totalScore.great;
    const percentage = totalAnswers > 0 ? Math.round((bestCount / totalAnswers) * 100) : 0;

    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/chat")} className="text-txt-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <p className="text-sm font-semibold text-txt">{scenario.title}</p>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center w-full">
            <div className="text-5xl mb-4">{percentage >= 80 ? "🌟" : percentage >= 50 ? "👏" : "💪"}</div>
            <h2 className="text-xl font-bold text-txt mb-1">
              {percentage >= 80 ? "Xuất sắc!" : percentage >= 50 ? "Khá tốt!" : "Cần luyện thêm!"}
            </h2>
            <p className="text-sm text-txt-secondary mb-6">
              Bạn trả lời tốt {bestCount}/{totalAnswers} câu hỏi
            </p>

            {/* Score breakdown */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {Object.entries(totalScore).map(([key, count]) => (
                <div key={key} className={`rounded-xl p-2 ${scoreColors[key].bg}`}>
                  <p className={`text-lg font-bold ${scoreColors[key].text}`}>{count}</p>
                  <p className="text-[8px] text-txt-light">{scoreColors[key].label}</p>
                </div>
              ))}
            </div>

            {/* XP */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-4 mb-6">
              <p className="text-white text-sm font-semibold">+{bestCount * 15 + (totalScore.ok * 5)} XP</p>
              <p className="text-white/70 text-xs">Đã cộng vào hồ sơ</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => { setVisibleMessages([]); setCurrentMsgIdx(0); setSelectedChoice(null); setShowFeedback(false); setTotalScore({ perfect: 0, great: 0, ok: 0, bad: 0 }); setIsComplete(false); }}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm"
              >
                Thử lại
              </button>
              <button
                onClick={() => navigate("/chat")}
                className="w-full py-3 rounded-xl bg-surface text-txt-secondary font-semibold text-sm"
              >
                Chọn tình huống khác
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate("/chat")} className="text-txt-secondary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-txt">{scenario.title}</p>
          <p className="text-[9px] text-txt-light">{scenario.culture} · {scenario.difficulty}</p>
        </div>
        <span className="text-xl">{scenario.icon}</span>
      </div>

      {/* Chat messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Scenario intro */}
        <div className="bg-primary-bg/50 rounded-2xl p-3 text-center border border-primary/10 mb-2">
          <p className="text-xs text-primary font-medium">{scenario.description}</p>
        </div>

        {visibleMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <span className="text-xs">🤖</span>
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-white border border-border text-txt rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-1">
              <span className="text-xs">🤖</span>
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-txt-light rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-txt-light rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-txt-light rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Feedback popup */}
        {showFeedback && selectedChoice && (
          <div className={`rounded-2xl p-4 border ${scoreColors[selectedChoice.score].bg} ${scoreColors[selectedChoice.score].border}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm font-bold ${scoreColors[selectedChoice.score].text}`}>
                {scoreColors[selectedChoice.score].label}
              </span>
            </div>
            <p className="text-xs text-txt-secondary leading-relaxed mb-2">{selectedChoice.feedback}</p>
            {selectedChoice.cultureTip && (
              <div className="bg-white/60 rounded-xl p-2.5 mt-2">
                <p className="text-[9px] font-semibold text-accent uppercase tracking-wider mb-0.5">🌍 Văn hóa tip</p>
                <p className="text-xs text-txt-secondary leading-relaxed">{selectedChoice.cultureTip}</p>
              </div>
            )}
          </div>
        )}

        <div className="h-4" />
      </div>

      {/* Bottom: choices or continue */}
      <div className="sticky bottom-0 bg-white border-t border-border px-4 py-3">
        {showFeedback ? (
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold"
          >
            Tiếp tục →
          </button>
        ) : isChoiceStep ? (
          <div className="space-y-2">
            <p className="text-[10px] text-txt-light text-center mb-1">{currentMsg.prompt}</p>
            {currentMsg.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(choice)}
                className="w-full text-left bg-surface hover:bg-primary-bg rounded-xl px-4 py-3 text-sm text-txt transition-colors border border-border hover:border-primary/30"
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-txt-light">Đang chờ...</p>
          </div>
        )}
      </div>
    </div>
  );
}
