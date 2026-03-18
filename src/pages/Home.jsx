import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Drafting",
    description:
      "Generate compelling petition letters and supporting documents with cutting-edge AI tailored for EB-2 NIW cases.",
  },
  {
    icon: Shield,
    title: "Prong Analysis",
    description:
      "Automatically evaluate your case against all three NIW prongs to identify strengths and gaps before filing.",
  },
  {
    icon: FileText,
    title: "Citation Management",
    description:
      "Organize and cite your published works, patents, and contributions in a format USCIS reviewers expect.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Get real-time suggestions to strengthen your narrative and maximize your approval chances.",
  },
  {
    icon: Users,
    title: "Collaborative Workspace",
    description:
      "Work seamlessly with your attorney or advisor inside a shared, version-controlled case dashboard.",
  },
  {
    icon: CheckCircle2,
    title: "Step-by-Step Wizard",
    description:
      "Follow a guided workflow through every section of your petition — nothing gets missed.",
  },
];

const steps = [
  { number: "01", title: "Create Your Case", description: "Enter your personal and professional background to get started." },
  { number: "02", title: "Build Your Evidence", description: "Upload publications, citations, and supporting documents." },
  { number: "03", title: "AI Drafts Your Petition", description: "Our AI crafts a persuasive petition letter tailored to your profile." },
  { number: "04", title: "Review & Submit", description: "Fine-tune the final draft and download it ready for filing." },
];

const navLinks = [
  { label: "Features", href: "/#features", id: "features", hashes: ["#features", "#feature"] },
  { label: "How It Works", href: "/#how-it-works", id: "how-it-works", hashes: ["#how-it-works"] },
  { label: "Pricing", href: "/#pricing", id: "pricing", hashes: ["#pricing"] },
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.toLowerCase();

    if (!hash) return;

    for (const link of navLinks) {
      if (!link.hashes.includes(hash)) continue;

      const section = document.getElementById(link.id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      break;
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
     
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered EB-2 NIW Petitions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Build Your NIW Petition{" "}
            <span className="text-blue-600">with Confidence</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            NIW Builder uses advanced AI to help professionals draft stronger
            EB-2 National Interest Waiver petitions — faster and smarter than
            ever before.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl("SignUp")}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all px-8"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Everything You Need to Win</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              A complete toolkit purpose-built for EB-2 NIW self-petitioners and their attorneys.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all bg-white"
              >
                <div className="w-11 h-11 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              From onboarding to a filing-ready petition in four straightforward steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white text-lg font-bold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-500/25">
                  {step.number}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600" id="pricing">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Build Your Petition?</h2>
          <p className="mt-4 text-blue-100 text-lg">
            Join thousands of professionals who have used NIW Builder to fast-track their immigration journey.
          </p>
          <Link to={createPageUrl("SignUp")} className="mt-8 inline-block">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-black/10 px-10 font-semibold"
            >
              Start for Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}




