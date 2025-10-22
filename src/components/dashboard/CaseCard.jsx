import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const statusConfig = {
  draft: { color: "bg-slate-100 text-slate-700 border-slate-200", label: "Draft" },
  in_progress: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "In Progress" },
  review: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Review" },
  completed: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Completed" }
};

export default function CaseCard({ caseItem }) {
  const statusInfo = statusConfig[caseItem.status] || statusConfig.draft;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-blue-300 bg-white overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: `${caseItem.completion_percentage}%` }} />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-lg mb-1 truncate group-hover:text-blue-700 transition-colors">
                {caseItem.title}
              </h3>
              <p className="text-sm text-slate-500 truncate">{caseItem.petitioner_name}</p>
            </div>
          </div>
          <Badge className={`${statusInfo.color} border font-medium`}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>Updated {format(new Date(caseItem.updated_date), "MMM d, yyyy")}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-semibold text-slate-900">{caseItem.completion_percentage}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${caseItem.completion_percentage}%` }}
            />
          </div>
        </div>

        <Link to={createPageUrl(`CaseWizard?caseId=${caseItem.id}`)} className="block">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300">
            Continue Working
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}