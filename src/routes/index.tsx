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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Krishi <span className="text-emerald-600">Sahayak</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#solutions" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Solutions</a>
            <a href="#expert-support" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Expert Support</a>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <Button variant="ghost" className="text-slate-600 font-medium" asChild>
                <Link to="/signin">Login</Link>
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button variant="ghost" className="text-slate-600 font-medium mr-2" asChild>
                <Link to="/app">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-emerald-50/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-amber-50/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-bold animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              Powered by Advanced AI & Experts
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Empowering Farmers with <span className="text-emerald-600 italic">Intelligence.</span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
              Get instant, research-backed answers to your crop problems through AI, or connect with agricultural experts for personalized advice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-emerald-200 transition-all hover:scale-105" asChild>
                <Link to="/app" className="flex items-center gap-2">
                  Launch Assistant <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 border-slate-200 rounded-2xl text-lg font-bold text-slate-700 hover:bg-slate-50 transition-all" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </div>

          <div className="relative order-first md:order-last">
            <div className="relative z-10 w-full aspect-square bg-emerald-50 rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl skew-y-3 transform-gpu transition-transform hover:skew-y-0 duration-500 group">
              <img 
                src="/images/farmer1.jpg" 
                alt="Modern Farming" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 p-3 rounded-2xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 leading-none">100k+</div>
                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Queries Resolved</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Blob */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-emerald-200/20 rounded-[4rem] -z-10 rotate-6" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-y border-slate-100">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by institutions</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale transition-all hover:grayscale-0">
          <div className="text-2xl font-black text-slate-800 tracking-tighter italic">Dept. Agronomy</div>
          <div className="text-2xl font-black text-slate-800 tracking-tighter italic">State Agri Board</div>
          <div className="text-2xl font-black text-slate-800 tracking-tighter italic">Kisan Trust</div>
          <div className="text-2xl font-black text-slate-800 tracking-tighter italic">Tech-Agri Hub</div>
        </div>
      </div>

      {/* Two-Tier Core Features */}
      <section id="features" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Innovative Support Ecosystem</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            We bridge the gap between complex research and practical farming with our unique two-tiered approach.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* Tier 1 */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="size-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Tier 1: AI Instant Assistant</h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
              Powered by advanced Retrieval Augmented Generation (RAG). Get instant answers grounded in thousands of verified agricultural research papers and government documents.
            </p>
            <ul className="space-y-4 mb-10">
              {["Instant responses 24/7", "PDF-grounded research", "Local language support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                  <div className="size-6 bg-emerald-50 rounded-full flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-2 text-emerald-600 border-emerald-50 hover:bg-emerald-50 hover:border-emerald-100 font-bold text-lg">
              Learn More
            </Button>
          </div>

          {/* Tier 2 */}
          <div className="bg-emerald-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            
            <div className="size-16 bg-white rounded-2xl flex items-center justify-center text-emerald-900 mb-8 shadow-lg group-hover:scale-110 transition-transform relative z-10">
              <Users className="w-8 h-8 fill-emerald-900" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tight relative z-10">Tier 2: Human Expert Support</h3>
            <p className="text-emerald-100/90 text-lg mb-8 leading-relaxed font-medium relative z-10">
              When the AI isn't enough, seamlessly escalate your query to certified Agricultural Officers. They review the full context and provide human-verified solutions.
            </p>
            <ul className="space-y-4 mb-10 relative z-10">
              {["Full context escalation", "Direct expert feedback", "Official verified solutions"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-emerald-50 font-bold">
                  <div className="size-6 bg-emerald-800 rounded-full flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-lg relative z-10 shadow-lg shadow-emerald-950/20">
              Register as Officer
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Ingestion Showcase */}
      <section id="solutions" className="py-24 overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Deciphering Technical Knowledge.
            </h2>
            <div className="space-y-8">
              {[
                { 
                  title: "Semantic Vector Search", 
                  desc: "We don't just match keywords. We understand the biology and science behind your query.", 
                  icon: <Search className="w-6 h-6" />,
                  color: "bg-blue-100 text-blue-600"
                },
                { 
                  title: "Expert Knowledge Ingestion", 
                  desc: "Our automated pipeline turns technical government PDFs into actionable advice.", 
                  icon: <FileText className="w-6 h-6" />,
                  color: "bg-purple-100 text-purple-600"
                },
                { 
                  title: "Shielded against Hallucinations", 
                  desc: "Every AI response is strictly grounded in the source documentation.", 
                  icon: <ShieldCheck className="w-6 h-6" />,
                  color: "bg-emerald-100 text-emerald-600"
                }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`mt-1 size-12 shrink-0 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl border-4 border-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <Search className="text-emerald-400 size-5" />
                    <span className="text-emerald-50/50 text-sm font-medium">Search wheat leaf rust treatments...</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-8 bg-emerald-600 rounded-full shrink-0" />
                    <div className="space-y-2 flex-1 pt-1">
                      <div className="h-4 bg-white/20 rounded-full w-full" />
                      <div className="h-4 bg-white/20 rounded-full w-3/4" />
                      <div className="h-4 bg-emerald-500/40 rounded-full w-1/2" />
                    </div>
                  </div>
                  <div className="p-6 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl">
                    <p className="text-emerald-50 text-sm font-medium leading-relaxed italic">
                      "Based on the 2024 Aronomy Report, early application of Neem-based surfactants is recommended for leaf rust in early stages..."
                    </p>
                  </div>
                </div>
             </div>
             {/* Decorative Background circles */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[120%] bg-emerald-50/50 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-24 pb-48">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 leading-tight">Ready to boost your harvest?</h2>
          <p className="text-emerald-100 text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10 opacity-90">
            Join thousands of modern farmers who are using AI to protect and optimize their crops. Instant, intelligent, and human-verified.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button size="lg" className="h-16 px-10 bg-white text-emerald-900 hover:bg-emerald-50 rounded-2xl text-xl font-black shadow-xl" asChild>
              <Link to="/signup">Start Chatting Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 border-white/30 text-white hover:bg-white/10 rounded-2xl text-xl font-black" asChild>
              <Link to="/signin" className="flex items-center gap-2">
                <MessageCircle className="size-6" /> Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 lg:gap-24 mb-20">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">
                Krishi <span className="text-emerald-600">Sahayak</span>
              </span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
              Advanced AI agricultural advisor designed to provide expert-level plant science knowledge to every farmer on the planet.
            </p>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Resources</h5>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Research Papers</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Legal</h5>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Cookie Settings</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 font-bold text-sm">© 2026 Krishi Sahayak v2. All rights reserved.</p>
          <div className="flex gap-6 text-slate-300 font-black tracking-tighter italic">
            <span>Powered by Gemini 1.5 Pro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
