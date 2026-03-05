import MovieSearch from "@/components/MovieSearch";
import { Sparkles, Film } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center pt-16 sm:pt-24 md:pt-32 pb-24 px-4 md:px-6">
        <div className="max-w-4xl w-full text-center space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs md:text-sm font-medium animate-fade-in">
            <Sparkles size={14} className="hidden sm:block" />
            <span>Next-Gen Movie Analysis</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent px-4">
            AI Movie Insight Builder
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Harness the power of AI to analyze thousands of audience reviews. Get instant sentiment reports and detailed movie metadata in seconds.
          </p>

          {/* Search Component */}
          <div className="w-full pt-6 md:pt-8">
            <MovieSearch />
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-8 md:pt-12 px-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-xs md:text-sm">
              <Film size={14} />
              <span>OMDb Integration</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-xs md:text-sm">
              <Sparkles size={14} />
              <span>Google Gemini AI</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-xs md:text-sm">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>TMDB Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center text-slate-600 text-xs md:text-sm py-6 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} AI Movie Insight Builder. All rights reserved.</p>
      </footer>
    </main>
  );
}
