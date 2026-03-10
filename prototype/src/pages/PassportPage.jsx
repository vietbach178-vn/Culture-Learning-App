import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userProgress } from "../data/userProgress";

const levelColors = {
  A1: "from-gray-400 to-gray-500",
  A2: "from-green-400 to-green-500",
  B1: "from-blue-400 to-blue-500",
  B2: "from-purple-400 to-purple-500",
  C1: "from-orange-400 to-orange-500",
  C2: "from-red-400 to-red-500",
};

const skillIcons = {
  listening: "👂",
  speaking: "🗣️",
  reading: "📖",
  culture: "🌍",
};

const skillLabels = {
  listening: "Nghe",
  speaking: "Nói",
  reading: "Đọc",
  culture: "Văn hóa",
};

export default function PassportPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("passport");
  const u = userProgress;

  return (
    <div className="pb-20 min-h-screen bg-surface">
      {/* Passport Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-0 left-8 w-20 h-20 border border-white/20 rounded-full" />
        </div>

        <div className="pt-14 pb-6 px-5 relative">
          {/* Passport badge */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center border-2 border-white/30">
              <span className="text-3xl">🛂</span>
            </div>
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-medium">Cultural Passport</p>
              <h1 className="text-xl font-bold text-white">{u.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full`}>
                  Level {u.level}
                </span>
                <span className="text-[10px] text-white/70">{u.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/15 rounded-xl p-2.5 text-center backdrop-blur-sm">
              <p className="text-lg font-bold text-white">{u.streak}</p>
              <p className="text-[9px] text-white/70">Ngày streak 🔥</p>
            </div>
            <div className="bg-white/15 rounded-xl p-2.5 text-center backdrop-blur-sm">
              <p className="text-lg font-bold text-white">{u.wordsLearned}</p>
              <p className="text-[9px] text-white/70">Từ đã học</p>
            </div>
            <div className="bg-white/15 rounded-xl p-2.5 text-center backdrop-blur-sm">
              <p className="text-lg font-bold text-white">{u.culturesDiscovered}</p>
              <p className="text-[9px] text-white/70">Văn hóa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="flex">
          {[
            { id: "passport", label: "Passport" },
            { id: "skills", label: "Kỹ năng" },
            { id: "stats", label: "Thống kê" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-txt-light"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 py-4">
        {activeTab === "passport" && (
          <div className="space-y-4">
            {/* Cultural Stamps */}
            <div>
              <h2 className="text-sm font-bold text-txt mb-3">🏛️ Tem văn hóa</h2>
              <p className="text-xs text-txt-secondary mb-3">
                Mỗi chủ đề văn hóa là một con tem trong passport. Hoàn thành bài học để mở khóa!
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {u.culturalStamps.map((stamp) => (
                  <div
                    key={stamp.id}
                    className={`bg-white rounded-2xl p-3 border transition-all ${
                      stamp.progress === 100
                        ? "border-success/30 shadow-sm shadow-success/10"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{stamp.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-txt truncate">{stamp.name}</p>
                        <p className="text-[9px] text-txt-light">
                          {stamp.progress === 100 ? "✅ Hoàn thành" : `${stamp.progress}%`}
                        </p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          stamp.progress === 100
                            ? "bg-success"
                            : stamp.progress >= 50
                            ? "bg-primary"
                            : "bg-primary/50"
                        }`}
                        style={{ width: `${stamp.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-sm font-bold text-txt mb-3">🏆 Thành tựu</h2>
              <div className="space-y-2">
                {[
                  { icon: "🔥", title: "7 ngày liên tiếp", desc: "Học 7 ngày không nghỉ", done: true },
                  { icon: "📚", title: "100 từ đầu tiên", desc: "Học được 100 từ vựng", done: true },
                  { icon: "🌍", title: "Nhà thám hiểm", desc: "Khám phá 5 chủ đề văn hóa", done: true },
                  { icon: "🎤", title: "Tự tin nói", desc: "Hoàn thành 10 bài luyện nói", done: false },
                  { icon: "🧠", title: "Hiểu sâu", desc: "Đọc hết 10 bài Culture Deep Dive", done: false },
                  { icon: "⭐", title: "Level B2", desc: "Đạt trình độ B2", done: false },
                ].map((ach, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 bg-white rounded-xl p-3 border ${
                      ach.done ? "border-success/20" : "border-border opacity-60"
                    }`}
                  >
                    <span className={`text-xl ${ach.done ? "" : "grayscale"}`}>{ach.icon}</span>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${ach.done ? "text-txt" : "text-txt-light"}`}>
                        {ach.title}
                      </p>
                      <p className="text-[10px] text-txt-light">{ach.desc}</p>
                    </div>
                    {ach.done && (
                      <span className="text-[9px] bg-success/10 text-success px-2 py-0.5 rounded-full font-semibold">
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4">
            {/* Skill breakdown */}
            <div>
              <h2 className="text-sm font-bold text-txt mb-3">📊 Trình độ theo kỹ năng</h2>
              <div className="space-y-3">
                {Object.entries(u.skills).map(([key, skill]) => (
                  <div key={key} className="bg-white rounded-2xl p-4 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skillIcons[key]}</span>
                        <span className="text-sm font-semibold text-txt">{skillLabels[key]}</span>
                      </div>
                      <span className={`text-xs font-bold bg-gradient-to-r ${levelColors[skill.level]} text-white px-2.5 py-1 rounded-full`}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${levelColors[skill.level]}`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-txt-light mt-1 text-right">{skill.progress}% đến {skill.level === "C2" ? "Master" : `Level tiếp theo`}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar-like summary */}
            <div className="bg-white rounded-2xl p-4 border border-border">
              <h3 className="text-xs font-bold text-txt mb-3">Tổng quan</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(u.skills).map(([key, skill]) => (
                  <div key={key} className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-1.5">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F1F2F6" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15.5" fill="none"
                          stroke={key === "culture" ? "#FD79A8" : key === "reading" ? "#6C5CE7" : key === "listening" ? "#00CEC9" : "#FDCB6E"}
                          strokeWidth="3"
                          strokeDasharray={`${skill.progress} ${100 - skill.progress}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-txt">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-txt-secondary">{skillLabels[key]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-4">
            {/* Weekly stats */}
            <div>
              <h2 className="text-sm font-bold text-txt mb-3">📅 Thống kê tuần này</h2>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white rounded-2xl p-4 border border-border text-center">
                  <p className="text-2xl font-bold text-primary">{u.weeklyStats.minutesLearned}</p>
                  <p className="text-[10px] text-txt-light mt-0.5">Phút học</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-border text-center">
                  <p className="text-2xl font-bold text-secondary">{u.weeklyStats.wordsAdded}</p>
                  <p className="text-[10px] text-txt-light mt-0.5">Từ mới</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-border text-center">
                  <p className="text-2xl font-bold text-accent">{u.weeklyStats.practiceCompleted}</p>
                  <p className="text-[10px] text-txt-light mt-0.5">Bài luyện tập</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-border text-center">
                  <p className="text-2xl font-bold text-warning">{u.weeklyStats.cultureLessons}</p>
                  <p className="text-[10px] text-txt-light mt-0.5">Bài văn hóa</p>
                </div>
              </div>
            </div>

            {/* Daily streak calendar */}
            <div className="bg-white rounded-2xl p-4 border border-border">
              <h3 className="text-xs font-bold text-txt mb-3">🔥 Chuỗi học tập</h3>
              <div className="flex justify-between">
                {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => {
                  const isActive = i < u.streak;
                  const isToday = i === u.streak - 1;
                  return (
                    <div key={day} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${
                          isToday
                            ? "bg-primary text-white shadow-md shadow-primary/30"
                            : isActive
                            ? "bg-success/20 text-success"
                            : "bg-surface text-txt-light"
                        }`}
                      >
                        {isActive ? "🔥" : "○"}
                      </div>
                      <span className={`text-[9px] font-medium ${
                        isToday ? "text-primary" : isActive ? "text-success" : "text-txt-light"
                      }`}>
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Learning history */}
            <div className="bg-white rounded-2xl p-4 border border-border">
              <h3 className="text-xs font-bold text-txt mb-3">📝 Hoạt động gần đây</h3>
              <div className="space-y-2.5">
                {[
                  { action: "Hoàn thành bài luyện tập", content: "Atlanta S2E5", time: "Hôm nay", icon: "✅", color: "text-success" },
                  { action: "Học 8 từ mới", content: "Atlanta S2E5", time: "Hôm nay", icon: "📝", color: "text-primary" },
                  { action: "Đọc Culture Deep Dive", content: "The Cookout", time: "Hôm qua", icon: "🌍", color: "text-accent" },
                  { action: "Luyện nói 5 câu", content: "Atlanta S2E5", time: "Hôm qua", icon: "🎤", color: "text-secondary" },
                  { action: "Thêm 5 từ vào từ vựng", content: "TED — Single Story", time: "2 ngày trước", icon: "📚", color: "text-primary" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-sm mt-0.5">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-txt">{item.action}</p>
                      <p className="text-[10px] text-txt-light">{item.content}</p>
                    </div>
                    <span className="text-[9px] text-txt-light whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10 text-center">
              <p className="text-xs text-txt-secondary mb-2">Tiếp tục học để duy trì streak!</p>
              <button
                onClick={() => navigate("/")}
                className="bg-primary text-white font-semibold py-2.5 px-6 rounded-xl text-sm"
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
