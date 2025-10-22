import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function PersonalInfoStep({ data, onChange }) {
  return (
    <Card className="border-slate-200 shadow-xl">
      <CardContent className="p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Information</h2>
          <p className="text-slate-600">Tell us about your background and qualifications</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="education" className="text-slate-700 font-medium">
              Education & Degrees
            </Label>
            <Textarea
              id="education"
              placeholder="List your degrees, institutions, and years (e.g., Ph.D. in Computer Science, MIT, 2020)"
              value={data.education || ""}
              onChange={(e) => onChange({ ...data, education: e.target.value })}
              className="min-h-24 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_position" className="text-slate-700 font-medium">
              Current Position & Organization
            </Label>
            <Input
              id="current_position"
              placeholder="e.g., Senior Research Scientist at Google AI"
              value={data.current_position || ""}
              onChange={(e) => onChange({ ...data, current_position: e.target.value })}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personal_background" className="text-slate-700 font-medium">
              Professional Background
            </Label>
            <Textarea
              id="personal_background"
              placeholder="Describe your career trajectory, key experiences, and expertise areas..."
              value={data.personal_background || ""}
              onChange={(e) => onChange({ ...data, personal_background: e.target.value })}
              className="min-h-32 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}