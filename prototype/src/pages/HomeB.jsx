import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userProgress } from "../data/userProgress";
import { contentItems, sourceIcons, difficultyColors } from "../data/library";

const quickActions = [
  { label: "Xem phim", icon: "🎬", color: "bg-purple-100", desc: "Học từ phim/series" },
  { label: "Luyện nói", icon: "🗣️", color: "bg-pink-100", desc: "AI Conversation" },
  { label: "Văn hóa", icon: "🌍", color: "bg-blue-100", desc: "Culture Deep Dive" },
  { label: "Thêm mới", icon: "➕", color: "bg-green-100", desc: "Paste URL" },
];

export default function HomeB() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const myContent = contentItems.filter((c) => c.imported);
  const suggested = contentItems.filter((c) => !c.imported).slice(0, 5);

  return (
    <div className="pb-20">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/70 text-sm">Xin chào,</p>
            <h1 className="text-white text-xl font-bold">{userProgress.name} 👋</h1>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5">
            <span className="text-lg">🔥</span>
            <span className="text-white font-bold text-sm">{userProgress.streak}</span>
            <span className="text-white/70 text-xs">ngày</span>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">{userProgress.wordsLearned}</p>
            <p className="text-white/70 text-[10px]">Từ đã học</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">{userProgress.culturesDiscovered}</p>
            <p className="text-white/70 text-[10px]">Văn hóa</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">{userProgress.level}</p>
            <p className="text-white/70 text-[10px]">Trình độ</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">{userProgress.xp}</p>
            <p className="text-white/70 text-[10px]">XP</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Continue Learning */}
        {myContent.length > 0 && (
          <div className="mb-5">
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
              <p className="text-xs font-semibold text-txt-secondary uppercase tracking-wider mb-3">
                Tiếp tục học
              </p>
              {myContent.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/player/${item.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary-bg transition-colors mb-2 last:mb-0 text-left"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{sourceIcons[item.source]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-txt line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-txt-secondary font-medium">{item.progress}%</span>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-5">
          <h2 className="text-sm font-bold text-txt mb-3">Hôm nay học gì?</h2>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  if (action.label === "Thêm mới") setShowUrlInput(!showUrlInput);
                }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:shadow-sm transition-shadow"
              >
                <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
                  <span className="text-lg">{action.icon}</span>
                </div>
                <span className="text-[10px] font-medium text-txt-secondary">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* URL Input (toggleable) */}
        {showUrlInput && (
          <div className="mb-5 bg-card rounded-xl border border-primary/20 p-4">
            <p className="text-xs font-semibold text-txt mb-2">Paste URL từ nền tảng bất kỳ</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="flex-1 bg-surface text-txt text-sm rounded-lg px-3 py-2.5 border border-border focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white font-semibold px-4 py-2.5 rounded-lg text-sm">
                Xử lý
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] text-txt-light">Hỗ trợ:</span>
              <span className="text-[10px] text-txt-secondary">YouTube · Netflix · Spotify · TED · Podcast RSS</span>
            </div>
          </div>
        )}

        {/* Suggested Content */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-txt">Gợi ý cho bạn</h2>
            <button className="text-xs font-semibold text-primary">Xem tất cả</button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
            {suggested.map((item) => (
              <button
                key={item.id}
                className="flex-shrink-0 w-[180px] bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow text-left"
              >
                <div className="h-20 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-3xl">{sourceIcons[item.source]}</span>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${difficultyColors[item.difficulty]}`}>
                      {item.difficulty}
                    </span>
                    <span className="text-[10px] text-txt-light">{item.culture}</span>
                  </div>
                  <h3 className="text-xs font-semibold text-txt line-clamp-2 leading-tight">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="mb-5">
          <h2 className="text-sm font-bold text-txt mb-3">Tuần này</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-card rounded-xl p-3 border border-border">
              <p className="text-xl font-bold text-primary">{userProgress.weeklyStats.minutesLearned}</p>
              <p className="text-[10px] text-txt-secondary">phút học</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border">
              <p className="text-xl font-bold text-secondary">{userProgress.weeklyStats.wordsAdded}</p>
              <p className="text-[10px] text-txt-secondary">từ mới</p>
            </div>
          </div>
        </div>

        {/* 3 Layer Highlight */}
        <div className="mb-4">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
            <h3 className="text-xs font-bold text-txt mb-2">Hiểu sâu 3 tầng 💡</h3>
            <div className="flex gap-2">
              <div className="flex-1 bg-primary/10 rounded-lg p-2 text-center">
                <p className="text-sm mb-0.5">📝</p>
                <p className="text-[9px] font-semibold text-primary">Language</p>
              </div>
              <div className="flex-1 bg-secondary/10 rounded-lg p-2 text-center">
                <p className="text-sm mb-0.5">🎯</p>
                <p className="text-[9px] font-semibold text-secondary">Context</p>
              </div>
              <div className="flex-1 bg-accent/10 rounded-lg p-2 text-center">
                <p className="text-sm mb-0.5">🌍</p>
                <p className="text-[9px] font-semibold text-accent">Culture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
