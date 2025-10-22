import React from "react";
import { Check } from "lucide-react";

const steps = [
  { id: "personal_info", label: "Personal Info" },
  { id: "endeavor", label: "Proposed Endeavor" },
  { id: "prong_test", label: "Prong Test" },
  { id: "achievements", label: "Achievements" },
  { id: "documents", label: "Documents" },
  { id: "drafting", label: "Generate Drafts" }
];

export default function StepIndicator({ currentStep }) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300
                  ${isCompleted 
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                    : isCurrent 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100' 
                      : 'bg-slate-100 text-slate-400'}
                `}>
                  {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
                </div>
                <span className={`mt-2 text-xs font-medium hidden md:block ${
                  isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                  isCompleted ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-200'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}