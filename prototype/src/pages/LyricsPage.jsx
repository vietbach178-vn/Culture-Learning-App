import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lyricsData } from "../data/lyrics";
import { contentItems } from "../data/library";
import WordExplorer from "../components/transcript/WordExplorer";

const modes = [
  { id: "karaoke", label: "Karaoke", icon: "🎤" },
  { id: "fill", label: "Điền từ", icon: "✍️" },
  { id: "explore", label: "Khám phá", icon: "🔍" },
];

export default function LyricsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lyrics = lyricsData[id];
  const content = contentItems.find((c) => c.id === id);

  const [mode, setMode] = useState("karaoke");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const [fillAnswers, setFillAnswers] = useState({});
  const [fillChecked, setFillChecked] = useState({});

  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  const maxTime = lyrics ? lyrics.lines[lyrics.lines.length - 1].endTime : 0;
  const progress = maxTime > 0 ? (currentTime / maxTime) * 100 : 0;

  // Playback
  useEffect(() => {
    if (isPlaying && lyrics) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.5;
          if (next >= maxTime) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, lyrics, maxTime]);

  // Active line
  useEffect(() => {
    if (!lyrics) return;
    const idx = lyrics.lines.findIndex(
      (line) => currentTime >= line.startTime && currentTime < line.endTime
    );
    if (idx !== -1 && idx !== activeLine) setActiveLine(idx);
  }, [currentTime, lyrics, activeLine]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-line="${activeLine}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLine]);

  const handleWordClick = useCallback((word) => {
    setSelectedWord(word);
    setIsPlaying(false);
  }, []);

  const handleLineClick = useCallback((idx) => {
    if (!lyrics) return;
    setCurrentTime(lyrics.lines[idx].startTime);
    setActiveLine(idx);
  }, [lyrics]);

  if (!lyrics) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-3">🎵</p>
          <p className="text-sm text-gray-400">Chưa có lyrics cho bài này</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-sm text-accent font-semibold">← Quay lại</button>
        </div>
      </div>
    );
  }

  // Fill mode: pick lines with words for blanks
  const fillLines = lyrics.lines.filter((l) => l.words && l.words.length > 0);

  const checkFillAnswer = (lineId, blankText) => {
    const answer = fillAnswers[lineId] || "";
    setFillChecked((prev) => ({
      ...prev,
      [lineId]: answer.trim().toLowerCase() === blankText.toLowerCase(),
    }));
  };

  // Count annotated words
  const totalWords = lyrics.lines.reduce((acc, l) => acc + (l.words?.length || 0), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-2.5">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="text-center">
            <p className="text-xs font-semibold text-white">{lyrics.title}</p>
            <p className="text-[9px] text-gray-500">{lyrics.artist}</p>
          </div>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`text-[9px] px-2 py-1 rounded-full font-semibold ${
              showTranslation ? "bg-accent/20 text-accent" : "bg-white/10 text-gray-400"
            }`}
          >
            VN {showTranslation ? "ON" : "OFF"}
          </button>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-1 px-4 pb-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 py-2 rounded-lg text-[10px] font-semibold transition-colors ${
                mode === m.id
                  ? "bg-accent text-white"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Album art + player */}
      <div className="px-4 py-4">
        <div className={`bg-gradient-to-br ${lyrics.coverColor} rounded-2xl p-4 flex items-center gap-4`}>
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">🎵</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{lyrics.title}</p>
            <p className="text-xs text-white/60">{lyrics.artist} · {lyrics.album}</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"
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
              <div className="flex-1">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <span className="text-[9px] text-white/40 font-mono">{lyrics.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="px-4 pb-2">
        <p className="text-[10px] text-gray-500 text-center">
          {totalWords} từ được chú thích · Tập vào từ <span className="text-accent">màu hồng</span> để xem giải thích
        </p>
      </div>

      {/* Lyrics */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-2">
        {mode === "karaoke" && lyrics.lines.map((line, idx) => (
          <div
            key={line.id}
            data-line={idx}
            onClick={() => handleLineClick(idx)}
            className={`py-3 px-3 rounded-xl mb-1 transition-all cursor-pointer ${
              idx === activeLine
                ? "bg-white/5"
                : "hover:bg-white/3"
            }`}
          >
            <p className={`text-base leading-relaxed transition-all ${
              idx === activeLine ? "text-white font-semibold scale-105 origin-left" : idx < activeLine ? "text-gray-500" : "text-gray-400"
            }`}>
              {renderLyricLine(line, idx === activeLine, handleWordClick)}
            </p>
            {showTranslation && line.translation && (
              <p className={`text-xs mt-1 ${idx === activeLine ? "text-gray-400" : "text-gray-600"}`}>
                {line.translation}
              </p>
            )}
          </div>
        ))}

        {mode === "fill" && (
          <div className="space-y-4">
            <p className="text-xs text-gray-400 text-center mb-2">Điền từ còn thiếu vào chỗ trống</p>
            {fillLines.map((line) => {
              const blankWord = line.words[0];
              const before = line.text.slice(0, blankWord.start);
              const after = line.text.slice(blankWord.end);
              const checked = fillChecked[line.id];

              return (
                <div key={line.id} className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm text-white leading-relaxed mb-2">
                    {before}
                    {checked === true ? (
                      <span className="font-bold text-green-400 bg-green-400/10 px-1 rounded">{blankWord.text}</span>
                    ) : checked === false ? (
                      <span className="font-bold text-accent bg-accent/10 px-1 rounded">{blankWord.text}</span>
                    ) : (
                      <span className="inline-block min-w-[50px] border-b border-dashed border-accent mx-1 text-accent font-bold text-center">
                        {fillAnswers[line.id] || "___"}
                      </span>
                    )}
                    {after}
                  </p>
                  {showTranslation && <p className="text-[10px] text-gray-500 mb-2">{line.translation}</p>}
                  {checked === undefined && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={fillAnswers[line.id] || ""}
                        onChange={(e) => setFillAnswers((prev) => ({ ...prev, [line.id]: e.target.value }))}
                        placeholder="Nhập từ..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none"
                      />
                      <button
                        onClick={() => checkFillAnswer(line.id, blankWord.text)}
                        className="px-4 py-2 bg-accent rounded-lg text-xs font-semibold text-white"
                      >
                        Check
                      </button>
                    </div>
                  )}
                  {checked !== undefined && (
                    <p className={`text-xs font-medium ${checked ? "text-green-400" : "text-accent"}`}>
                      {checked ? "✓ Đúng rồi!" : `✗ Đáp án: "${blankWord.text}" — ${blankWord.layers.language.meaning}`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {mode === "explore" && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 text-center mb-2">Tất cả từ vựng trong bài hát</p>
            {lyrics.lines.filter((l) => l.words?.length > 0).flatMap((line) =>
              line.words.map((word) => (
                <button
                  key={`${line.id}-${word.text}`}
                  onClick={() => handleWordClick(word)}
                  className="w-full text-left bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-accent">"{word.text}"</span>
                    {word.layers.language.pronunciation && (
                      <span className="text-[10px] font-mono text-gray-500">{word.layers.language.pronunciation}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{word.layers.language.meaning}</p>
                  {word.layers.culture?.richPoint && (
                    <span className="inline-block mt-1.5 text-[8px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">
                      ✨ Rich Point
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        )}

        <div className="h-20" />
      </div>

      {/* Word Explorer */}
      {selectedWord && (
        <WordExplorer word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
    </div>
  );
}

function renderLyricLine(line, isActive, onWordClick) {
  if (!line.words || line.words.length === 0) {
    return line.text;
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
        <button
          key={i}
          onClick={(e) => { e.stopPropagation(); onWordClick(seg.word); }}
          className={`font-bold rounded px-0.5 transition-colors ${
            isRich
              ? "text-accent hover:bg-accent/20 underline decoration-dotted decoration-accent/50"
              : "text-purple-400 hover:bg-purple-400/20 underline decoration-dotted decoration-purple-400/50"
          }`}
        >
          {seg.text}
        </button>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}
