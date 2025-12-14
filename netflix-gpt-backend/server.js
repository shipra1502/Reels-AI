const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");
const path = require("path");

// Initialize Express app
const app = express();

// Initialize OpenAI with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());

// ============ SERVE REACT BUILD ============
app.use(express.static(path.join(__dirname, "../netflix-gpt-frontend/build")));

// ============ INTENT DETECTION ============

const isDiscoveryQuery = (query) => {
  const q = query.toLowerCase().trim();

  // Genre/category keywords
  const genreKeywords = [
    "movies",
    "films",
    "thriller",
    "comedy",
    "action",
    "drama",
    "horror",
    "romance",
    "sci-fi",
    "scifi",
    "documentary",
    "animated",
    "animation",
    "bollywood",
    "hollywood",
    "korean",
    "japanese",
    "hindi",
    "tamil",
    "telugu",
    "feel good",
    "sad",
    "funny",
    "scary",
    "romantic",
  ];

  // Discovery intent phrases
  const discoveryPhrases = [
    "give me",
    "show me",
    "find me",
    "list",
    "suggest",
    "what are",
    "recommend",
    "top",
    "best",
    "latest",
    "new",
    "old",
    "classic",
  ];

  // Check if it contains genre/category words
  const hasGenre = genreKeywords.some((keyword) => q.includes(keyword));

  // Check if it contains discovery phrases
  const hasDiscoveryPhrase = discoveryPhrases.some((phrase) =>
    q.includes(phrase)
  );

  // Check if it's asking for multiple items (plural indicators)
  const isPlural =
    q.includes("movies") || q.includes("films") || q.includes("some ");

  return (hasGenre && isPlural) || hasDiscoveryPhrase;
};

const isRecommendationQuery = (query) => {
  const q = query.toLowerCase().trim();

  return (
    q.includes("movies like") ||
    q.includes("movie like") ||
    q.includes("similar to") ||
    q.includes("same as")
  );
};

// If not discovery or recommendation, assume DETAILS (single movie lookup)

// ============ API ENDPOINTS ============

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // 🧠 CASE 1: DISCOVERY - "Hindi movies", "Korean thrillers", "feel good movies"
    if (isDiscoveryQuery(query)) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a movie discovery engine.

Rules:
- Based on the user's query, recommend relevant movies
- Use English titles or widely-known transliterations (e.g., "Dangal" not "दंगल")
- Return ONLY movie names
- No numbering, no explanations, no descriptions
- Comma-separated ONLY
- Return 8-12 movies
- Prioritize popular, well-known movies that TMDb will have
`,
          },
          { role: "user", content: query },
        ],
        max_tokens: 300,
        temperature: 0.3,
      });

      const movies = completion.choices[0].message.content
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      return res.json({
        success: true,
        mode: "RECOMMENDATIONS",
        movies,
      });
    }

    // 🧠 CASE 2: RECOMMENDATIONS - "movies like Interstellar"
    if (isRecommendationQuery(query)) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a movie recommendation engine.

Rules:
- Recommend movies similar to what the user mentioned
- Use English titles or widely-known transliterations
- Return ONLY movie names
- No numbering, no explanations
- Comma-separated ONLY
- Return 8-12 movies
`,
          },
          { role: "user", content: query },
        ],
        max_tokens: 300,
        temperature: 0.3,
      });

      const movies = completion.choices[0].message.content
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      return res.json({
        success: true,
        mode: "RECOMMENDATIONS",
        movies,
      });
    }

    // 🧠 CASE 3: DETAILS - Single movie lookup ("Interstellar", "Dangal")
    const cleanQuery = query
      .trim()
      .replace(/^(find|search|lookup|show|get)\s+/i, "")
      .replace(/\s+movie$/i, "");

    return res.json({
      success: true,
      mode: "DETAILS",
      query: cleanQuery,
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong with the AI service",
    });
  }
});

// ============ CATCH-ALL ROUTE ============
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../netflix-gpt-frontend/build/index.html")
  );
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Full-stack app running on http://localhost:${PORT}`);
  console.log(`📱 Visit the app at http://localhost:${PORT}`);
  console.log(`🔌 API endpoint: http://localhost:${PORT}/api/chat`);
});
