import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userProgress } from "../data/userProgress";
import { contentItems, platforms, sourceIcons, difficultyColors } from "../data/library";

export default function HomeA() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const myContent = contentItems.filter((c) => c.imported);
  const suggested = contentItems.filter((c) => !c.imported).slice(0, 4);

  return (
    <div className="pb-20">
      {/* Minimal Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div>
          <h1 className="text-lg font-bold text-txt">
            Culture<span className="text-primary">Lingo</span>
          </h1>
          <p className="text-xs text-txt-secondary">Learning layer cho moi noi dung</p>
        </div>
        <div className="flex items-center gap-1.5 bg-primary-bg rounded-full px-3 py-1.5">
          <span className="text-sm">🔥</span>
          <span className="text-primary font-bold text-sm">{userProgress.streak}</span>
        </div>
      </div>

      <div className="px-4">
        {/* URL Input - Hero */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 mb-5">
          <p className="text-white font-semibold text-sm mb-1">Them noi dung de hoc</p>
          <p className="text-white/60 text-xs mb-3">
            Paste URL tu YouTube, Netflix, Spotify... App se lay transcript va tao bai hoc
          </p>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste URL tai day..."
                className="w-full bg-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm border border-white/20 focus:outline-none focus:border-white/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">🔗</span>
            </div>
            <button className="bg-white text-primary font-semibold px-4 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
              Xu ly
            </button>
          </div>

          {/* Platform Icons */}
          <div className="flex gap-2 mt-3">
            {platforms.map((p) => (
              <button
                key={p.id}
                className="flex items-center gap-1 bg-white/15 hover:bg-white/25 rounded-lg px-2.5 py-1.5 transition-colors"
              >
                <span className="text-sm">{p.icon}</span>
                <span className="text-white/80 text-[10px] font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* My Content */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-txt">Noi dung cua toi</h2>
            <span className="text-[10px] text-txt-secondary bg-primary-bg px-2 py-0.5 rounded-full font-medium">
              {myContent.length} items
            </span>
          </div>

          {myContent.length === 0 ? (
            <div className="bg-card rounded-xl border border-border border-dashed p-8 text-center">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm text-txt-secondary">Chua co noi dung nao</p>
              <p className="text-xs text-txt-light mt-1">Paste URL phia tren de bat dau</p>
            </div>
          ) : (
            <div className="space-y-2">
              {myContent.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/player/${item.id}`)}
                  className="w-full flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-bg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{sourceIcons[item.source]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${difficultyColors[item.difficulty]}`}>
                        {item.difficulty}
                      </span>
                      <span className="text-[10px] text-txt-light">{item.duration}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-txt line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-txt-secondary">{item.progress}%</span>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B2BEC3" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Suggested Content */}
        <div className="mb-5">
          <h2 className="text-sm font-bold text-txt mb-2">Goi y noi dung pho bien</h2>
          <p className="text-xs text-txt-light mb-3">Co san transcript, san sang hoc ngay</p>
          <div className="grid grid-cols-2 gap-2">
            {suggested.map((item) => (
              <button
                key={item.id}
                className="bg-card rounded-xl border border-border p-3 text-left hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm">{sourceIcons[item.source]}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${difficultyColors[item.difficulty]}`}>
                    {item.difficulty}
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-txt line-clamp-2 leading-tight">{item.title}</h3>
                <p className="text-[10px] text-txt-secondary mt-1">{item.culture} · {item.duration}</p>
                <div className="mt-2 flex items-center gap-1 text-primary">
                  <span className="text-[10px] font-semibold">+ Them vao</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-lg font-bold text-primary">{userProgress.wordsLearned}</p>
              <p className="text-[10px] text-txt-secondary">Tu da hoc</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-lg font-bold text-secondary">{userProgress.culturesDiscovered}</p>
              <p className="text-[10px] text-txt-secondary">Van hoa</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-lg font-bold text-accent">{userProgress.level}</p>
              <p className="text-[10px] text-txt-secondary">Trinh do</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
