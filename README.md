# Movie App

A React Native mobile application for browsing and searching movies using TMDB API and Appwrite backend.

## Features

- 🎬 Browse latest movies
- 🔍 Search for specific movies
- 📈 View trending searches
- 📱 Responsive UI with NativeWind (Tailwind CSS)
- 🎨 Beautiful UI with custom gradients and animations
- 🔐 Backend powered by Appwrite
- 🎯 Real-time movie details and information

## Tech Stack

- **Frontend Framework**: React Native with Expo
- **Styling**: NativeWind (TailwindCSS)
- **Navigation**: Expo Router
- **Backend**: Appwrite
- **API**: TMDB (The Movie Database)
- **Language**: TypeScript

## Project Structure

```
app/                  # Main application code
├── (tabs)/           # Tab-based navigation screens
├── movie/            # Movie detail screens
components/           # Reusable UI components
constants/           # App constants and assets
services/            # API and backend services
interfaces/          # TypeScript interfaces
```

## Prerequisites

- Node.js (Latest LTS version)
- Expo CLI
- TMDB API Key
- Appwrite Account and Project Setup

## Environment Variables

Create a `.env` file in the root directory with:

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
3. Start the development server:
   ```bash
   npm start
   ```


## Features in Detail

### Home Screen
- Latest movies display
- Trending movies section
- Quick search access

### Search Screen
- Real-time movie search
- Search history tracking
- Beautiful grid layout

### Movie Details Screen
- Comprehensive movie information
- Rating and reviews
- Production details
- Release information

