import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Link2, FileText, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Document } from "@/api/entities";
import { UploadFile } from "@/api/integrations";

export default function DocumentsStep({ caseId, documents, onDocumentsChange }) {
  const [uploadType, setUploadType] = useState("file");
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [docType, setDocType] = useState("research_paper");
  const [docTitle, setDocTitle] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      
      const newDoc = await Document.create({
        case_id: caseId,
        title: docTitle || file.name,
        type: docType,
        file_url: file_url,
        extraction_status: "completed"
      });

      onDocumentsChange([...documents, newDoc]);
      setDocTitle("");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setIsUploading(false);
  };

  const handleUrlSubmit = async () => {
    if (!urlInput) return;

    setIsUploading(true);
    try {
      const newDoc = await Document.create({
        case_id: caseId,
        title: docTitle || urlInput,
        type: "url",
        url_link: urlInput,
        extraction_status: "completed"
      });

      onDocumentsChange([...documents, newDoc]);
      setUrlInput("");
      setDocTitle("");
    } catch (error) {
      console.error("Error adding URL:", error);
    }
    setIsUploading(false);
  };

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (status === "failed") return <XCircle className="w-5 h-5 text-red-500" />;
    return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-slate-200 shadow-xl">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Supporting Documents</h2>
            <p className="text-slate-600">Upload research papers, letters, certificates, or add reference URLs</p>
          </div>

          <div className="space-y-5">
            <div className="flex gap-3">
              <Button
                type="button"
                variant={uploadType === "file" ? "default" : "outline"}
                onClick={() => setUploadType("file")}
                className={uploadType === "file" ? "bg-blue-600" : ""}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
              <Button
                type="button"
                variant={uploadType === "url" ? "default" : "outline"}
                onClick={() => setUploadType("url")}
                className={uploadType === "url" ? "bg-blue-600" : ""}
              >
                <Link2 className="w-4 h-4 mr-2" />
                Add URL
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Document Title</Label>
                <Input
                  placeholder="Enter document title"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="border-slate-300"
                />
              </div>
              <div className="space-y-2">
                <Label>Document Type</Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger className="border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research_paper">Research Paper</SelectItem>
                    <SelectItem value="letter">Letter of Recommendation</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="policy_document">Policy Document</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {uploadType === "file" ? (
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  disabled={isUploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-700 font-medium mb-1">
                    {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-slate-500">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Paste URL here (e.g., government policy page, research article)"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="border-slate-300"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={isUploading || !urlInput}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add URL"
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      {documents.length > 0 && (
        <Card className="border-slate-200 shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Uploaded Documents</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{doc.title}</p>
                      <p className="text-sm text-slate-500">{doc.type.replace(/_/g, " ")}</p>
                    </div>
                  </div>
                  {getStatusIcon(doc.extraction_status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}