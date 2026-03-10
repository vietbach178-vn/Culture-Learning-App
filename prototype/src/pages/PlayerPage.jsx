import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transcripts } from "../data/transcript";
import { contentItems } from "../data/library";
import TranscriptLine from "../components/transcript/TranscriptLine";
import WordExplorer from "../components/transcript/WordExplorer";

export default function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const transcript = transcripts[id];
  const content = contentItems.find((c) => c.id === id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [loopMode, setLoopMode] = useState(false);
  const [vocabCount, setVocabCount] = useState(0);

  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  const speeds = [1, 0.75, 0.5];

  // Simulate playback
  useEffect(() => {
    if (isPlaying && transcript) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const maxTime = transcript.lines[transcript.lines.length - 1].endTime;
          const next = prev + 0.5 * speed;
          if (next >= maxTime) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, transcript]);

  // Update active line based on current time
  useEffect(() => {
    if (!transcript) return;
    const idx = transcript.lines.findIndex(
      (line) => currentTime >= line.startTime && currentTime < line.endTime
    );
    if (idx !== -1 && idx !== activeLine) {
      setActiveLine(idx);
    }
  }, [currentTime, transcript, activeLine]);

  // Auto-scroll to active line
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-line="${activeLine}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeLine]);

  const handleWordClick = useCallback((word) => {
    setSelectedWord(word);
    setIsPlaying(false);
  }, []);

  const handleLineClick = useCallback((lineIdx) => {
    if (!transcript) return;
    const line = transcript.lines[lineIdx];
    setCurrentTime(line.startTime);
    setActiveLine(lineIdx);
  }, [transcript]);

  const toggleSpeed = useCallback(() => {
    setSpeed((prev) => {
      const idx = speeds.indexOf(prev);
      return speeds[(idx + 1) % speeds.length];
    });
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  if (!transcript || !content) {
    return (
      <div className="pb-20 pt-14 px-4 text-center">
        <p className="text-4xl mb-3">📄</p>
        <p className="text-sm text-txt-secondary">Chưa có transcript cho nội dung này</p>
        <button onClick={() => navigate(-1)} className="mt-3 text-sm text-primary font-semibold">
          ← Quay lại
        </button>
      </div>
    );
  }

  const maxTime = transcript.lines[transcript.lines.length - 1].endTime;
  const progress = (currentTime / maxTime) * 100;

  // Count total annotated words
  const totalWords = transcript.lines.reduce((acc, line) => acc + (line.words?.length || 0), 0);

  return (
    <div className="pb-20 flex flex-col min-h-screen">
      {/* Video Area (placeholder) */}
      <div className="bg-dark relative">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 z-10 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Practice button */}
        <button
          onClick={() => navigate(`/practice/${id}`)}
          className="absolute top-12 right-4 z-10 bg-accent/90 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full"
        >
          Luyện tập →
        </button>

        {/* Fake video */}
        <div className="h-[200px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors mb-2"
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
            <p className="text-white/50 text-[10px]">{content.title}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-border px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-txt-secondary">
            {formatTime(currentTime)} / {formatTime(maxTime)}
          </span>

          <div className="flex items-center gap-2">
            {/* Speed */}
            <button
              onClick={toggleSpeed}
              className={`text-[10px] font-bold px-2 py-1 rounded ${
                speed !== 1 ? "bg-secondary/10 text-secondary" : "bg-surface text-txt-secondary"
              }`}
            >
              {speed}x
            </button>

            {/* Loop */}
            <button
              onClick={() => setLoopMode(!loopMode)}
              className={`text-[10px] font-bold px-2 py-1 rounded ${
                loopMode ? "bg-primary/10 text-primary" : "bg-surface text-txt-secondary"
              }`}
            >
              🔄 Loop
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] text-txt-light">{totalWords} từ</span>
            {vocabCount > 0 && (
              <span className="text-[9px] bg-success/10 text-success px-1.5 py-0.5 rounded font-semibold">
                +{vocabCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-primary-bg/50 px-4 py-2 border-b border-border">
        <p className="text-[10px] text-primary font-medium text-center">
          👆 Tập vào từ <span className="text-primary font-bold underline">được tô màu</span> để xem giải thích 3 tầng
          {" · "}Từ có <span className="text-accent font-bold">màu hồng</span> = Rich Point văn hóa
        </p>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
        {transcript.lines.map((line, idx) => (
          <div key={line.id} data-line={idx} onClick={() => handleLineClick(idx)}>
            <TranscriptLine
              line={line}
              isActive={idx === activeLine}
              onWordClick={handleWordClick}
            />
          </div>
        ))}

        {/* End spacer */}
        <div className="h-20" />
      </div>

      {/* Bottom tabs */}
      <div className="sticky bottom-16 bg-white border-t border-border">
        <div className="flex">
          <button className="flex-1 py-2.5 text-xs font-semibold text-primary border-b-2 border-primary">
            Transcript
          </button>
          <button className="flex-1 py-2.5 text-xs font-semibold text-txt-light">
            Từ vựng ({vocabCount})
          </button>
          <button className="flex-1 py-2.5 text-xs font-semibold text-txt-light">
            Văn hóa
          </button>
        </div>
      </div>

      {/* Word Explorer Popup */}
      {selectedWord && (
        <WordExplorer word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
    </div>
  );
}
