const steps = [
  { id: 1, label: "Xem", icon: "👀" },
  { id: 2, label: "Nghe & Khám phá", icon: "✍️" },
  { id: 3, label: "Nói", icon: "🎤" },
  { id: 4, label: "Xem lại", icon: "🎬" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-border">
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-0.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30 scale-110"
                    : isDone
                    ? "bg-success/20 text-success"
                    : "bg-surface text-txt-light"
                }`}
              >
                {isDone ? "✓" : step.icon}
              </div>
              <span
                className={`text-[8px] font-semibold ${
                  isActive ? "text-primary" : isDone ? "text-success" : "text-txt-light"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-4 h-0.5 mx-0.5 mt-[-10px] rounded ${
                  isDone ? "bg-success/30" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
