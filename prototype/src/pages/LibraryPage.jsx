import { useState } from "react";
import { contentItems, contentTypes, platforms, difficultyColors } from "../data/library";
import ContentCard from "../components/shared/ContentCard";

const difficulties = ["Tất cả", "A1", "A2", "B1", "B2", "C1", "C2"];
const cultures = ["Tất cả", "American", "British", "Korean", "Japanese", "Global"];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("Tất cả");
  const [activeCulture, setActiveCulture] = useState("Tất cả");
  const [url, setUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = contentItems.filter((item) => {
    if (activeType !== "all" && item.type !== activeType) return false;
    if (activeDifficulty !== "Tất cả" && item.difficulty !== activeDifficulty) return false;
    if (activeCulture !== "Tất cả" && item.culture !== activeCulture) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const imported = filtered.filter((c) => c.imported);
  const available = filtered.filter((c) => !c.imported);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="px-4 pt-12 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-txt">Khám phá</h1>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              <span>+</span> Thêm URL
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm nội dung..."
              className="w-full bg-surface text-txt text-sm rounded-xl pl-10 pr-4 py-2.5 border border-border focus:outline-none focus:border-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-light text-sm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Type tabs */}
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeType === type.id
                    ? "bg-primary text-white"
                    : "bg-surface text-txt-secondary border border-border"
                }`}
              >
                <span className="text-sm">{type.icon}</span>
                {type.label}
              </button>
            ))}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                showFilters
                  ? "bg-secondary text-white"
                  : "bg-surface text-txt-secondary border border-border"
              }`}
            >
              ⚙ Lọc
            </button>
          </div>
        </div>

        {/* Filters (expandable) */}
        {showFilters && (
          <div className="px-4 pb-3 border-t border-border pt-3">
            <div className="mb-2">
              <p className="text-[10px] font-semibold text-txt-secondary uppercase tracking-wider mb-1.5">Trình độ</p>
              <div className="flex gap-1 flex-wrap">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDifficulty(d)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                      activeDifficulty === d
                        ? "bg-primary text-white"
                        : "bg-surface text-txt-secondary border border-border"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-txt-secondary uppercase tracking-wider mb-1.5">Văn hóa</p>
              <div className="flex gap-1 flex-wrap">
                {cultures.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCulture(c)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                      activeCulture === c
                        ? "bg-secondary text-white"
                        : "bg-surface text-txt-secondary border border-border"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* URL Input Panel */}
      {showUrlInput && (
        <div className="px-4 pt-3">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/15 p-4 mb-3">
            <p className="text-sm font-semibold text-txt mb-1">Thêm nội dung từ URL</p>
            <p className="text-[10px] text-txt-secondary mb-3">
              Paste URL từ YouTube, Netflix, Spotify... App sẽ tự động lấy transcript
            </p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="flex-1 bg-white text-txt text-sm rounded-lg px-3 py-2.5 border border-border focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white font-semibold px-4 py-2.5 rounded-lg text-sm whitespace-nowrap">
                Xử lý
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {platforms.map((p) => (
                <span key={p.id} className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${p.color}`}>
                  {p.icon} {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pt-3">
        {/* My Content */}
        {imported.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-sm font-bold text-txt">Nội dung của tôi</h2>
              <span className="text-[9px] bg-primary-bg text-primary px-2 py-0.5 rounded-full font-semibold">
                {imported.length}
              </span>
            </div>
            <div className="space-y-2">
              {imported.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Available Content */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-bold text-txt">
              {imported.length > 0 ? "Gợi ý thêm" : "Nội dung phổ biến"}
            </h2>
            <span className="text-[9px] bg-surface text-txt-secondary px-2 py-0.5 rounded-full font-semibold border border-border">
              {available.length}
            </span>
          </div>
          {available.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm text-txt-secondary">Không tìm thấy nội dung phù hợp</p>
              <p className="text-xs text-txt-light mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            <div className="space-y-2">
              {available.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
