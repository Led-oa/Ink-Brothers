const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test de connexion
pool.on("connect", () => {
  console.log("✅ Connecté à PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Erreur PostgreSQL:", err);
  process.exit(-1);
});

// Fonction helper pour les requêtes
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Requête exécutée", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Erreur requête:", error);
    throw error;
  }
};

module.exports = { pool, query };
