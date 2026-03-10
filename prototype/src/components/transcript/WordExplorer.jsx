import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: "language", label: "Language", icon: "📝", color: "text-primary border-primary bg-primary" },
  { id: "context", label: "Context", icon: "🎯", color: "text-secondary border-secondary bg-secondary" },
  { id: "culture", label: "Culture", icon: "🌍", color: "text-accent border-accent bg-accent" },
];

export default function WordExplorer({ word, onClose }) {
  const [activeTab, setActiveTab] = useState("language");
  const navigate = useNavigate();
  if (!word) return null;

  const layer = word.layers[activeTab];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      {/* Panel */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-2xl z-50 max-h-[75vh] flex flex-col shadow-xl">
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Word Title */}
        <div className="px-5 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-txt">"{word.text}"</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#636E72" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? `${tab.color} text-white`
                      : "bg-surface text-txt-secondary"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {activeTab === "language" && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Nghĩa</p>
                <p className="text-sm text-txt leading-relaxed">{layer.meaning}</p>
              </div>
              {layer.pronunciation && (
                <div>
                  <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Phát âm</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-primary bg-primary-bg px-2 py-1 rounded">{layer.pronunciation}</span>
                    <button className="w-8 h-8 rounded-full bg-primary-bg flex items-center justify-center text-primary">
                      🔊
                    </button>
                    <button className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-accent">
                      🎤
                    </button>
                  </div>
                </div>
              )}
              {layer.partOfSpeech && (
                <div>
                  <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Từ loại</p>
                  <span className="text-xs bg-surface text-txt-secondary px-2 py-1 rounded">{layer.partOfSpeech}</span>
                </div>
              )}
              {layer.examples && (
                <div>
                  <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Ví dụ</p>
                  <div className="space-y-1">
                    {layer.examples.map((ex, i) => (
                      <p key={i} className="text-xs text-txt-secondary italic bg-surface rounded px-3 py-2">"{ex}"</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "context" && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Register</p>
                <p className="text-sm text-txt">{layer.register}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Tone</p>
                <p className="text-sm text-txt">{layer.tone}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Khi nào dùng</p>
                <p className="text-sm text-txt">{layer.whenToUse}</p>
              </div>
              {layer.alternatives && (
                <div>
                  <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Cách nói thay thế</p>
                  <div className="space-y-1.5">
                    {layer.alternatives.map((alt, i) => (
                      <div key={i} className="flex items-center justify-between bg-surface rounded-lg px-3 py-2">
                        <span className="text-sm text-txt font-medium">"{alt.text}"</span>
                        <span className="text-[9px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">{alt.register}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "culture" && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-txt-light uppercase tracking-wider mb-1">Bối cảnh văn hóa</p>
                <p className="text-sm text-txt leading-relaxed">{layer.note}</p>
              </div>
              {layer.comparison && (
                <div className="bg-secondary/5 rounded-xl p-3 border border-secondary/10">
                  <p className="text-[10px] font-semibold text-secondary uppercase tracking-wider mb-1">🔄 So sánh với Việt Nam</p>
                  <p className="text-sm text-txt leading-relaxed">{layer.comparison}</p>
                </div>
              )}
              {layer.dosDonts && (
                <div className="bg-warning/10 rounded-xl p-3 border border-warning/20">
                  <p className="text-[10px] font-semibold text-warning uppercase tracking-wider mb-1">⚠️ Lưu ý</p>
                  <p className="text-sm text-txt leading-relaxed">{layer.dosDonts}</p>
                </div>
              )}
              {layer.richPoint && (
                <div className="bg-accent-light rounded-xl p-3 border border-accent/10">
                  <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">✨ Rich Point</p>
                  <p className="text-xs text-txt-secondary">Đây là điểm văn hóa đặc biệt — tập trung hiểu sâu!</p>
                  {layer.deepDiveId && (
                    <button
                      onClick={() => { onClose(); navigate(`/culture/${layer.deepDiveId}`); }}
                      className="mt-2 text-xs font-semibold text-accent hover:underline"
                    >
                      Tìm hiểu thêm →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="px-5 py-3 border-t border-border flex gap-2">
          <button className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-xl text-sm">
            + Thêm vào từ vựng
          </button>
          <button className="flex-1 bg-accent/10 text-accent font-semibold py-2.5 rounded-xl text-sm">
            Luyện tập
          </button>
        </div>
      </div>
    </>
  );
}
