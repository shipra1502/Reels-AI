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

// Enable CORS (allows React app to communicate)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// ============ SERVE REACT BUILD ============

app.use(express.static(path.join(__dirname, "../netflix-gpt-frontend/build")));

// ============ API ENDPOINTS ============

// Health check endpoint (test if server is running)
app.get("/health", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.post("/api/chat", async (req, res) => {
  try {
    // Get query from React app
    const { query } = req.body;

    // Validate input
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: query }],
      max_tokens: 600, // optional, 600 is usually enough
      temperature: 0.2, // optional, keeps answers stable
    });

    // Extract response message
    const message = completion.choices[0].message.content;

    // Send response back to React
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CATCH-ALL ROUTE (FIXED) ============

// Serve React app for any route not handled above
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
