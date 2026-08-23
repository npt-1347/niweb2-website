import { useState } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const calculateResumeScore = (file) => {
	const sizeInKb = Math.max(1, Math.round(file.size / 1024));
	const nameLengthScore = Math.min(20, file.name.length);
	const sizeScore = Math.min(60, Math.round(sizeInKb / 5));
	const extensionBonus = /\.(pdf|doc|docx)$/i.test(file.name) ? 20 : 10;

	return Math.min(100, nameLengthScore + sizeScore + extensionBonus);
};

export default function ScoreMyCase() {
	const [resumeName, setResumeName] = useState("");
	const [score, setScore] = useState(null);

	const handleResumeUpload = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setResumeName(file.name);
		setScore(calculateResumeScore(file));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-10 mt-16">
			<div className="max-w-4xl mx-auto space-y-8">
				<section className="text-center pt-6 pb-4">
					<div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
						<Sparkles className="w-3.5 h-3.5" />
						Resume Evaluation
					</div>
					<h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
						Score My Case
					</h1>
					<p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
						Upload your resume and instantly get a numeric readiness score for
						your NIW case profile.
					</p>
				</section>

				<Card className="border-slate-200 shadow-sm">
					<CardHeader>
						<CardTitle className="text-slate-900">Upload Resume</CardTitle>
					</CardHeader>
					<CardContent>
						<label
							htmlFor="resume-upload"
							className="block border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors rounded-2xl p-8 text-center cursor-pointer bg-white"
						>
							<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
								<Upload className="w-6 h-6 text-blue-600" />
							</div>
							<p className="text-slate-900 font-medium">Click to upload your resume</p>
							<p className="text-sm text-slate-500 mt-1">PDF, DOC, DOCX supported</p>
							<input
								id="resume-upload"
								type="file"
								accept=".pdf,.doc,.docx"
								className="hidden"
								onChange={handleResumeUpload}
							/>
						</label>

						{resumeName && (
							<div className="mt-4 flex items-center gap-2 text-sm text-slate-700 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
								<FileText className="w-4 h-4 text-blue-600" />
								<span className="truncate">{resumeName}</span>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="border-slate-200 shadow-sm">
					<CardHeader>
						<CardTitle className="text-slate-900">Numeric Score</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
							<p className="text-sm text-slate-500 mb-2">Your Score</p>
							<p className="text-5xl font-bold text-blue-600 leading-none">
								{score ?? "--"}
							</p>
							<p className="text-sm text-slate-500 mt-3">out of 100</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
