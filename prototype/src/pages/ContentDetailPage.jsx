import { useParams, useNavigate } from "react-router-dom";
import { contentItems, sourceIcons, difficultyColors } from "../data/library";
import TopBar from "../components/layout/TopBar";

const typeColors = {
  movie: "from-purple-500 to-purple-700",
  book: "from-blue-500 to-blue-700",
  music: "from-pink-500 to-pink-700",
  podcast: "from-teal-500 to-teal-700",
};

const typeLabels = {
  movie: "Phim / Series",
  book: "Sách",
  music: "Nhạc",
  podcast: "Podcast",
};

export default function ContentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = contentItems.find((c) => c.id === id);

  if (!item) {
    return (
      <div className="pb-20">
        <TopBar title="Không tìm thấy" showBack />
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-txt-secondary">Nội dung không tồn tại</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${typeColors[item.type]} relative`}>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 z-10 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="pt-20 pb-8 px-5 text-center">
          <span className="text-5xl mb-3 block">{sourceIcons[item.source]}</span>
          <h1 className="text-white font-bold text-lg mb-1">{item.title}</h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white`}>
              {item.difficulty}
            </span>
            <span className="text-white/70 text-xs">{item.culture}</span>
            <span className="text-white/70 text-xs">·</span>
            <span className="text-white/70 text-xs">{item.duration}</span>
          </div>
          {item.imported && item.progress > 0 && (
            <div className="mt-3 max-w-[200px] mx-auto">
              <div className="flex items-center justify-between text-[10px] text-white/70 mb-1">
                <span>Tiến độ</span>
                <span>{item.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Action Buttons */}
        <div className="bg-card rounded-2xl border border-border p-4 shadow-sm mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(item.type === "music" ? `/lyrics/${item.id}` : `/player/${item.id}`)}
              className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-primary-dark transition-colors"
            >
              {item.type === "music" ? "Lyrics Lab 🎵" : item.imported && item.progress > 0 ? "Tiếp tục học" : "Bắt đầu học"}
            </button>
            {item.hasPractice && (
              <button
                onClick={() => navigate(`/practice/${item.id}`)}
                className="flex-1 bg-accent/10 text-accent font-semibold py-3 rounded-xl text-sm hover:bg-accent/20 transition-colors"
              >
                Luyện tập
              </button>
            )}
          </div>
          {!item.imported && (
            <button className="w-full mt-2 bg-secondary/10 text-secondary font-semibold py-2.5 rounded-xl text-sm hover:bg-secondary/20 transition-colors">
              + Thêm vào nội dung của tôi
            </button>
          )}
        </div>

        {/* Info */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <h2 className="text-sm font-bold text-txt mb-2">Mô tả</h2>
          <p className="text-xs text-txt-secondary leading-relaxed">{item.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card rounded-xl border border-border p-3">
            <p className="text-[10px] text-txt-light uppercase tracking-wider mb-1">Loại</p>
            <p className="text-sm font-semibold text-txt">{typeLabels[item.type]}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3">
            <p className="text-[10px] text-txt-light uppercase tracking-wider mb-1">Nguồn</p>
            <p className="text-sm font-semibold text-txt">{sourceIcons[item.source]} {item.source}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3">
            <p className="text-[10px] text-txt-light uppercase tracking-wider mb-1">Trình độ</p>
            <p className={`text-sm font-bold inline-block px-2 py-0.5 rounded ${difficultyColors[item.difficulty]}`}>
              {item.difficulty}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3">
            <p className="text-[10px] text-txt-light uppercase tracking-wider mb-1">Số scene</p>
            <p className="text-sm font-semibold text-txt">{item.scenes} scene</p>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <h2 className="text-sm font-bold text-txt mb-2">Tags</h2>
          <div className="flex gap-1.5 flex-wrap">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-primary-bg text-primary px-2.5 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* What you'll learn */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10 p-4 mb-4">
          <h2 className="text-sm font-bold text-txt mb-2">Bạn sẽ học được gì?</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">📝</span>
              <div>
                <p className="text-xs font-semibold text-txt">Language</p>
                <p className="text-[10px] text-txt-secondary">Từ vựng, ngữ pháp, slang, phát âm</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">🎯</span>
              <div>
                <p className="text-xs font-semibold text-txt">Context</p>
                <p className="text-[10px] text-txt-secondary">Khi nào dùng, register, tone, cách thay thế</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">🌍</span>
              <div>
                <p className="text-xs font-semibold text-txt">Culture</p>
                <p className="text-[10px] text-txt-secondary">Lịch sử, quy tắc xã hội, so sánh với văn hóa VN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
