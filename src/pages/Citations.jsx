import React, { useState, useEffect } from "react";
import { Citation } from "@/api/entities";
import { Case } from "@/api/entities";
import { Chapter } from "@/api/entities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertCircle, XCircle, Search, ExternalLink } from "lucide-react";

export default function Citations() {
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [citations, setCitations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  useEffect(() => {
    if (selectedCaseId) {
      loadCitations();
    }
  }, [selectedCaseId]);

  const loadCases = async () => {
    const data = await Case.list("-updated_date");
    setCases(data);
    if (data.length > 0) {
      setSelectedCaseId(data[0].id);
    }
    setIsLoading(false);
  };

  const loadCitations = async () => {
    const data = await Citation.filter({ case_id: selectedCaseId });
    setCitations(data);
  };

  const getStatusConfig = (status) => {
    const configs = {
      valid: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", label: "Valid" },
      needs_review: { icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50", label: "Needs Review" },
      broken: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", label: "Broken Link" },
      missing: { icon: XCircle, color: "text-slate-600", bg: "bg-slate-50", label: "Missing Source" }
    };
    return configs[status] || configs.needs_review;
  };

  const filteredCitations = citations.filter(citation => {
    const matchesSearch = citation.citation_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          citation.source_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || citation.validation_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: citations.length,
    valid: citations.filter(c => c.validation_status === "valid").length,
    needs_review: citations.filter(c => c.validation_status === "needs_review").length,
    broken: citations.filter(c => c.validation_status === "broken").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Citation Validator</h1>
          <p className="text-slate-600">Review and validate all references in your petition</p>
        </div>

        {/* Case Selector & Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-4 border-slate-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Select Case</label>
                  <Select value={selectedCaseId} onValueChange={setSelectedCaseId}>
                    <SelectTrigger className="bg-white border-slate-300">
                      <SelectValue placeholder="Choose a case" />
                    </SelectTrigger>
                    <SelectContent>
                      {cases.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 gap-4 flex-1">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                    <p className="text-sm text-slate-600">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-600">{stats.valid}</p>
                    <p className="text-sm text-slate-600">Valid</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-600">{stats.needs_review}</p>
                    <p className="text-sm text-slate-600">Review</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">{stats.broken}</p>
                    <p className="text-sm text-slate-600">Broken</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search citations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-300 bg-white"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48 border-slate-300 bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="valid">Valid</SelectItem>
              <SelectItem value="needs_review">Needs Review</SelectItem>
              <SelectItem value="broken">Broken</SelectItem>
              <SelectItem value="missing">Missing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Citations List */}
        {filteredCitations.length === 0 ? (
          <Card className="border-slate-200 shadow-xl">
            <CardContent className="p-20 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">No Citations Found</h3>
              <p className="text-slate-600">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your filters" 
                  : "Citations will appear here once you generate chapter drafts"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCitations.map((citation) => {
              const statusConfig = getStatusConfig(citation.validation_status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card key={citation.id} className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${statusConfig.bg} flex items-center justify-center flex-shrink-0`}>
                        <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 mb-1">{citation.source_title}</p>
                            <p className="text-sm text-slate-600 line-clamp-2">{citation.citation_text}</p>
                          </div>
                          <Badge className={`${statusConfig.bg} ${statusConfig.color} border-0 ml-4`}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                        {citation.source_url && (
                          <a
                            href={citation.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Source
                          </a>
                        )}
                        {citation.page_number && (
                          <span className="text-sm text-slate-500 ml-4">Page {citation.page_number}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}