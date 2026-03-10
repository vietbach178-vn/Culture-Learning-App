import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userProgress } from "../data/userProgress";
import { contentItems, platforms, sourceIcons, difficultyColors } from "../data/library";

export default function HomeC() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const myContent = contentItems.filter((c) => c.imported);
  const suggested = contentItems.filter((c) => !c.imported).slice(0, 3);

  return (
    <div className="pb-20">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <h1 className="text-lg font-bold text-txt">
          Culture<span className="text-primary">Lingo</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-primary-bg rounded-full px-2.5 py-1">
            <span className="text-sm">🔥</span>
            <span className="text-primary font-bold text-xs">{userProgress.streak}</span>
          </div>
          <div className="flex items-center gap-1 bg-primary-bg rounded-full px-2.5 py-1">
            <span className="text-xs font-bold text-primary">{userProgress.level}</span>
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* ═══ SECTION 1: NOI DUNG (INPUT) ═══ */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">1</span>
            </div>
            <h2 className="text-sm font-bold text-txt">Noi dung</h2>
            <span className="text-[10px] text-txt-light">— Lay noi dung tu ben ngoai</span>
          </div>

          {/* URL Input */}
          <div className="bg-card rounded-xl border border-border p-3 mb-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="🔗 Paste URL (YouTube, Netflix...)"
                className="flex-1 bg-surface text-txt text-sm rounded-lg px-3 py-2.5 border border-border focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white font-semibold px-4 py-2.5 rounded-lg text-sm whitespace-nowrap">
                Xu ly
              </button>
            </div>
            <div className="flex gap-1.5 mt-2">
              {platforms.slice(0, 4).map((p) => (
                <span key={p.id} className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${p.color}`}>
                  {p.icon} {p.name}
                </span>
              ))}
            </div>
          </div>

          {/* My Content (compact) */}
          {myContent.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-txt-secondary uppercase tracking-wider">
                  Noi dung da luu ({myContent.length})
                </p>
                <button className="text-[10px] font-semibold text-primary">Tat ca</button>
              </div>
              {myContent.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm">{sourceIcons[item.source]}</span>
                  <span className="text-xs font-medium text-txt flex-1 line-clamp-1">{item.title}</span>
                  <div className="w-12 h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.progress}%` }} />
                  </div>
                  <span className="text-[9px] text-txt-light">{item.progress}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Suggested */}
          {suggested.length > 0 && (
            <div className="mt-2">
              <p className="text-[10px] text-txt-light mb-1.5">Goi y noi dung pho bien:</p>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {suggested.map((item) => (
                  <button key={item.id} className="flex-shrink-0 flex items-center gap-2 bg-card rounded-lg border border-border px-3 py-2 hover:shadow-sm transition-shadow">
                    <span className="text-sm">{sourceIcons[item.source]}</span>
                    <div className="text-left">
                      <p className="text-[10px] font-semibold text-txt line-clamp-1 max-w-[120px]">{item.title}</p>
                      <p className="text-[9px] text-txt-light">{item.difficulty} · {item.culture}</p>
                    </div>
                    <span className="text-primary text-xs">+</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══ SECTION 2: HOC (LEARNING) ═══ */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">2</span>
            </div>
            <h2 className="text-sm font-bold text-txt">Hoc</h2>
            <span className="text-[10px] text-txt-light">— Hieu sau qua 3 tang</span>
          </div>

          <div className="space-y-2">
            {/* Transcript Player */}
            <button className="w-full flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow text-left">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📖</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-txt">Smart Transcript</h3>
                <p className="text-[10px] text-txt-secondary">Xem video/nghe audio voi transcript tuong tac</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* 3-Layer Explorer */}
            <button className="w-full flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow text-left">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🔍</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-txt">3-Layer Explorer</h3>
                <p className="text-[10px] text-txt-secondary">Language → Context → Culture cho moi tu</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Culture Deep Dive */}
            <button className="w-full flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow text-left">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🌍</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-txt">Culture Deep Dive</h3>
                <p className="text-[10px] text-txt-secondary">Bai hoc van hoa sau tu noi dung</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ═══ SECTION 3: LUYEN TAP (PRACTICE) ═══ */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">3</span>
            </div>
            <h2 className="text-sm font-bold text-txt">Luyen tap</h2>
            <span className="text-[10px] text-txt-light">— Thuc hanh ky nang</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="bg-card rounded-xl border border-border p-3 text-center hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-1.5">
                <span className="text-lg">🎬</span>
              </div>
              <p className="text-[10px] font-semibold text-txt">Scene Practice</p>
              <p className="text-[9px] text-txt-light mt-0.5">5-step flow</p>
            </button>

            <button className="bg-card rounded-xl border border-border p-3 text-center hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-1.5">
                <span className="text-lg">🗣️</span>
              </div>
              <p className="text-[10px] font-semibold text-txt">AI Chat</p>
              <p className="text-[9px] text-txt-light mt-0.5">Hoi thoai</p>
            </button>

            <button className="bg-card rounded-xl border border-border p-3 text-center hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-1.5">
                <span className="text-lg">🎵</span>
              </div>
              <p className="text-[10px] font-semibold text-txt">Lyrics Lab</p>
              <p className="text-[9px] text-txt-light mt-0.5">Hoc qua nhac</p>
            </button>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="bg-card rounded-xl border border-border p-3 mb-4">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-base font-bold text-primary">{userProgress.wordsLearned}</p>
              <p className="text-[9px] text-txt-secondary">Tu da hoc</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-base font-bold text-secondary">{userProgress.culturesDiscovered}</p>
              <p className="text-[9px] text-txt-secondary">Van hoa</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-base font-bold text-accent">{userProgress.weeklyStats.minutesLearned}</p>
              <p className="text-[9px] text-txt-secondary">Phut/tuan</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-base font-bold text-warning">{userProgress.xp}</p>
              <p className="text-[9px] text-txt-secondary">XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
