import { useNavigate } from "react-router-dom";

export default function TopBar({ title, showBack = false, right = null }) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-bg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <h1 className="text-base font-semibold text-txt">{title}</h1>
        </div>
        {right && <div>{right}</div>}
      </div>
    </div>
  );
}
