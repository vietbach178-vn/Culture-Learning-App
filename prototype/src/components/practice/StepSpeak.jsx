import { useState } from "react";

export default function StepSpeak({ transcript, onNext }) {
  // Pick lines spoken by "You" for speaking practice
  const speakLines = transcript.lines.filter((line) => line.speaker === "You");

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedLines, setCompletedLines] = useState(new Set());

  const line = speakLines[currentIdx];
  const isLast = currentIdx === speakLines.length - 1;

  const startRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);
    setShowFeedback(false);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
  };

  const showResult = () => {
    setShowFeedback(true);
    setCompletedLines((prev) => new Set([...prev, currentIdx]));
  };

  const nextLine = () => {
    if (!isLast) {
      setCurrentIdx(currentIdx + 1);
      setHasRecorded(false);
      setShowFeedback(false);
    }
  };

  // Simulate pronunciation feedback
  const feedback = {
    score: 78 + Math.floor(Math.random() * 20),
    highlights: line.words
      ? line.words.slice(0, 2).map((w) => ({
          word: w.text,
          pronunciation: w.layers.language.pronunciation,
        }))
      : [],
  };

  return (
    <div className="flex flex-col h-full">
      {/* Instruction */}
      <div className="bg-accent/5 px-4 py-3 border-b border-border">
        <p className="text-xs text-accent font-semibold text-center">
          🎤 Bước 4: Nói theo — luyện phát âm và ngữ điệu
        </p>
        <p className="text-[10px] text-txt-light text-center mt-0.5">
          Câu {currentIdx + 1} / {speakLines.length} · Đã nói: {completedLines.size}
        </p>
      </div>

      {/* Context */}
      <div className="px-4 py-4">
        {/* Previous speaker line (for context) */}
        {currentIdx > 0 || speakLines[currentIdx].id > 0 ? (
          <div className="bg-surface rounded-xl p-3 mb-3">
            <p className="text-[10px] text-txt-light font-semibold mb-0.5">
              {transcript.lines[Math.max(0, line.id - 1)]?.speaker || "..."}
            </p>
            <p className="text-xs text-txt-secondary">
              {transcript.lines[Math.max(0, line.id - 1)]?.text || "..."}
            </p>
          </div>
        ) : null}

        {/* Line to speak */}
        <div className="bg-primary-bg rounded-xl p-4 mb-4 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🧑</span>
            <p className="text-[10px] font-semibold text-primary">Bạn nói:</p>
          </div>
          <p className="text-lg font-medium text-txt leading-relaxed">{line.text}</p>
        </div>

        {/* Recording area */}
        <div className="flex flex-col items-center py-4">
          {isRecording ? (
            <>
              {/* Recording animation */}
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center animate-pulse">
                  <span className="text-3xl">🎤</span>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-ping" />
              </div>
              <p className="text-sm text-accent font-semibold mb-3">Đang ghi âm...</p>
              <button
                onClick={stopRecording}
                className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold"
              >
                Dừng lại
              </button>
            </>
          ) : hasRecorded && !showFeedback ? (
            <>
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-sm text-success font-semibold mb-3">Đã ghi âm xong!</p>
              <div className="flex gap-2">
                <button
                  onClick={startRecording}
                  className="px-5 py-2.5 rounded-xl bg-surface text-txt-secondary text-sm font-semibold"
                >
                  🔄 Ghi lại
                </button>
                <button
                  onClick={showResult}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
                >
                  Xem kết quả →
                </button>
              </div>
            </>
          ) : showFeedback ? (
            <div className="w-full">
              {/* Score */}
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                  feedback.score >= 80 ? "bg-success/10" : "bg-warning/10"
                }`}>
                  <span className={`text-2xl font-bold ${
                    feedback.score >= 80 ? "text-success" : "text-warning"
                  }`}>
                    {feedback.score}%
                  </span>
                </div>
                <p className={`text-sm font-semibold mt-2 ${
                  feedback.score >= 80 ? "text-success" : "text-warning"
                }`}>
                  {feedback.score >= 90 ? "Tuyệt vời! 🌟" : feedback.score >= 80 ? "Rất tốt! 👏" : "Khá tốt! 💪"}
                </p>
              </div>

              {/* Word-level feedback */}
              {feedback.highlights.length > 0 && (
                <div className="bg-surface rounded-xl p-3 mb-3">
                  <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-2">Lưu ý phát âm</p>
                  {feedback.highlights.map((h, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5">
                      <span className="text-sm font-medium text-txt">"{h.word}"</span>
                      <span className="text-xs font-mono text-primary bg-primary-bg px-2 py-0.5 rounded">{h.pronunciation}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={startRecording}
                  className="flex-1 py-2.5 rounded-xl bg-surface text-txt-secondary text-sm font-semibold"
                >
                  🔄 Thử lại
                </button>
                <button
                  onClick={isLast ? onNext : nextLine}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
                >
                  {isLast ? "Tiếp tục →" : "Câu tiếp →"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors mb-4 border-2 border-accent/30"
              >
                <span className="text-3xl">🎤</span>
              </button>
              <p className="text-sm text-txt-secondary mb-1">Tập để bắt đầu ghi âm</p>
              <p className="text-[10px] text-txt-light">Đọc câu trên theo cách tự nhiên nhất</p>
            </>
          )}
        </div>
      </div>

      {/* Bottom skip */}
      {!showFeedback && (
        <div className="mt-auto sticky bottom-0 bg-white border-t border-border px-4 py-3">
          <button
            onClick={onNext}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-surface text-txt-light"
          >
            Bỏ qua bước này
          </button>
        </div>
      )}
    </div>
  );
}
