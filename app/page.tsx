//path: app/page.tsx
import MovieSearch from "@/components/MovieSearch"

export default function Home() {

  return (

    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">

      <h1 className="text-4xl font-bold mb-6">
        AI Movie Insight Builder
      </h1>

      <MovieSearch/>

    </main>

  )

}