import { useState, useEffect, useRef } from "react";

export default function StepRewatch({ transcript, content, onFinish }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  const maxTime = transcript.lines[transcript.lines.length - 1].endTime;
  const progress = (currentTime / maxTime) * 100;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.5;
          if (next >= maxTime) {
            setIsPlaying(false);
            setShowCompletion(true);
            return maxTime;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, maxTime]);

  useEffect(() => {
    const idx = transcript.lines.findIndex(
      (line) => currentTime >= line.startTime && currentTime < line.endTime
    );
    if (idx !== -1) setActiveLine(idx);
  }, [currentTime, transcript]);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-line="${activeLine}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLine]);

  // Count cultural annotations
  const richPoints = transcript.lines.flatMap((l) =>
    (l.words || []).filter((w) => w.layers.culture?.richPoint)
  );
  const totalWords = transcript.lines.reduce((acc, l) => acc + (l.words?.length || 0), 0);

  if (showCompletion) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-txt mb-2">Hoàn thành xuất sắc!</h2>
          <p className="text-sm text-txt-secondary mb-6">
            Bạn đã hoàn thành bài luyện tập với {totalWords} từ vựng và {richPoints.length} Rich Points văn hóa
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-primary-bg rounded-xl p-3">
              <p className="text-xl font-bold text-primary">{totalWords}</p>
              <p className="text-[9px] text-txt-light">Từ vựng</p>
            </div>
            <div className="bg-secondary/10 rounded-xl p-3">
              <p className="text-xl font-bold text-secondary">{transcript.lines.length}</p>
              <p className="text-[9px] text-txt-light">Câu hội thoại</p>
            </div>
            <div className="bg-accent/10 rounded-xl p-3">
              <p className="text-xl font-bold text-accent">{richPoints.length}</p>
              <p className="text-[9px] text-txt-light">Rich Points</p>
            </div>
          </div>

          {/* XP earned */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-4 mb-6">
            <p className="text-white text-sm font-semibold">+50 XP</p>
            <p className="text-white/70 text-xs">Đã cộng vào hồ sơ của bạn</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={onFinish}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm"
            >
              Quay về trang chủ
            </button>
            <button
              onClick={() => { setShowCompletion(false); setCurrentTime(0); }}
              className="w-full py-3 rounded-xl bg-surface text-txt-secondary font-semibold text-sm"
            >
              Xem lại lần nữa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Instruction */}
      <div className="bg-success/5 px-4 py-3 border-b border-border">
        <p className="text-xs text-success font-semibold text-center">
          🎬 Bước 5: Xem lại — bây giờ bạn hiểu nhiều hơn rồi!
        </p>
        <p className="text-[10px] text-txt-light text-center mt-0.5">
          Chú ý các từ đã học — cảm nhận sự khác biệt
        </p>
      </div>

      {/* Video */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 relative">
        <div className="h-[160px] flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>
        <div className="h-1 bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-success to-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Transcript with highlights */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
        {transcript.lines.map((line, idx) => (
          <div
            key={line.id}
            data-line={idx}
            className={`px-4 py-2.5 mx-2 rounded-lg transition-colors ${
              idx === activeLine ? "bg-success/5" : ""
            }`}
          >
            <p className={`text-[10px] font-semibold mb-0.5 ${
              idx === activeLine ? "text-success" : "text-txt-secondary"
            }`}>
              {line.speaker}
            </p>
            <p className="text-sm leading-relaxed">
              {buildHighlightedText(line, idx === activeLine)}
            </p>
          </div>
        ))}
        <div className="h-20" />
      </div>

      {/* Bottom */}
      <div className="sticky bottom-0 bg-white border-t border-border px-4 py-3">
        <button
          onClick={() => setShowCompletion(true)}
          className="w-full py-3 rounded-xl text-sm font-semibold bg-success text-white"
        >
          Hoàn thành bài luyện tập ✓
        </button>
      </div>
    </div>
  );
}

function buildHighlightedText(line, isActive) {
  if (!line.words || line.words.length === 0) {
    return <span className={isActive ? "text-txt font-medium" : "text-txt-secondary"}>{line.text}</span>;
  }

  const segments = [];
  let lastEnd = 0;
  const sortedWords = [...line.words].sort((a, b) => a.start - b.start);

  for (const word of sortedWords) {
    if (word.start > lastEnd) {
      segments.push({ type: "plain", text: line.text.slice(lastEnd, word.start) });
    }
    segments.push({ type: "word", text: line.text.slice(word.start, word.end), word });
    lastEnd = word.end;
  }
  if (lastEnd < line.text.length) {
    segments.push({ type: "plain", text: line.text.slice(lastEnd) });
  }

  return segments.map((seg, i) => {
    if (seg.type === "word") {
      const isRich = seg.word.layers.culture?.richPoint;
      return (
        <span
          key={i}
          className={`font-semibold rounded px-0.5 ${
            isRich
              ? "text-accent bg-accent/10"
              : "text-success bg-success/10"
          }`}
        >
          {seg.text}
        </span>
      );
    }
    return <span key={i} className={isActive ? "text-txt" : "text-txt-secondary"}>{seg.text}</span>;
  });
}
