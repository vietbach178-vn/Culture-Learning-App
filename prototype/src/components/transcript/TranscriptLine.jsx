export default function TranscriptLine({ line, isActive, onWordClick }) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // Build segments: annotated words become clickable, rest is plain text
  const buildSegments = () => {
    if (!line.words || line.words.length === 0) {
      return [{ type: "plain", text: line.text }];
    }

    const segments = [];
    let lastEnd = 0;

    // Sort words by start position
    const sortedWords = [...line.words].sort((a, b) => a.start - b.start);

    for (const word of sortedWords) {
      // Add plain text before this word
      if (word.start > lastEnd) {
        segments.push({ type: "plain", text: line.text.slice(lastEnd, word.start) });
      }
      // Add the annotated word
      segments.push({ type: "word", text: line.text.slice(word.start, word.end), word });
      lastEnd = word.end;
    }

    // Add remaining plain text
    if (lastEnd < line.text.length) {
      segments.push({ type: "plain", text: line.text.slice(lastEnd) });
    }

    return segments;
  };

  const segments = buildSegments();

  return (
    <div
      className={`flex gap-3 px-4 py-3 transition-colors rounded-lg mx-2 ${
        isActive ? "bg-primary-bg" : "hover:bg-surface"
      }`}
    >
      {/* Timestamp */}
      <span className={`text-[10px] font-mono pt-1 flex-shrink-0 w-8 ${
        isActive ? "text-primary font-semibold" : "text-txt-light"
      }`}>
        {formatTime(line.startTime)}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Speaker */}
        <p className={`text-[10px] font-semibold mb-0.5 ${
          isActive ? "text-primary" : "text-txt-secondary"
        }`}>
          {line.speaker}
        </p>

        {/* Text with clickable words */}
        <p className="text-sm leading-relaxed">
          {segments.map((seg, i) => {
            if (seg.type === "word") {
              const hasRichPoint = seg.word.layers.culture?.richPoint;
              return (
                <button
                  key={i}
                  onClick={() => onWordClick(seg.word)}
                  className={`font-semibold rounded px-0.5 -mx-0.5 transition-colors cursor-pointer ${
                    hasRichPoint
                      ? "text-accent bg-accent/10 hover:bg-accent/20 underline decoration-dotted decoration-accent/50"
                      : "text-primary hover:bg-primary-bg underline decoration-dotted decoration-primary/40"
                  }`}
                >
                  {seg.text}
                </button>
              );
            }
            return <span key={i} className="text-txt">{seg.text}</span>;
          })}
        </p>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="flex items-center">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
}
