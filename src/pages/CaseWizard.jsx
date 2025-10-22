import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Case } from "@/api/entities";
import { CaseInput } from "@/api/entities";
import { Document } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { createPageUrl } from "@/utils";
import { InvokeLLM } from "@/api/integrations";

import StepIndicator from "../components/wizard/StepIndicator";
import PersonalInfoStep from "../components/wizard/PersonalInfoStep";
import EndeavorStep from "../components/wizard/EndeavorStep";
import ProngTestStep from "../components/wizard/ProngTestStep";
import AchievementsStep from "../components/wizard/AchievementsStep";
import DocumentsStep from "../components/wizard/DocumentsStep";

export default function CaseWizard() {
  const navigate = useNavigate();
  const [currentCase, setCurrentCase] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefining, setIsRefining] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const caseId = urlParams.get("caseId");

  useEffect(() => {
    if (caseId) {
      loadCase();
    }
  }, [caseId]);

  const loadCase = async () => {
    setIsLoading(true);
    const caseData = await Case.filter({ id: caseId });
    if (caseData.length > 0) {
      setCurrentCase(caseData[0]);
      
      const inputs = await CaseInput.filter({ case_id: caseId });
      setInputData(inputs[0] || { case_id: caseId });
      
      const docs = await Document.filter({ case_id: caseId });
      setDocuments(docs);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (inputData.id) {
      await CaseInput.update(inputData.id, inputData);
    } else {
      const created = await CaseInput.create(inputData);
      setInputData(created);
    }
    
    const completion = calculateCompletion();
    await Case.update(currentCase.id, {
      current_step: currentCase.current_step,
      completion_percentage: completion
    });
    
    setIsSaving(false);
  };

  const handleRefine = async (field, content) => {
    if (!content) return;
    
    setIsRefining(true);
    try {
      const refined = await InvokeLLM({
        prompt: `You are an immigration attorney helping draft an EB2-NIW petition. Improve and expand the following text for the "${field}" section. Make it more compelling, professional, and persuasive while maintaining accuracy. Keep the same core information but enhance the language and structure:\n\n${content}`,
      });
      
      setInputData({ ...inputData, [field]: refined });
    } catch (error) {
      console.error("Error refining text:", error);
    }
    setIsRefining(false);
  };

  const calculateCompletion = () => {
    let score = 0;
    if (inputData?.education) score += 10;
    if (inputData?.current_position) score += 10;
    if (inputData?.personal_background) score += 10;
    if (inputData?.proposed_endeavor) score += 15;
    if (inputData?.endeavor_field) score += 10;
    if (inputData?.substantial_merit) score += 15;
    if (inputData?.well_positioned) score += 15;
    if (inputData?.beneficial_to_us) score += 15;
    return score;
  };

  const steps = ["personal_info", "endeavor", "prong_test", "achievements", "documents", "drafting"];
  const currentStepIndex = steps.indexOf(currentCase?.current_step || "personal_info");

  const handleNext = async () => {
    await handleSave();
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      await Case.update(currentCase.id, { current_step: nextStep });
      setCurrentCase({ ...currentCase, current_step: nextStep });
    } else {
      navigate(createPageUrl(`DraftEditor?caseId=${caseId}`));
    }
  };

  const handleBack = async () => {
    await handleSave();
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      await Case.update(currentCase.id, { current_step: prevStep });
      setCurrentCase({ ...currentCase, current_step: prevStep });
    }
  };

  if (isLoading || !currentCase || !inputData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading case...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="py-6">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">{currentCase.title}</h1>
          <p className="text-slate-600 mt-1">Complete each section to build your petition</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentCase.current_step} />

        {/* Step Content */}
        <div className="mt-8">
          {currentCase.current_step === "personal_info" && (
            <PersonalInfoStep data={inputData} onChange={setInputData} />
          )}
          {currentCase.current_step === "endeavor" && (
            <EndeavorStep data={inputData} onChange={setInputData} onRefine={handleRefine} />
          )}
          {currentCase.current_step === "prong_test" && (
            <ProngTestStep data={inputData} onChange={setInputData} onRefine={handleRefine} />
          )}
          {currentCase.current_step === "achievements" && (
            <AchievementsStep data={inputData} onChange={setInputData} />
          )}
          {currentCase.current_step === "documents" && (
            <DocumentsStep
              caseId={caseId}
              documents={documents}
              onDocumentsChange={setDocuments}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStepIndex === 0 || isSaving}
            className="border-slate-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Progress"}
            </Button>
            <Button
              onClick={handleNext}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
            >
              {currentStepIndex === steps.length - 1 ? "Generate Drafts" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}