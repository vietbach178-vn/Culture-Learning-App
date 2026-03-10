import { useNavigate } from "react-router-dom";
import { sourceIcons, difficultyColors } from "../../data/library";

const typeColors = {
  movie: "bg-purple-500",
  book: "bg-blue-500",
  music: "bg-pink-500",
  podcast: "bg-teal-500",
};

export default function ContentCard({ item, compact = false }) {
  const navigate = useNavigate();

  if (compact) {
    return (
      <button
        onClick={() => navigate(`/library/${item.id}`)}
        className="flex-shrink-0 w-[200px] bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow text-left"
      >
        <div className={`h-24 ${typeColors[item.type]} flex items-center justify-center relative`}>
          <span className="text-4xl">{sourceIcons[item.source] || "📄"}</span>
          {item.imported && item.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
              <div className="h-full bg-white/80 rounded-r" style={{ width: `${item.progress}%` }} />
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${difficultyColors[item.difficulty]}`}>
              {item.difficulty}
            </span>
            <span className="text-[10px] text-txt-secondary">{item.culture}</span>
          </div>
          <h3 className="text-xs font-semibold text-txt line-clamp-2 leading-tight">{item.title}</h3>
          <p className="text-[10px] text-txt-light mt-1">{item.duration}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(`/library/${item.id}`)}
      className="w-full flex gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-md transition-shadow text-left"
    >
      <div className={`w-14 h-14 rounded-lg ${typeColors[item.type]} flex items-center justify-center flex-shrink-0`}>
        <span className="text-2xl">{sourceIcons[item.source] || "📄"}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${difficultyColors[item.difficulty]}`}>
            {item.difficulty}
          </span>
          <span className="text-[10px] text-txt-secondary">{item.culture}</span>
          <span className="text-[10px] text-txt-light">{item.duration}</span>
        </div>
        <h3 className="text-sm font-semibold text-txt line-clamp-1">{item.title}</h3>
        <p className="text-xs text-txt-secondary line-clamp-2 mt-0.5 leading-relaxed">{item.description}</p>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] bg-primary-bg text-primary px-1.5 py-0.5 rounded font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
      {item.imported && item.progress > 0 && (
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-xs font-bold text-primary">{item.progress}%</span>
        </div>
      )}
    </button>
  );
}
