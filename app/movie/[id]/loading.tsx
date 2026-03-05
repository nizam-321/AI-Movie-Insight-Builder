import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 animate-pulse">
          <Loader2 size={40} className="text-blue-400 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Loading Movie Details</h2>
        <p className="text-slate-400">Fetching data and analyzing reviews...</p>
      </div>
    </div>
  );
}
