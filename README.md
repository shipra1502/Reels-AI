# 🎬 Reels AI — AI-Powered Movie Discovery Platform

Reels AI is an AI-powered movie discovery platform that delivers personalized recommendations using GPT-driven natural language queries.

---

## 🚀 Tech Highlights

- React with Redux Toolkit for scalable state management
- Tailwind CSS for responsive, mobile-first UI
- Firebase Authentication for secure user access
- Secure Node.js backend proxy for OpenAI APIs
- Performance optimizations using memoization
- YouTube trailer background with autoplay & mute
- Multi-language AI search support

---

## 📌 Key Features

### 🔑 Authentication

- Login & Sign-Up flows with validation
- Firebase user creation, login, and logout
- Profile updates (display name & avatar)
- Smart routing:
  - Unauthenticated users → Login
  - Authenticated users → Browse
- Proper cleanup of `onAuthStateChanged` subscriptions to prevent memory leaks

---

### 🎞 Browse Experience

- Dynamic movie section with autoplay movie trailers
- Cinematic title & description overlay
- Movie categories:
  - Now Playing
  - Popular
  - Upcoming
  - Top Rated
- Reusable UI components: **MovieCard**, **MovieList**
- Optimized image delivery using **TMDB CDN**

---

### 🤖 Reels AI — Intelligent Search

- GPT-powered movie recommendations from natural language prompts
- Multi-language query support
- Secure server-side integration for GPT + TMDB APIs  
  → prevents exposing sensitive API keys
- Results rendered using the same reusable movie list components

---

## 🧠 Engineering Highlights

- Bootstrapped using Create React App
- Modular component-driven architecture
- Centralized Redux store with:
  - `userSlice`
  - `moviesSlice`
  - `gptSlice`
- Custom hooks for data fetching:
  - `useNowPlayingMovies`
  - `usePopularMovies`
  - `useUpcomingMovies`
  - `useTopRatedMovies`
- YouTube trailer fetching & autoplay logic
- Centralized constants for maintainability
- Resolved auth & profile sync edge cases
- Fully responsive across mobile, tablet, and desktop devices

---

## 🔄 Project Evolution

This project began as a UI exploration for modern media platforms and evolved into **Reels AI**, an original AI-driven movie discovery product with custom branding, architecture, and UX decisions.

---
