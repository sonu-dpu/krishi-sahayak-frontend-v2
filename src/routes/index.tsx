import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  FileText,
  Sprout,
  ShieldCheck,
  Zap,
  Users,
  ChevronRight,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/")({
  component: MainPage,
});

function MainPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100/60 bg-white/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer transition-transform duration-300 hover:scale-105">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200 group-hover:bg-emerald-500 transition-colors">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-slate-900">
              Krishi <span className="text-emerald-600">Sahayak</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Features", "Solutions", "Expert Support"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-all hover:translate-y-[-1px]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <Button
                variant="ghost"
                className="text-slate-500 font-medium hover:text-emerald-600"
                asChild
              >
                <Link to="/signin">Login</Link>
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-7 shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 font-semibold"
                asChild
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                variant="ghost"
                className="text-slate-500 font-medium mr-2 hover:text-emerald-600"
                asChild
              >
                <Link to="/app">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-emerald-50/40 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-amber-50/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-semibold tracking-wide">
              <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              Intelligence at the speed of thought
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.15] tracking-tight">
              Empowering farmers with{" "}
              <span className="text-emerald-600 relative inline-block">
                Intelligence
                <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-emerald-100/60 -z-10 rotate-1 rounded-full" />
              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-normal">
              Get instant, research-backed answers to your crop problems through
              advanced AI, or connect with certified agricultural officers for
              personalized support.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button
                size="lg"
                className="h-16 px-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg font-semibold shadow-xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95 group"
                asChild
              >
                <Link to="/app" className="flex items-center gap-2">
                  Launch Assistant{" "}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 border-slate-200 rounded-2xl text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                asChild
              >
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </div>

          <div className="relative order-first lg:order-last animate-in fade-in zoom-in duration-1000">
            <div className="relative z-10 w-full aspect-square bg-emerald-50 rounded-[3.5rem] overflow-hidden border-4 border-white shadow-2xl skew-y-1 transform-gpu transition-all hover:skew-y-0 duration-700 group">
              <img
                src="/images/farmer1.jpg"
                alt="Modern Farming"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-transparent" />

              {/* Floating Stat Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-xl p-7 rounded-[2rem] border border-white/40 shadow-2xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-5">
                  <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-100">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900 leading-none">
                      124k+
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">
                      Queries Resolved
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Decor */}
            <div className="absolute -top-12 -right-12 size-full bg-emerald-100/30 rounded-[3.5rem] -z-10 rotate-6 blur-sm" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-y border-slate-100/80">
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">
          Trusted by leading institutions
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          {[
            "Dept. Agronomy",
            "State Agri Board",
            "Kisan Trust",
            "Tech-Agri Hub",
          ].map((trustee) => (
            <div
              key={trustee}
              className="text-xl font-bold text-slate-800 tracking-tight italic"
            >
              {trustee}
            </div>
          ))}
        </div>
      </div>

      {/* Two-Tier Core Features */}
      <section id="features" className="py-32 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-6 text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Comprehensive Support Ecosystem
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed">
            We bridge the gap between complex research and practical farming
            with our unique two-tiered approach.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Tier 1 */}
          <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="size-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-10 shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-5 tracking-tight">
              AI Instant Assistant
            </h3>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-normal">
              Powered by advanced RAG. Get instant answers grounded in thousands
              of verified research papers and government documents.
            </p>
            <ul className="space-y-5 mb-12">
              {[
                "Instant responses 24/7",
                "PDF-grounded research",
                "Local language support",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-slate-600 font-medium"
                >
                  <div className="size-6 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="w-full h-16 rounded-2xl border-2 text-emerald-600 border-emerald-50 hover:bg-emerald-50 hover:border-emerald-100 font-semibold text-lg transition-all"
            >
              Explore Tier 1
            </Button>
          </div>

          {/* Tier 2 */}
          <div className="bg-emerald-950 p-12 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group border border-emerald-800/20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 group-hover:scale-110" />

            <div className="size-16 bg-white rounded-2xl flex items-center justify-center text-emerald-900 mb-10 shadow-lg group-hover:scale-110 transition-transform relative z-10">
              <Users className="w-8 h-8 fill-emerald-900" />
            </div>
            <h3 className="text-3xl font-bold mb-5 tracking-tight relative z-10">
              Expert Human Support
            </h3>
            <p className="text-emerald-100/70 text-lg mb-10 leading-relaxed font-light relative z-10">
              When complexity requires a human touch, escalate to certified
              Agricultural Officers who provide context-rich verified solutions.
            </p>
            <ul className="space-y-5 mb-12 relative z-10">
              {[
                "Full context escalation",
                "Direct expert feedback",
                "Official verified solutions",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-emerald-50/80 font-medium"
                >
                  <div className="size-6 bg-emerald-800/60 rounded-full flex items-center justify-center border border-emerald-700/50">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="w-full h-16 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-lg relative z-10 shadow-xl transition-all">
              Join as Officer
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Ingestion Showcase */}
      <section
        id="solutions"
        className="py-32 overflow-hidden border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Deciphering Technical Knowledge at Scale.
            </h2>
            <div className="space-y-10">
              {[
                {
                  title: "Semantic Vector Search",
                  desc: "We understand the biology and science behind your query, not just keywords.",
                  icon: <Search className="w-6 h-6" />,
                  color: "bg-blue-50 text-blue-600 border-blue-100",
                },
                {
                  title: "Technical Knowledge Ingestion",
                  desc: "Our automated pipeline turns complex government PDFs into actionable advice.",
                  icon: <FileText className="w-6 h-6" />,
                  color: "bg-purple-50 text-purple-600 border-purple-100",
                },
                {
                  title: "Grounded & Verified",
                  desc: "Every AI response is strictly anchored in your source documentation.",
                  icon: <ShieldCheck className="w-6 h-6" />,
                  color: "bg-emerald-50 text-emerald-600 border-emerald-100",
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-8 group">
                  <div
                    className={`mt-1 size-14 shrink-0 ${feature.color} border rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 font-normal leading-relaxed text-base">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="bg-slate-950 p-10 rounded-[4rem] shadow-3xl border border-white/10 relative z-10 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-50" />
               <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                  <Search className="text-emerald-400 size-5" />
                  <span className="text-emerald-50/40 text-sm font-light">Treatment for wheat rust...</span>
                </div>
                <div className="flex gap-5">
                  <div className="size-10 bg-emerald-600 rounded-full shrink-0 shadow-lg shadow-emerald-500/30" />
                  <div className="space-y-3 flex-1 pt-1.5">
                    <div className="h-3 bg-white/10 rounded-full w-full" />
                    <div className="h-3 bg-white/10 rounded-full w-[85%]" />
                    <div className="h-3 bg-emerald-400/20 rounded-full w-[60%]" />
                  </div>
                </div>
                <div className="p-8 bg-emerald-600/10 border border-emerald-500/20 rounded-3xl backdrop-blur-2xl">
                  <p className="text-emerald-50/90 text-[15px] font-light leading-relaxed italic">
                    "Based on the Aronomy Technical Bulletin #24, Neem-based surfactants are recommended for fungal rust in tropical zones..."
                  </p>
                </div>
              </div>
            </div>
            {/* Ambient Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[140%] bg-emerald-100/40 rounded-full blur-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-32 pb-64">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-emerald-700" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900 via-emerald-700 to-emerald-500 opacity-90" />
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.15] max-w-4xl mx-auto">
              Ready to cultivate more intelligent harvests?
            </h2>
            <p className="text-emerald-50/80 text-xl font-normal max-w-2xl mx-auto leading-relaxed">
              Join thousands of modern farmers using AI to protect and optimize their crops. Instant, research-backed, and human-verified.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                size="lg"
                className="h-20 px-12 bg-white text-emerald-900 hover:bg-emerald-50 rounded-3xl text-xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-20 px-12 border-white/20 text-white hover:bg-white/10 rounded-3xl text-xl font-bold backdrop-blur-lg"
                asChild
              >
                <Link to="/signin" className="flex items-center gap-3">
                  <MessageCircle className="size-6" /> Contact Sales
                </Link>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-white pt-32 pb-16 border-t border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 lg:gap-32 mb-24">
          <div className="col-span-2 space-y-10">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-2xl tracking-tight text-slate-900">
                Krishi <span className="text-emerald-600">Sahayak</span>
              </span>
            </div>
            <p className="text-slate-400 font-normal leading-relaxed text-base max-w-sm">
              Advanced AI agricultural advisor designed to provide expert-level
              plant science knowledge to every farmer at anytime, anywhere.
            </p>
          </div>
          <div className="space-y-8">
            <h5 className="font-bold text-slate-900 uppercase tracking-[0.2em] text-[10px]">
              Company
            </h5>
            <ul className="space-y-5 font-normal text-slate-400">
              {["About Us", "Our Science", "Research"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <h5 className="font-bold text-slate-900 uppercase tracking-[0.2em] text-[10px]">
              Legal
            </h5>
            <ul className="space-y-5 font-normal text-slate-400">
              {["Privacy Policy", "Terms of Use", "Data Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-slate-100/60 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-slate-400 font-medium text-sm">
            © 2026 Krishi Sahayak v2. Empowering global agriculture.
          </p>
          <div className="flex gap-8 text-[12px] text-slate-300 font-semibold tracking-wide items-center">
            <span>Powered by Gemini 1.5 Pro</span>
            <div className="size-1.5 bg-slate-100 rounded-full" />
            <span>Secure Enterprise AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
