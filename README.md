# AI Movie Insight Builder

A Next.js application that provides AI-powered movie analysis using sentiment analysis of audience reviews. Get instant insights about movies by entering their IMDb ID.

## Features

- 🎬 **Movie Information**: Fetch detailed movie data from OMDB API
- 📊 **Sentiment Analysis**: AI-powered analysis of audience reviews using Google Gemini
- 💬 **Review Aggregation**: Collect and display reviews from TMDB
- 🎨 **Modern UI**: Beautiful, responsive interface with Framer Motion animations
- ⚡ **Fast Performance**: Built with Next.js 15 and React 19

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

## Usage

1. Enter an IMDb ID (e.g., `tt0133093` for The Matrix)
2. Click "Get AI Insights"
3. View the movie details, AI sentiment analysis, and audience reviews

## Project Structure

```
ai-movie-insight/
├── app/
│   ├── actions/
│   │   └── movieActions.ts      # Server actions for movie data
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic movie page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── MovieDetails.tsx          # Movie details component
│   └── MovieSearch.tsx           # Search component
├── lib/
│   ├── ai.ts                     # AI sentiment analysis
│   ├── omdb.ts                   # OMDB API integration
│   └── reviews.ts                # TMDB reviews integration
├── types/
│   └── movie.ts                  # TypeScript type definitions
├── .env.local                    # Environment variables (not in git)
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript configuration
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

## Acknowledgments

- OMDB API for movie data
- TMDB for review data
- Google Gemini for AI capabilities
- Next.js team for the amazing framework
