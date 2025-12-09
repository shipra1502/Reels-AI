# 🎬 Netflix GPT — AI Powered Movie Search Platform

A Netflix-style streaming UI enhanced with GPT intelligence for smart movie discovery.  
Built with scalable architecture, secure API access, and production-grade best practices.

---

## 🚀 Tech Highlights

- React + Redux Toolkit state management
- Tailwind CSS for responsive UI styling
- Firebase Authentication + Hosting deployment
- Secure backend proxy for TMDB & OpenAI APIs
- Optimized render performance using memoization
- YouTube trailer background with autoplay & mute
- Multi-language GPT search support

---

## 📌 Key Features Delivered

### 🔑 Authentication

- Login & Sign-Up pages with validation
- Firebase user creation, login & logout
- Profile update (display name + avatar)
- Smart redirects:
  - If not logged in → Login page
  - If logged in → Browse page
- Cleanup of `onAuthStateChanged` subscriptions to prevent memory leaks

### 🎞 Browse UI (After Login)

- Dynamic browse movie section with autoplay trailer
- Title + description overlay with cinematic styling
- Movie rows: Now Playing / Popular / Upcoming / Top Rated
- Reusable components: **MovieCard**, **MovieList**
- Images served using **TMDB image CDN** for performance

### 🤖 NetflixGPT — AI Search

- GPT-driven movie name suggestions
- Multi-language prompt support
- Secure server-side integration for GPT + TMDB API calls  
  → prevents exposing API keys on the client
- Displays results using the same movie list UI

---

## 🧠 Engineering Milestones

- Project created with Create React App
- Tailwind setup for Netflix-style UI
- Header, Login & Register pages
- Redux store with: `userSlice`, `movieSlice`, `gptSlice`
- Built **MainContainer** & **SecondaryContainer**
- Custom hooks for fetching movies:
  - `useNowPlayingMovies`
  - `usePopularMovies`
  - `useUpcomingMovies`
  - `useTopRatedMovies`
- Trailer fetch & autoplay YouTube integration
- Constants file for reusable static values
- Fixed auth/profile display bugs
- Fully responsive across devices

---
