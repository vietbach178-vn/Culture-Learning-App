import { useState, useEffect, useRef } from "react";
import WordExplorer from "../transcript/WordExplorer";

export default function StepListenFill({ transcript, onNext }) {
  // Pick lines that have annotated words for fill-in-the-blank
  const fillLines = transcript.lines
    .filter((line) => line.words && line.words.length > 0)
    .map((line) => {
      const blankWord = line.words[0];
      return { ...line, blankWord, blankText: blankWord.text };
    });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(null); // "correct" | "wrong" | null
  const [explorerWord, setExplorerWord] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const line = fillLines[currentIdx];
  const isLast = currentIdx === fillLines.length - 1;
  const word = line.blankWord;

  // Simulate playing the line audio
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setIsPlaying(false);
      }, (line.endTime - line.startTime) * 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, line]);

  const checkAnswer = () => {
    const isCorrect = userInput.trim().toLowerCase() === line.blankText.toLowerCase();
    setShowResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
    setCompleted((c) => c + 1);
  };

  const nextLine = () => {
    if (!isLast) {
      setCurrentIdx(currentIdx + 1);
      setUserInput("");
      setShowResult(null);
    }
  };

  // Build display text with blank
  const buildDisplayText = () => {
    const w = line.blankWord;
    const before = line.text.slice(0, w.start);
    const after = line.text.slice(w.end);
    return { before, after, blank: line.blankText };
  };

  const display = buildDisplayText();

  return (
    <div className="flex flex-col h-full">
      {/* Instruction */}
      <div className="bg-secondary/5 px-4 py-3 border-b border-border">
        <p className="text-xs text-secondary font-semibold text-center">
          ✍️ Bước 2: Nghe, điền từ & khám phá 3 tầng nghĩa
        </p>
        <p className="text-[10px] text-txt-light text-center mt-0.5">
          Câu {currentIdx + 1} / {fillLines.length} · Điểm: {score}/{completed}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Speaker & Play */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-bg flex items-center justify-center">
              <span className="text-lg">
                {line.speaker === "Marcus" ? "👨🏾" : "🧑"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-txt">{line.speaker}</p>
              <p className="text-[10px] text-txt-light">Tập để nghe lại</p>
            </div>
            <button
              onClick={() => setIsPlaying(true)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? "bg-primary text-white animate-pulse"
                  : "bg-primary-bg text-primary hover:bg-primary/10"
              }`}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>

          {/* Sentence with blank */}
          <div className="bg-surface rounded-2xl p-4 mb-4">
            <p className="text-base leading-relaxed text-txt">
              {display.before}
              {showResult === "correct" ? (
                <span className="font-bold text-success bg-success/10 px-1 rounded">{display.blank}</span>
              ) : showResult === "wrong" ? (
                <span className="font-bold text-accent bg-accent/10 px-1 rounded">{display.blank}</span>
              ) : (
                <span className="inline-block min-w-[60px] border-b-2 border-dashed border-primary mx-1 text-center text-primary font-bold">
                  {userInput || "___"}
                </span>
              )}
              {display.after}
            </p>
          </div>

          {/* Hint */}
          {!showResult && (
            <div className="mb-4">
              <p className="text-[10px] text-txt-light mb-1">💡 Gợi ý: {word.layers.language.meaning}</p>
            </div>
          )}

          {/* Input */}
          {!showResult ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && userInput.trim() && checkAnswer()}
                placeholder="Nhập từ còn thiếu..."
                className="flex-1 bg-white border-2 border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none"
                autoFocus
              />
              <button
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                className={`px-5 py-3 rounded-xl text-sm font-semibold ${
                  userInput.trim()
                    ? "bg-primary text-white"
                    : "bg-surface text-txt-light"
                }`}
              >
                Kiểm tra
              </button>
            </div>
          ) : (
            /* Result + button to open WordExplorer */
            <div>
              <div className={`rounded-xl p-4 mb-3 ${
                showResult === "correct" ? "bg-success/10 border border-success/20" : "bg-accent/10 border border-accent/20"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{showResult === "correct" ? "🎉" : "💪"}</span>
                  <p className={`text-sm font-bold ${showResult === "correct" ? "text-success" : "text-accent"}`}>
                    {showResult === "correct" ? "Chính xác!" : `Đáp án: "${display.blank}"`}
                  </p>
                </div>
                <p className="text-xs text-txt-secondary">{word.layers.language.meaning}</p>
              </div>
              <button
                onClick={() => setExplorerWord(word)}
                className="w-full py-3 rounded-xl bg-secondary/10 text-secondary font-semibold text-sm border border-secondary/20 hover:bg-secondary/20 transition-colors"
              >
                🔍 Xem giải thích 3 tầng →
              </button>
            </div>
          )}
        </div>

        <div className="h-24" />
      </div>

      {/* Bottom */}
      <div className="sticky bottom-0 bg-white border-t border-border px-4 py-3">
        {showResult ? (
          <button
            onClick={isLast ? onNext : nextLine}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-primary text-white"
          >
            {isLast ? "Tiếp tục → Luyện nói" : "Câu tiếp theo →"}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-surface text-txt-light"
          >
            Bỏ qua bước này
          </button>
        )}
      </div>

      {/* WordExplorer popup — reuse from Player */}
      {explorerWord && (
        <WordExplorer word={explorerWord} onClose={() => setExplorerWord(null)} />
      )}
    </div>
  );
}
