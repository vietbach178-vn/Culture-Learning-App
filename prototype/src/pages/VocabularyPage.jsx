import { useState } from "react";
import { vocabularyItems, getSrsQueue } from "../data/vocabulary";
import { userProgress } from "../data/userProgress";

const statusFilters = [
  { key: "all", label: "Tất cả" },
  { key: "unknown", label: "Chưa biết" },
  { key: "known", label: "Đã biết" },
];

const typeFilters = [
  { key: "all", label: "Tất cả" },
  { key: "word", label: "Từ đơn" },
  { key: "compound", label: "Từ ghép" },
];

export default function VocabularyPage() {
  const [activeTab, setActiveTab] = useState("list"); // "list" | "review"
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [richPointOnly, setRichPointOnly] = useState(false);
  const [items, setItems] = useState(vocabularyItems);
  const [expandedId, setExpandedId] = useState(null);

  // SRS state
  const [srsQueue] = useState(getSrsQueue);
  const [srsIndex, setSrsIndex] = useState(0);
  const [srsRevealed, setSrsRevealed] = useState(false);
  const [srsStarted, setSrsStarted] = useState(false);

  const filtered = items.filter((item) => {
    if (statusFilter === "unknown" && item.status !== "unknown") return false;
    if (statusFilter === "known" && item.status !== "known") return false;
    if (richPointOnly && !item.isRichPoint) return false;
    if (typeFilter === "word" && item.type !== "word") return false;
    if (typeFilter === "compound" && item.type !== "compound") return false;
    return true;
  });

  const toggleStatus = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "known" ? "unknown" : "known" }
          : item
      )
    );
  };

  const handleSrsRate = () => {
    setSrsRevealed(false);
    if (srsIndex < srsQueue.length - 1) {
      setSrsIndex(srsIndex + 1);
    } else {
      setSrsStarted(false);
      setSrsIndex(0);
    }
  };

  const stampLabel = (stamps) => {
    const map = {
      "food-culture": { label: "Food", color: "bg-orange-100 text-orange-700" },
      "slang": { label: "Slang", color: "bg-purple-100 text-purple-700" },
      "greeting": { label: "Social", color: "bg-blue-100 text-blue-700" },
      "hip-hop": { label: "Music", color: "bg-pink-100 text-pink-700" },
      "workplace": { label: "Work", color: "bg-green-100 text-green-700" },
      "humor": { label: "Humor", color: "bg-yellow-100 text-yellow-700" },
    };
    return stamps.map((s) => map[s] || { label: s, color: "bg-gray-100 text-gray-600" });
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-5 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-white text-xl font-bold mb-1">Từ vựng của tôi</h1>
        <p className="text-white/70 text-sm">
          {items.filter((i) => i.status === "known").length} đã biết · {items.filter((i) => i.status === "unknown").length} chưa biết · {items.filter((i) => i.isRichPoint).length} rich point
        </p>
      </div>

      {/* Tab switcher */}
      <div className="px-4 -mt-4">
        <div className="bg-card rounded-xl border border-border p-1 flex gap-1 shadow-sm">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "list"
                ? "bg-primary text-white"
                : "text-txt-secondary hover:bg-primary-bg"
            }`}
          >
            Danh sách
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors relative ${
              activeTab === "review"
                ? "bg-primary text-white"
                : "text-txt-secondary hover:bg-primary-bg"
            }`}
          >
            Ôn tập
            {srsQueue.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {srsQueue.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === "list" ? (
        <div className="px-4 mt-4">
          {/* Filters */}
          <div className="mb-3">
            {/* Status filter */}
            <div className="flex gap-1.5 mb-2">
              {statusFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    statusFilter === f.key
                      ? "bg-primary text-white"
                      : "bg-surface text-txt-secondary border border-border"
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <button
                onClick={() => setRichPointOnly(!richPointOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  richPointOnly
                    ? "bg-accent text-white"
                    : "bg-surface text-txt-secondary border border-border"
                }`}
              >
                Rich Point
              </button>
            </div>
            {/* Type filter */}
            <div className="flex gap-1.5">
              {typeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    typeFilter === f.key
                      ? "bg-secondary text-white"
                      : "bg-surface text-txt-secondary border border-border"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Word list */}
          <div className="space-y-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full p-3 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-semibold text-sm text-txt">{item.word}</span>
                      {item.isRichPoint && <span className="text-xs">⭐</span>}
                      {item.culturalStamps.length > 0 &&
                        stampLabel(item.culturalStamps).map((s, i) => (
                          <span
                            key={i}
                            className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${s.color}`}
                          >
                            {s.label}
                          </span>
                        ))}
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      item.type === "compound"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.type === "compound" ? item.compoundType || "compound" : item.partOfSpeech}
                    </span>
                  </div>
                  <p className="text-xs text-txt-secondary mt-1 line-clamp-1">{item.meaning}</p>
                </button>

                {/* Expanded: 3-layer preview + status toggle */}
                {expandedId === item.id && (
                  <div className="border-t border-border px-3 pb-3">
                    {/* Layer tabs preview */}
                    <div className="mt-2 space-y-2">
                      <div className="bg-primary/5 rounded-lg p-2">
                        <p className="text-[10px] font-bold text-primary mb-1">LANGUAGE</p>
                        <p className="text-xs text-txt">{item.layers.language.meaning}</p>
                        <p className="text-[10px] text-txt-light mt-0.5">{item.layers.language.pronunciation}</p>
                      </div>
                      <div className="bg-secondary/5 rounded-lg p-2">
                        <p className="text-[10px] font-bold text-secondary mb-1">CONTEXT</p>
                        <p className="text-xs text-txt">{item.layers.context.register}</p>
                      </div>
                      {item.layers.culture.note && (
                        <div className="bg-accent/5 rounded-lg p-2">
                          <p className="text-[10px] font-bold text-accent mb-1">CULTURE</p>
                          <p className="text-xs text-txt">{item.layers.culture.note}</p>
                        </div>
                      )}
                    </div>

                    {/* Status toggle */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          item.status === "known"
                            ? "bg-green-500 text-white"
                            : "bg-surface text-txt-secondary border border-border hover:bg-green-50"
                        }`}
                      >
                        {item.status === "known" ? "✓ Đã biết" : "Đánh dấu đã biết"}
                      </button>
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          item.status === "unknown"
                            ? "bg-orange-500 text-white"
                            : "bg-surface text-txt-secondary border border-border hover:bg-orange-50"
                        }`}
                      >
                        {item.status === "unknown" ? "Chưa biết" : "Đánh dấu chưa biết"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-10">
                <p className="text-3xl mb-2">📝</p>
                <p className="text-sm text-txt-secondary">Không có từ nào phù hợp bộ lọc</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* SRS Review Tab */
        <div className="px-4 mt-4">
          {!srsStarted ? (
            <div className="text-center py-8">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/10">
                <p className="text-4xl mb-3">🔔</p>
                <h2 className="text-lg font-bold text-txt mb-2">
                  {srsQueue.length} từ cần ôn hôm nay
                </h2>
                <p className="text-sm text-txt-secondary mb-4">
                  Ôn tập với flashcard — đánh giá Khó / OK / Dễ để điều chỉnh lịch ôn
                </p>
                {srsQueue.length > 0 ? (
                  <button
                    onClick={() => setSrsStarted(true)}
                    className="bg-primary text-white font-semibold px-6 py-3 rounded-xl text-sm"
                  >
                    Bắt đầu ôn tập
                  </button>
                ) : (
                  <p className="text-sm text-green-600 font-medium">Tuyệt vời! Không còn từ nào cần ôn.</p>
                )}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-card rounded-xl p-3 border border-border text-center">
                  <p className="text-lg font-bold text-primary">{items.length}</p>
                  <p className="text-[10px] text-txt-secondary">Tổng từ</p>
                </div>
                <div className="bg-card rounded-xl p-3 border border-border text-center">
                  <p className="text-lg font-bold text-green-500">{items.filter((i) => i.status === "known").length}</p>
                  <p className="text-[10px] text-txt-secondary">Đã biết</p>
                </div>
                <div className="bg-card rounded-xl p-3 border border-border text-center">
                  <p className="text-lg font-bold text-orange-500">{items.filter((i) => i.status === "unknown").length}</p>
                  <p className="text-[10px] text-txt-secondary">Chưa biết</p>
                </div>
              </div>
            </div>
          ) : (
            /* Flashcard mode */
            <div className="py-4">
              {/* Progress */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => { setSrsStarted(false); setSrsIndex(0); setSrsRevealed(false); }}
                  className="text-sm text-primary font-medium"
                >
                  ← Thoát
                </button>
                <span className="text-xs text-txt-secondary font-medium">
                  {srsIndex + 1} / {srsQueue.length}
                </span>
              </div>
              <div className="h-1.5 bg-border rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{ width: `${((srsIndex + 1) / srsQueue.length) * 100}%` }}
                />
              </div>

              {/* Flashcard */}
              {srsQueue[srsIndex] && (
                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6 text-center min-h-[200px] flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-txt mb-2">{srsQueue[srsIndex].word}</p>
                    {srsQueue[srsIndex].isRichPoint && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">⭐ Rich Point</span>
                    )}

                    {!srsRevealed ? (
                      <button
                        onClick={() => setSrsRevealed(true)}
                        className="mt-6 bg-primary/10 text-primary font-semibold px-6 py-3 rounded-xl text-sm"
                      >
                        Lật thẻ
                      </button>
                    ) : (
                      <div className="mt-4 w-full">
                        <div className="border-t border-border pt-4">
                          <p className="text-sm text-txt-secondary mb-1">{srsQueue[srsIndex].partOfSpeech}</p>
                          <p className="text-base font-medium text-txt">{srsQueue[srsIndex].meaning}</p>
                          <p className="text-xs text-txt-light mt-1">{srsQueue[srsIndex].layers.language.pronunciation}</p>
                          {srsQueue[srsIndex].layers.culture.note && (
                            <p className="text-xs text-accent mt-2 bg-accent/5 rounded-lg p-2">
                              🌍 {srsQueue[srsIndex].layers.culture.note}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {srsRevealed && (
                    <div className="border-t border-border p-4 flex gap-2">
                      <button
                        onClick={handleSrsRate}
                        className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition-colors"
                      >
                        Khó
                      </button>
                      <button
                        onClick={handleSrsRate}
                        className="flex-1 py-3 rounded-xl bg-yellow-50 text-yellow-600 font-semibold text-sm hover:bg-yellow-100 transition-colors"
                      >
                        OK
                      </button>
                      <button
                        onClick={handleSrsRate}
                        className="flex-1 py-3 rounded-xl bg-green-50 text-green-600 font-semibold text-sm hover:bg-green-100 transition-colors"
                      >
                        Dễ
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
