import { Briefcase, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: `${import.meta.env.BASE_URL}#features` },
      { label: "How It Works", href: `${import.meta.env.BASE_URL}#how-it-works` },
      { label: "Pricing", href: `${import.meta.env.BASE_URL}#pricing` },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Contact Us Banner */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
              <p className="text-blue-100 mt-1 text-sm">
                Have questions about NIW petitions? Our team is here to help.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a
                href="mailto:support@niwbuilder.ai"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2.5 rounded-xl"
              >
                <Mail className="w-4 h-4 shrink-0" />
                support@niwbuilder.ai
              </a>
              <a
                href="tel:+18005550199"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2.5 rounded-xl"
              >
                <Phone className="w-4 h-4 shrink-0" />
                +1 (800) 555-0199
              </a>
              <span className="flex items-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-xl">
                <MapPin className="w-4 h-4 shrink-0" />
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/30">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                NIW <span className="text-blue-400">Builder</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered EB-2 NIW petition platform that helps professionals
              build stronger, faster immigration cases.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} NIW Builder AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
