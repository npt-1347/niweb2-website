import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Award, BookOpen } from "lucide-react";

export default function AchievementsStep({ data, onChange }) {
  const addAchievement = () => {
    const achievements = data.achievements || [];
    onChange({
      ...data,
      achievements: [...achievements, { title: "", description: "", date: "" }]
    });
  };

  const removeAchievement = (index) => {
    const achievements = [...(data.achievements || [])];
    achievements.splice(index, 1);
    onChange({ ...data, achievements });
  };

  const updateAchievement = (index, field, value) => {
    const achievements = [...(data.achievements || [])];
    achievements[index] = { ...achievements[index], [field]: value };
    onChange({ ...data, achievements });
  };

  const addPublication = () => {
    const publications = data.publications || [];
    onChange({
      ...data,
      publications: [...publications, { title: "", journal: "", year: "", citations: 0 }]
    });
  };

  const removePublication = (index) => {
    const publications = [...(data.publications || [])];
    publications.splice(index, 1);
    onChange({ ...data, publications });
  };

  const updatePublication = (index, field, value) => {
    const publications = [...(data.publications || [])];
    publications[index] = { ...publications[index], [field]: value };
    onChange({ ...data, publications });
  };

  return (
    <div className="space-y-6">
      {/* Achievements Section */}
      <Card className="border-slate-200 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Award className="w-7 h-7 text-blue-600" />
                Key Achievements
              </h2>
              <p className="text-slate-600">Awards, recognitions, and significant accomplishments</p>
            </div>
            <Button
              type="button"
              onClick={addAchievement}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </div>

          <div className="space-y-4">
            {(data.achievements || []).map((achievement, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <Input
                    placeholder="Achievement title"
                    value={achievement.title}
                    onChange={(e) => updateAchievement(index, "title", e.target.value)}
                    className="flex-1 bg-white border-slate-300"
                  />
                  <Input
                    type="date"
                    value={achievement.date}
                    onChange={(e) => updateAchievement(index, "date", e.target.value)}
                    className="w-40 bg-white border-slate-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Describe the achievement and its significance..."
                  value={achievement.description}
                  onChange={(e) => updateAchievement(index, "description", e.target.value)}
                  className="bg-white border-slate-300"
                />
              </div>
            ))}
            {(!data.achievements || data.achievements.length === 0) && (
              <p className="text-center text-slate-400 py-8">No achievements added yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Publications Section */}
      <Card className="border-slate-200 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <BookOpen className="w-7 h-7 text-blue-600" />
                Publications
              </h2>
              <p className="text-slate-600">Research papers, articles, and scholarly publications</p>
            </div>
            <Button
              type="button"
              onClick={addPublication}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Publication
            </Button>
          </div>

          <div className="space-y-4">
            {(data.publications || []).map((publication, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <Input
                    placeholder="Publication title"
                    value={publication.title}
                    onChange={(e) => updatePublication(index, "title", e.target.value)}
                    className="flex-1 bg-white border-slate-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePublication(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    placeholder="Journal/Conference"
                    value={publication.journal}
                    onChange={(e) => updatePublication(index, "journal", e.target.value)}
                    className="bg-white border-slate-300"
                  />
                  <Input
                    placeholder="Year"
                    value={publication.year}
                    onChange={(e) => updatePublication(index, "year", e.target.value)}
                    className="bg-white border-slate-300"
                  />
                  <Input
                    type="number"
                    placeholder="Citations"
                    value={publication.citations}
                    onChange={(e) => updatePublication(index, "citations", parseInt(e.target.value) || 0)}
                    className="bg-white border-slate-300"
                  />
                </div>
              </div>
            ))}
            {(!data.publications || data.publications.length === 0) && (
              <p className="text-center text-slate-400 py-8">No publications added yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}