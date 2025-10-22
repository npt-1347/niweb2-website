import React, { useState, useEffect } from "react";
import { Case } from "@/api/entities";
import { CaseInput } from "@/api/entities";
import { Chapter } from "@/api/entities";
import { Citation } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, FileDown, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { InvokeLLM } from "@/api/integrations";
import ReactQuill from "react-quill";

const chapters = [
  { number: 1, title: "Proposed Endeavor", key: "endeavor" },
  { number: 2, title: "Merit, Scope, and National Importance", key: "merit" },
  { number: 3, title: "Evidence of Contributions", key: "contributions" },
  { number: 4, title: "U.S. Benefit & Conclusion", key: "conclusion" }
];

export default function DraftEditor() {
  const navigate = useNavigate();
  const [currentCase, setCurrentCase] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [chapterData, setChapterData] = useState([]);
  const [activeChapter, setActiveChapter] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const caseId = urlParams.get("caseId");

  useEffect(() => {
    if (caseId) {
      loadData();
    }
  }, [caseId]);

  const loadData = async () => {
    const caseInfo = await Case.filter({ id: caseId });
    setCurrentCase(caseInfo[0]);
    
    const inputs = await CaseInput.filter({ case_id: caseId });
    setInputData(inputs[0]);
    
    const existingChapters = await Chapter.filter({ case_id: caseId });
    setChapterData(existingChapters);
  };

  const generateChapter = async (chapterNum) => {
    setIsGenerating(true);
    const chapter = chapters[chapterNum - 1];
    
    try {
      let prompt = `You are an expert immigration attorney drafting an EB2-NIW (National Interest Waiver) petition. Generate Chapter ${chapterNum}: ${chapter.title}.\n\n`;
      
      if (chapterNum === 1) {
        prompt += `Based on the following information about the petitioner, write a compelling chapter describing their proposed endeavor:\n\nProposed Endeavor: ${inputData.proposed_endeavor}\nField: ${inputData.endeavor_field}\nBackground: ${inputData.personal_background}`;
      } else if (chapterNum === 2) {
        prompt += `Write a persuasive chapter demonstrating the substantial merit and national importance of the endeavor:\n\nSubstantial Merit: ${inputData.substantial_merit}\nEndeavor: ${inputData.proposed_endeavor}`;
      } else if (chapterNum === 3) {
        prompt += `Write a chapter highlighting the petitioner's evidence of contributions and qualifications:\n\nEducation: ${inputData.education}\nPosition: ${inputData.current_position}\nWell Positioned: ${inputData.well_positioned}\nAchievements: ${JSON.stringify(inputData.achievements || [])}`;
      } else {
        prompt += `Write a compelling conclusion chapter explaining why waiving the job offer requirement benefits the U.S.:\n\nBenefit to U.S.: ${inputData.beneficial_to_us}\nEndeavor: ${inputData.proposed_endeavor}`;
      }
      
      prompt += `\n\nFormat the response as professional legal writing with proper paragraphs. Include specific references where appropriate. Make it persuasive and evidence-based.`;
      
      const content = await InvokeLLM({ prompt });
      
      const existing = chapterData.find(c => c.chapter_number === chapterNum);
      if (existing) {
        await Chapter.update(existing.id, {
          content,
          status: "draft",
          word_count: content.split(/\s+/).length
        });
      } else {
        const newChapter = await Chapter.create({
          case_id: caseId,
          chapter_number: chapterNum,
          title: chapter.title,
          content,
          status: "draft",
          word_count: content.split(/\s+/).length
        });
        setChapterData([...chapterData, newChapter]);
      }
      
      await loadData();
    } catch (error) {
      console.error("Error generating chapter:", error);
    }
    setIsGenerating(false);
  };

  const updateChapterContent = async (chapterId, content) => {
    await Chapter.update(chapterId, {
      content,
      word_count: content.split(/\s+/).length
    });
    await loadData();
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate PDF export
    setTimeout(() => {
      alert("PDF export feature coming soon! Your petition draft is ready for review.");
      setIsExporting(false);
    }, 2000);
  };

  const activeChapterData = chapterData.find(c => c.chapter_number === activeChapter);

  if (!currentCase || !inputData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{currentCase.title}</h1>
              <p className="text-slate-600 mt-1">AI-Powered Petition Draft Editor</p>
            </div>
            <Button
              onClick={handleExport}
              disabled={isExporting || chapterData.length === 0}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/30"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 mr-2" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chapters List */}
          <Card className="lg:col-span-1 border-slate-200 shadow-xl h-fit">
            <CardHeader className="border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Chapters</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {chapters.map((chapter) => {
                  const chap = chapterData.find(c => c.chapter_number === chapter.number);
                  const isActive = activeChapter === chapter.number;
                  
                  return (
                    <button
                      key={chapter.number}
                      onClick={() => setActiveChapter(chapter.number)}
                      className={`w-full text-left p-4 transition-colors ${
                        isActive ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">Chapter {chapter.number}</span>
                        {chap?.status === "draft" && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{chapter.title}</p>
                      {chap && (
                        <p className="text-xs text-slate-400 mt-1">{chap.word_count} words</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Editor */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-slate-200 shadow-xl">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Chapter {activeChapter}: {chapters[activeChapter - 1].title}
                    </h2>
                    {activeChapterData && (
                      <Badge className="mt-2 bg-emerald-100 text-emerald-700">Draft Ready</Badge>
                    )}
                  </div>
                  <Button
                    onClick={() => generateChapter(activeChapter)}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {activeChapterData ? "Regenerate" : "Generate Chapter"}
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {activeChapterData ? (
                  <div className="prose prose-slate max-w-none">
                    <ReactQuill
                      value={activeChapterData.content}
                      onChange={(content) => updateChapterContent(activeChapterData.id, content)}
                      className="min-h-96 bg-white"
                      theme="snow"
                    />
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-400">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg mb-2">No content generated yet</p>
                    <p className="text-sm">Click "Generate Chapter" to create AI-powered content</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}