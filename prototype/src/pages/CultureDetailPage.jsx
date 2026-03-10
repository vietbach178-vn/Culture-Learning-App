import { useParams, useNavigate } from "react-router-dom";
import { cultureDives } from "../data/cultureDives";

export default function CultureDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dive = cultureDives.find((d) => d.id === id);

  if (!dive) {
    return (
      <div className="pb-20 pt-14 px-4 text-center">
        <p className="text-4xl mb-3">🌍</p>
        <p className="text-sm text-txt-secondary">Không tìm thấy bài viết này</p>
        <button onClick={() => navigate(-1)} className="mt-3 text-sm text-primary font-semibold">
          ← Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${dive.heroColor} relative`}>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 z-10 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="pt-20 pb-6 px-5 text-white">
          <span className="text-4xl block mb-3">{dive.emoji}</span>
          <h1 className="text-xl font-bold leading-tight mb-2">{dive.title}</h1>
          <p className="text-sm text-white/80 leading-relaxed">{dive.summary}</p>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full font-medium">{dive.category}</span>
            <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full">{dive.culture}</span>
            <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full">📖 {dive.readTime}</span>
          </div>

          {dive.fromContent && (
            <p className="text-[10px] text-white/60 mt-3">Từ nội dung: {dive.fromContent}</p>
          )}
        </div>
      </div>

      {/* Content sections */}
      <div className="px-4 py-4 space-y-4">
        {dive.sections.map((section, idx) => {
          if (section.type === "intro") {
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-border">
                <h2 className="text-sm font-bold text-txt mb-2">{section.title}</h2>
                <p className="text-sm text-txt-secondary leading-relaxed">{section.content}</p>
              </div>
            );
          }

          if (section.type === "comparison") {
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-border">
                <h2 className="text-sm font-bold text-txt mb-3">🔄 {section.title}</h2>
                <div className="space-y-3">
                  <div className="bg-accent/5 rounded-xl p-3 border border-accent/10">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm">🇻🇳</span>
                      <p className="text-[10px] font-semibold text-accent uppercase tracking-wider">Viet Nam</p>
                    </div>
                    <p className="text-xs text-txt-secondary leading-relaxed">{section.vietnam}</p>
                  </div>
                  <div className="bg-primary-bg rounded-xl p-3 border border-primary/10">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm">🇺🇸</span>
                      <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">Mỹ</p>
                    </div>
                    <p className="text-xs text-txt-secondary leading-relaxed">{section.usa}</p>
                  </div>
                </div>
              </div>
            );
          }

          if (section.type === "dosDonts") {
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-border">
                <h2 className="text-sm font-bold text-txt mb-3">⚠️ {section.title}</h2>
                {section.dos && (
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-success uppercase tracking-wider mb-1.5">✅ Nên làm</p>
                    <div className="space-y-1.5">
                      {section.dos.map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-success text-xs mt-0.5">•</span>
                          <p className="text-xs text-txt-secondary leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {section.donts && (
                  <div>
                    <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5">❌ Không nên</p>
                    <div className="space-y-1.5">
                      {section.donts.map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-accent text-xs mt-0.5">•</span>
                          <p className="text-xs text-txt-secondary leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          if (section.type === "language") {
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-border">
                <h2 className="text-sm font-bold text-txt mb-3">📝 {section.title}</h2>
                <div className="space-y-2">
                  {section.words.map((w, i) => (
                    <div key={i} className="flex items-center justify-between bg-surface rounded-xl px-3 py-2.5">
                      <span className="text-sm font-semibold text-primary">"{w.term}"</span>
                      <span className="text-xs text-txt-secondary text-right max-w-[55%]">{w.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
          <p className="text-xs text-txt-secondary text-center mb-3">
            Bài viết này liên quan đến nội dung bạn đang học
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/player/atlanta-s2e5")}
              className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
            >
              Xem Transcript
            </button>
            <button
              onClick={() => navigate("/practice/atlanta-s2e5")}
              className="flex-1 py-2.5 rounded-xl bg-accent/10 text-accent text-sm font-semibold"
            >
              Luyện tập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
