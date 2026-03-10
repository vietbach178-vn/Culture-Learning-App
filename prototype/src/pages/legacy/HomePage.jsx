import { useNavigate } from "react-router-dom";

const variants = [
  {
    id: "a",
    route: "/home-a",
    title: "A: Input-first",
    desc: "URL paste noi bat tren cung. App la cong cu xu ly content. User chu dong mang noi dung vao.",
    color: "from-primary to-primary-dark",
    icon: "🔗",
  },
  {
    id: "b",
    route: "/home-b",
    title: "B: Dashboard-first",
    desc: "Chao + streak noi bat. Tiep tuc hoc + quick actions. Motivate quay lai hang ngay nhu Duolingo.",
    color: "from-secondary to-secondary-dark",
    icon: "📊",
  },
  {
    id: "c",
    route: "/home-c",
    title: "C: 3-nhom ro rang",
    desc: "Hub dieu huong: Noi dung (input) → Hoc (learning) → Luyen tap (practice). Thay ro product structure.",
    color: "from-accent to-primary",
    icon: "📋",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="pb-20 pt-12 px-4">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-txt mb-1">
          Culture<span className="text-primary">Lingo</span>
        </h1>
        <p className="text-sm text-txt-secondary">Chon phuong an Home Screen</p>
        <p className="text-xs text-txt-light mt-1">Tap vao de xem chi tiet tung phuong an</p>
      </div>

      <div className="space-y-3">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => navigate(v.route)}
            className="w-full text-left bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`bg-gradient-to-r ${v.color} px-5 py-4 flex items-center gap-3`}>
              <span className="text-3xl">{v.icon}</span>
              <div>
                <h2 className="text-white font-bold text-base">{v.title}</h2>
              </div>
            </div>
            <div className="px-5 py-3">
              <p className="text-xs text-txt-secondary leading-relaxed">{v.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-[10px] text-txt-light">Moi phuong an deu co day du UI de so sanh</p>
      </div>
    </div>
  );
}
