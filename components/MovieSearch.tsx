"use client";

import { useState } from "react";
import { Search, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMovieInsight } from "@/app/actions/movieActions";
import MovieDetails from "@/components/MovieDetails";
import type { MovieInsight } from "@/types/movie";

export default function MovieSearch() {
  const [movieId, setMovieId] = useState<string>("");
  const [data, setData] = useState<MovieInsight | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (): boolean => {
    const trimmedId = movieId.trim();
    
    if (!trimmedId) {
      setError("Please enter an IMDb ID.");
      return false;
    }
    
    if (!trimmedId.startsWith("tt")) {
      setError("IMDb IDs usually start with 'tt' (e.g., tt0133093)");
      return false;
    }
    
    if (trimmedId.length < 4) {
      setError("IMDb ID seems too short. Please check and try again.");
      return false;
    }
    
    return true;
  };

  const fetchMovieData = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    setData(null);

    try {
      const res = await getMovieInsight(movieId.trim());
      
      if (!res.success) {
        setError(res.error || "Failed to fetch movie details.");
      } else if (res.data) {
        setData(res.data);
      } else {
        setError("No data received from server.");
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setError(
        error.message || "An unexpected error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent): Promise<void> => {
    e?.preventDefault();
    
    if (validateInput()) {
      await fetchMovieData();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMovieId(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl mb-12"
      >
        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter IMDb ID (e.g. tt0133093)"
              value={movieId}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="IMDb ID input"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !movieId.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
            aria-label="Get AI Insights"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Analyzing Movie...</span>
              </>
            ) : (
              "Get AI Insights"
            )}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
              role="alert"
            >
              <Info size={16} className="flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Movie Result Section */}
      <AnimatePresence mode="wait">
        {data && data.movie && (
          <motion.div
            key={data.movie.imdbID}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full"
          >
            <MovieDetails 
              movie={data.movie} 
              sentiment={data.sentiment} 
              reviews={data.reviews} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
