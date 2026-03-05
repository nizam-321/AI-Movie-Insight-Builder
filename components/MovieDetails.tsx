"use client";

import Image from "next/image";
import type { Movie } from "@/types/movie";
import { Star, Calendar, Users, MessageSquare, Sparkles, TrendingUp, TrendingDown, Minus, Film, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

interface Sentiment {
  sentiment: string;
  summary: string;
}

interface Review {
  author?: string;
  content: string;
}

interface Props {
  movie: Movie | null;
  sentiment: Sentiment;
  reviews: Review[];
}

const SentimentBadge = ({ sentiment }: { sentiment: string }) => {
  const s = sentiment.toLowerCase();
  if (s.includes("positive")) {
    return (
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-semibold">
        <TrendingUp size={16} />
        <span>Positive Reception</span>
      </div>
    );
  }
  if (s.includes("negative")) {
    return (
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-sm font-semibold">
        <TrendingDown size={16} />
        <span>Negative Reception</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-semibold">
      <Minus size={16} />
      <span>Mixed Reception</span>
    </div>
  );
};

export default function MovieDetails({ movie, sentiment, reviews }: Props) {
  if (!movie) return null;

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : null;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden  bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 backdrop-blur-2xl  p-6 sm:p-8 md:p-12 shadow-2xl"
      >
        {/* Background decoration */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 relative z-10 ">
          {/* Poster with hover effect */}
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -0.5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0 mx-auto lg:mx-0  overflow-hidden  transition-all"
          >
            {posterSrc ? (
              <Image
                src={posterSrc}
                alt={movie.Title}
                width={320}
                height={480}
                className="w-[240px] sm:w-[280px] md:w-[320px] aspect-[2/3] object-cover"
                priority
              />
            ) : (
              <div className="w-[240px] h-[360px] sm:w-[280px] sm:h-[420px] md:w-[320px] md:h-[480px] bg-slate-800 flex flex-col items-center justify-center text-slate-500 rounded-2xl">
                <Film size={48} />
                <span className="mt-4 text-center text-sm">No Poster Available</span>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <div className="flex flex-col flex-1 py-2 md:py-4">
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
              {sentiment && <SentimentBadge sentiment={sentiment.sentiment} />}
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs font-bold tracking-widest uppercase">
                {movie.Type || "Movie"} | {movie.Rated || "N/A"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent leading-tight">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-3 md:gap-y-4 mb-6 md:mb-8 text-slate-300">
              <div className="flex items-center gap-2.5">
                <Calendar size={18} className="text-blue-400" />
                <span className="font-medium text-base md:text-lg">{movie.Year}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-white text-base md:text-lg">{movie.imdbRating || "N/A"}</span>
                <span className="text-slate-500 text-xs md:text-sm">/ 10 {movie.imdbVotes ? `(${movie.imdbVotes})` : ""}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={18} className="text-green-400" />
                <span className="font-medium text-base md:text-lg">{movie.Runtime || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 md:mb-3">Plot Summary</h3>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  {movie.Plot || "No plot available."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1">
                    <Users size={14} />
                    Top Cast
                  </h3>
                  <p className="text-sm md:text-base text-slate-200">{movie.Actors || "N/A"}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1">
                    <Award size={14} />
                    Director
                  </h3>
                  <p className="text-sm md:text-base text-slate-200">{movie.Director || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
        {/* AI Analysis Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80 backdrop-blur-md border border-blue-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden group h-full">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/15 transition-all duration-700" />
            
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 relative z-10">
              <div className="p-2.5 md:p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles size={20} className="md:w-6 md:h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">AI Audience Insight</h2>
            </div>

            <div className="space-y-4 relative z-10">
              <p className="text-base md:text-xl text-slate-200 leading-relaxed font-light">
                {sentiment?.summary?.replace(/```json|```/g, "") || "No sentiment analysis available."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 space-y-4 md:space-y-6"
        >
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 md:gap-3">
              <MessageSquare size={20} className="text-slate-400 md:w-6 md:h-6" />
              <h2 className="text-xl md:text-2xl font-bold text-white">Audience Reviews</h2>
            </div>
            <span className="text-xs md:text-sm text-slate-500 font-medium">{reviews.length > 0 ? `${reviews.length} reviews` : "No reviews"}</span>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2 -mr-2 custom-scrollbar">
            {reviews.length > 0 ? (
              reviews.slice(0, 10).map((review: Review, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl p-4 md:p-5 hover:bg-slate-800/60 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs md:text-sm font-bold text-slate-400 uppercase ring-2 ring-slate-700">
                      {review.author?.charAt(0) || "A"}
                    </div>
                    <span className="font-semibold text-sm md:text-base text-slate-200">{review.author || "Anonymous"}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-xs md:text-sm line-clamp-3 group-hover:line-clamp-none transition-all">
                    {review.content}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 md:py-16 text-center bg-slate-900/50 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center">
                <MessageSquare size={28} className="text-slate-600 mb-3 md:mb-4 md:w-8 md:h-8"/>
                <p className="text-sm md:text-base text-slate-500 font-medium">No audience reviews found.</p>
                <p className="text-xs md:text-sm text-slate-600 mt-1">AI analysis requires reviews to generate insights.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
