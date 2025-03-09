# Movie App

A React Native mobile application for browsing and searching movies using TMDB API and Appwrite backend. The app features a modern UI with a focus on user experience and performance.

## Features

- 🎬 Browse latest and popular movies
- 🔍 Real-time movie search with debouncing
- 💾 Save favorite movies for later viewing
- 📈 Track trending searches automatically
- 🎯 Detailed movie information including ratings, release dates, and more
- 📱 Responsive grid layout with smooth transitions
- 🌙 Dark theme with custom gradients
- 💫 Modern tab-based navigation

## Tech Stack

- **Framework**: React Native with Expo Router
- **Styling**: NativeWind (TailwindCSS)
- **State Management**: React Hooks
- **Backend**: Appwrite Cloud
- **API**: TMDB (The Movie Database)
- **Language**: TypeScript
- **UI Components**: Custom components with native elements

## Project Structure

```
app/                    # Main application code
├── (tabs)/            # Tab-based screens (Home, Search, Save, Profile)
│   ├── index.tsx      # Home screen with latest and trending movies
│   ├── search.tsx     # Search functionality with real-time results
│   ├── save.tsx       # Saved movies management
│   └── profile.tsx    # User profile screen
├── movie/             # Movie detail screens
│   └── [id].tsx       # Dynamic movie detail page
components/            # Reusable UI components
├── MovieCard.tsx      # Movie display card for grid view
├── SavedMovieCard.tsx # Card for saved movies
├── SearchBar.tsx      # Custom search input component
└── TrendingCard.tsx   # Trending movies display card
services/             # API and backend services
├── api.ts           # TMDB API integration
├── appwrite.ts      # Appwrite backend services
└── useFetch.ts      # Custom hook for data fetching
```

## Key Features Implementation

### Home Screen (`index.tsx`)
- Displays latest movies in a grid layout
- Shows trending movies based on search activity
- Quick access to search functionality

### Search Screen (`search.tsx`)
- Real-time search with 500ms debounce
- Auto-updating trending movies based on search activity
- Grid layout for search results
- Loading states and error handling

### Movie Details (`movie/[id].tsx`)
- Comprehensive movie information
- Save/unsave functionality
- Dynamic loading of movie details
- Production information display

### Save Feature (`save.tsx`)
- Local storage of favorite movies
- Grid view of saved movies
- Quick access to movie details

## Environment Variables

Required environment variables in `.env`:

```env
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required environment variables
4. Start the development server:
   ```bash
   npm start
   ```

## Appwrite Setup

The application uses Appwrite for:
- Storing user's saved movies
- Tracking trending searches
- Managing movie metadata

Required Appwrite collection structure:
- `searchTerm`: String (search query or saved movie identifier)
- `movie_id`: Number (TMDB movie ID)
- `title`: String (movie title)
- `count`: Number (search frequency)
- `poster_url`: String (movie poster URL)
- `vote_average`: Number (optional, for saved movies)
- `release_date`: String (optional, for saved movies)
- `saved_at`: String (timestamp for saved movies)

