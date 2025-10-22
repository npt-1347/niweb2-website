import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function EndeavorStep({ data, onChange, onRefine }) {
  return (
    <Card className="border-slate-200 shadow-xl">
      <CardContent className="p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Proposed Endeavor</h2>
          <p className="text-slate-600">Describe the work you intend to pursue in the United States</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="endeavor_field" className="text-slate-700 font-medium">
              Field of Endeavor
            </Label>
            <Input
              id="endeavor_field"
              placeholder="e.g., Artificial Intelligence, Renewable Energy, Biotechnology"
              value={data.endeavor_field || ""}
              onChange={(e) => onChange({ ...data, endeavor_field: e.target.value })}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="proposed_endeavor" className="text-slate-700 font-medium">
                Detailed Description
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRefine("proposed_endeavor", data.proposed_endeavor)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Refine
              </Button>
            </div>
            <Textarea
              id="proposed_endeavor"
              placeholder="Describe your proposed work, its objectives, methodology, and expected outcomes. Be specific about what you plan to accomplish..."
              value={data.proposed_endeavor || ""}
              onChange={(e) => onChange({ ...data, proposed_endeavor: e.target.value })}
              className="min-h-48 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-500">
              Tip: Include specific goals, timelines, and the potential impact of your work
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}