// path: app/page.tsx

import MovieSearch from "@/components/MovieSearch";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center pt-24 md:pt-32 pb-24 px-4 md:px-6">
        <div className="max-w-4xl w-full text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs md:text-sm font-medium animate-fade-in">
            <Sparkles size={14} className="hidden md:block" />
            <span>Next-Gen Movie Analysis</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            AI Movie Insight Builder
          </h1>

          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Harness the power of AI to analyze thousands of audience reviews. Get instant sentiment reports and detailed movie metadata in seconds.
          </p>

          <div className="w-full pt-6 md:pt-8">
            <MovieSearch />
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="absolute bottom-0 w-full text-center text-slate-600 text-xs md:text-sm py-6 border-t border-white/5">
        &copy; {new Date().getFullYear()} AI Movie Insight Builder. All rights reserved.
      </footer>
    </main>
  );
}
