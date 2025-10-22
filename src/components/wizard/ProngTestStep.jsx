import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function ProngTestStep({ data, onChange, onRefine }) {
  const prongs = [
    {
      key: "substantial_merit",
      title: "Prong 1: Substantial Merit & National Importance",
      description: "Explain how your endeavor has substantial merit and national importance to the United States",
      placeholder: "Describe the intrinsic merit of your work and its importance to U.S. interests (economic, scientific, technological, health, etc.)..."
    },
    {
      key: "well_positioned",
      title: "Prong 2: Well Positioned to Advance the Endeavor",
      description: "Demonstrate that you are well positioned to advance your proposed endeavor",
      placeholder: "Highlight your education, skills, knowledge, track record, and resources that position you to succeed..."
    },
    {
      key: "beneficial_to_us",
      title: "Prong 3: Beneficial to Waive Job Offer Requirement",
      description: "Show that it would be beneficial to the United States to waive the job offer requirement",
      placeholder: "Explain why it's in the national interest for you to pursue this work without the typical labor certification process..."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-xl">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Three-Prong Test</h2>
            <p className="text-slate-600">Address each requirement for the National Interest Waiver</p>
          </div>

          <div className="space-y-8">
            {prongs.map((prong, index) => (
              <div key={prong.key} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Label className="text-slate-900 font-semibold text-base">
                          {prong.title}
                        </Label>
                        <p className="text-sm text-slate-600 mt-1">{prong.description}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onRefine(prong.key, data[prong.key])}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 ml-4"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI Refine
                      </Button>
                    </div>
                    <Textarea
                      placeholder={prong.placeholder}
                      value={data[prong.key] || ""}
                      onChange={(e) => onChange({ ...data, [prong.key]: e.target.value })}
                      className="min-h-32 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {index < prongs.length - 1 && <div className="border-t border-slate-200 mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}