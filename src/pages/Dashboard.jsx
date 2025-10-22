import React, { useState, useEffect } from "react";
import { Case } from "@/api/entities";
import { CaseInput } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import CaseCard from "../components/dashboard/CaseCard";
import CreateCaseModal from "../components/dashboard/CreateCaseModal";

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setIsLoading(true);
    const data = await Case.list("-updated_date");
    setCases(data);
    setIsLoading(false);
  };

  const handleCreateCase = async (formData) => {
    const newCase = await Case.create({
      ...formData,
      status: "draft",
      completion_percentage: 0,
      current_step: "setup"
    });
    
    await CaseInput.create({
      case_id: newCase.id
    });

    setShowCreateModal(false);
    navigate(createPageUrl(`CaseWizard?caseId=${newCase.id}`));
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          caseItem.petitioner_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Your Cases</h1>
              <p className="text-slate-600">Manage and track your EB2-NIW petition cases</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Case
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search cases by title or petitioner name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cases Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-white rounded-xl animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <Plus className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">No cases found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your filters" 
                : "Get started by creating your first petition case"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Case
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        )}
      </div>

      <CreateCaseModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateCase={handleCreateCase}
      />
    </div>
  );
}