import { useState, useEffect, useRef } from "react";

export default function StepWatch({ transcript, content, onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);
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
            setHasWatched(true);
            return 0;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, maxTime]);

  useEffect(() => {
    if (!transcript) return;
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

  return (
    <div className="flex flex-col h-full">
      {/* Instruction */}
      <div className="bg-primary-bg/60 px-4 py-3 border-b border-border">
        <p className="text-xs text-primary font-semibold text-center">
          👀 Bước 1: Xem lại đoạn hội thoại — chú ý cách nói và nghĩ nghĩa
        </p>
      </div>

      {/* Video area */}
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
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
        {transcript.lines.map((line, idx) => (
          <div
            key={line.id}
            data-line={idx}
            className={`px-4 py-2.5 mx-2 rounded-lg transition-colors ${
              idx === activeLine ? "bg-primary-bg" : ""
            }`}
          >
            <p className={`text-[10px] font-semibold mb-0.5 ${
              idx === activeLine ? "text-primary" : "text-txt-secondary"
            }`}>
              {line.speaker}
            </p>
            <p className={`text-sm leading-relaxed ${
              idx === activeLine ? "text-txt font-medium" : "text-txt-secondary"
            }`}>
              {line.text}
            </p>
          </div>
        ))}
        <div className="h-20" />
      </div>

      {/* Bottom */}
      <div className="sticky bottom-0 bg-white border-t border-border px-4 py-3">
        <button
          onClick={onNext}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
            hasWatched
              ? "bg-primary text-white shadow-md shadow-primary/30"
              : "bg-primary/80 text-white"
          }`}
        >
          {hasWatched ? "Tiếp tục → Khám phá từ vựng" : "Tiếp tục (có thể xem trước)"}
        </button>
      </div>
    </div>
  );
}
