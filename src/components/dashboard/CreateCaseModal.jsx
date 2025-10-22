import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CreateCaseModal({ open, onClose, onCreateCase }) {
  const [formData, setFormData] = useState({
    title: "",
    petitioner_name: "",
    petitioner_email: ""
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    await onCreateCase(formData);
    setIsCreating(false);
    setFormData({ title: "", petitioner_name: "", petitioner_email: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Create New Case</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700 font-medium">Case Title</Label>
            <Input
              id="title"
              placeholder="e.g., Dr. Jane Smith - AI Research"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-medium">Petitioner Name</Label>
            <Input
              id="name"
              placeholder="Full legal name"
              value={formData.petitioner_name}
              onChange={(e) => setFormData({ ...formData, petitioner_name: e.target.value })}
              required
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="petitioner@example.com"
              value={formData.petitioner_email}
              onChange={(e) => setFormData({ ...formData, petitioner_email: e.target.value })}
              required
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose} disabled={isCreating}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Case"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}