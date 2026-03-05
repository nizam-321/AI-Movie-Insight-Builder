# 🎬 AI Movie Insight Builder

A premium, AI-powered movie analysis platform that provides instant sentiment analysis and comprehensive movie insights. Built with Next.js 15, TypeScript, and Google Gemini AI.

![AI Movie Insight Builder](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎯 **Instant Movie Analysis** - Enter any IMDb ID and get comprehensive movie details
- 🤖 **AI-Powered Sentiment Analysis** - Google Gemini analyzes audience reviews for sentiment insights
- 📊 **Audience Reviews** - Aggregated reviews from TMDB with smart filtering
- 🎨 **Premium UI/UX** - Netflix/IMDb-inspired design with smooth animations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Lightning Fast** - Built with Next.js 15 App Router and Server Components
- 🔒 **Type Safe** - Full TypeScript implementation for reliability

## Tech Stack

- **Framework**: Next.js 15.1.6
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Google Generative AI (Gemini)
- **HTTP Client**: Axios
- **Language**: TypeScript

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- API keys for:
  - OMDB API (get from [omdbapi.com](https://www.omdbapi.com/apikey.aspx))
  - TMDB API (get from [themoviedb.org](https://www.themoviedb.org/settings/api))
  - Google Gemini API (get from [ai.google.dev](https://ai.google.dev/))

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-movie-insight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   OMDB_API_KEY=your_omdb_api_key_here
   TMDB_API_KEY=your_tmdb_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Enter an IMDb ID** on the home page (e.g., `tt0133093` for The Matrix)
2. **Click "Analyze Movie"** to navigate to the movie detail page
3. **View comprehensive insights** including:
   - Movie poster, title, and metadata
   - IMDb rating and votes
   - Plot summary
   - Cast and director information
   - AI-generated sentiment analysis
   - Audience reviews from TMDB

## 🏗️ Project Structure

```
ai-movie-insight/
├── app/
│   ├── movie/
│   │   └── [id]/
│   │       ├── page.tsx          # Movie detail page
│   │       ├── loading.tsx       # Loading state
│   │       └── error.tsx         # Error boundary
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── MovieSearch.tsx           # Search component
│   └── MovieDetails.tsx          # Movie details display
├── lib/
│   ├── omdb.ts                   # OMDb API integration
│   ├── reviews.ts                # TMDB API integration
│   └── ai.ts                     # Google Gemini AI integration
├── types/
│   └── movie.ts                  # TypeScript type definitions
└── public/
    └── favicon.ico               # App favicon
```

## API Integrations

### OMDB API
- Fetches movie metadata (title, year, plot, ratings, etc.)
- Endpoint: `https://www.omdbapi.com/`

### TMDB API
- Retrieves audience reviews for movies
- Endpoint: `https://api.themoviedb.org/3/`

### Google Gemini AI
- Analyzes sentiment from reviews
- Provides summary of audience opinion
- Model: `gemini-1.5-flash`

## Key Features Explained

### Sentiment Analysis
The app uses Google's Gemini AI to analyze audience reviews and determine:
- Overall sentiment (Positive, Mixed, or Negative)
- A 2-3 sentence summary of audience opinion

### Error Handling
- Comprehensive error handling for API failures
- User-friendly error messages
- Graceful fallbacks when data is unavailable

### Type Safety
- Full TypeScript implementation
- Strict type checking for all components and functions
- Proper interface definitions for all data structures

## Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Troubleshooting

### API Key Issues
- Ensure all API keys are correctly set in `.env.local`
- Verify API keys are valid and have not expired
- Check API rate limits

### TypeScript Errors
- Run `npm install` to ensure all dependencies are installed
- Check that `@types/node`, `@types/react`, and `@types/react-dom` are installed

### Build Errors
- Clear the `.next` folder: `rm -rf .next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## 🎨 Design Philosophy

The UI is inspired by industry leaders:

- **Netflix** - Dark theme, card-based layouts, smooth transitions
- **IMDb** - Information hierarchy, rating displays, metadata organization
- **Modern Web** - Glassmorphism, gradient accents, micro-interactions

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Add environment variables**
   - Add all three API keys in Vercel project settings

4. **Deploy**
   - Vercel will automatically build and deploy your app

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OMDB_API_KEY` | OMDb API key for movie metadata | Yes |
| `TMDB_API_KEY` | TMDB API key for reviews | Yes |
| `GEMINI_API_KEY` | Google Gemini API key for AI analysis | Yes |

## 🐛 Error Handling

The app includes comprehensive error handling:

- **Invalid IMDb ID** - Client-side validation with helpful messages
- **Movie Not Found** - Graceful error page with navigation
- **API Failures** - Fallback messages and retry options
- **Network Issues** - Timeout handling and user feedback
- **AI Analysis Errors** - Graceful degradation with fallback messages

## 🎯 Performance Optimizations

- Server-side rendering for instant page loads
- Image optimization with Next.js Image component
- API response caching (1 hour TTL)
- Lazy loading for reviews
- Optimized bundle size with tree shaking

## 📱 Responsive Design

Fully responsive breakpoints:
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for movie metadata
- [TMDB](https://www.themoviedb.org/) for audience reviews
- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI analysis
- [Vercel](https://vercel.com) for hosting platform

---

**Built with ❤️ for the Brew Hiring Assignment**
