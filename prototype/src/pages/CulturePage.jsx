import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cultureDives, cultureCategories } from "../data/cultureDives";
import TopBar from "../components/layout/TopBar";

export default function CulturePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? cultureDives
    : cultureDives.filter((d) => d.category === activeCategory);

  return (
    <div className="pb-20">
      <TopBar title="Văn hóa & Insight" />

      {/* Hero */}
      <div className="bg-gradient-to-br from-accent/10 to-primary-bg px-4 py-5">
        <h1 className="text-lg font-bold text-txt mb-1">Khám phá văn hóa 🌍</h1>
        <p className="text-xs text-txt-secondary leading-relaxed">
          Hiểu sâu về văn hóa đằng sau ngôn ngữ — từ cookout đến slang, từ thời gian đến ẩm thực.
        </p>
        <div className="flex items-center gap-3 mt-3">
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm">
            <p className="text-[9px] text-txt-light">Tổng cộng</p>
            <p className="text-sm font-bold text-primary">{cultureDives.length} bài</p>
          </div>
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm">
            <p className="text-[9px] text-txt-light">Chủ đề</p>
            <p className="text-sm font-bold text-accent">{cultureCategories.length - 1}</p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 py-3 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2">
          {cultureCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-surface text-txt-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 space-y-3">
        {filtered.map((dive) => (
          <button
            key={dive.id}
            onClick={() => navigate(`/culture/${dive.id}`)}
            className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            {/* Color bar */}
            <div className={`h-2 bg-gradient-to-r ${dive.heroColor}`} />

            <div className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{dive.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-txt leading-tight mb-1">{dive.title}</h3>
                  <p className="text-xs text-txt-secondary line-clamp-2 leading-relaxed">{dive.summary}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] bg-primary-bg text-primary px-2 py-0.5 rounded-full font-medium">
                      {dive.category}
                    </span>
                    <span className="text-[9px] bg-surface text-txt-light px-2 py-0.5 rounded-full">
                      {dive.culture}
                    </span>
                    <span className="text-[9px] text-txt-light ml-auto">
                      📖 {dive.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
