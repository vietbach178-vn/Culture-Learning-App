import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transcripts } from "../data/transcript";
import { contentItems } from "../data/library";
import StepIndicator from "../components/practice/StepIndicator";
import StepWatch from "../components/practice/StepWatch";
import StepListenFill from "../components/practice/StepListenFill";
import StepSpeak from "../components/practice/StepSpeak";
import StepRewatch from "../components/practice/StepRewatch";

export default function PracticePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const transcript = transcripts[id];
  const content = contentItems.find((c) => c.id === id);

  const [currentStep, setCurrentStep] = useState(1);

  if (!transcript || !content) {
    return (
      <div className="pb-20 pt-14 px-4 text-center">
        <p className="text-4xl mb-3">📄</p>
        <p className="text-sm text-txt-secondary">Chưa có bài luyện tập cho nội dung này</p>
        <button onClick={() => navigate(-1)} className="mt-3 text-sm text-primary font-semibold">
          ← Quay lại
        </button>
      </div>
    );
  }

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-0">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-border">
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-txt-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {currentStep > 1 ? "Bước trước" : "Thoát"}
          </button>
          <div className="text-center">
            <p className="text-xs font-semibold text-txt">{content.title}</p>
            <p className="text-[9px] text-txt-light">Luyện tập</p>
          </div>
          <button
            onClick={() => navigate(`/player/${id}`)}
            className="text-[10px] text-primary font-semibold"
          >
            Transcript
          </button>
        </div>
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col">
        {currentStep === 1 && (
          <StepWatch transcript={transcript} content={content} onNext={goNext} />
        )}
        {currentStep === 2 && (
          <StepListenFill transcript={transcript} onNext={goNext} />
        )}
        {currentStep === 3 && (
          <StepSpeak transcript={transcript} onNext={goNext} />
        )}
        {currentStep === 4 && (
          <StepRewatch transcript={transcript} content={content} onFinish={() => navigate("/")} />
        )}
      </div>
    </div>
  );
}
