const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de sécurité
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
});
app.use("/api/", limiter);

// Middlewares généraux
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes de base
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API InkBrothers fonctionne correctement",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Test de connexion à la base de données
app.get("/db-test", async (req, res) => {
  try {
    const { query } = require("./config/database");
    const result = await query("SELECT NOW() as current_time");
    res.json({
      status: "OK",
      message: "Connexion à la base de données réussie",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Erreur de connexion à la base de données",
      error: error.message,
    });
  }
});

// Import des routes (à décommenter quand vous les créerez)
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error("❌ Erreur:", err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Erreur serveur interne",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({
    error: "Route non trouvée",
    path: req.path,
  });
});

// Exportez l'app sans démarrer le serveur
module.exports = app;

// Démarrez le serveur seulement si le fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("========================================");
    console.log(`🚀 Serveur InkBrothers démarré`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 API Health: http://localhost:${PORT}/health`);
    console.log("========================================");
  });
}
