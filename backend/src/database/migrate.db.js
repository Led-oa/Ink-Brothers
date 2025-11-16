const { pool } = require("../config/database");
const fs = require("fs");
const path = require("path");

const runMigrations = async () => {
  console.log("🔄 Début des migrations...");

  try {
    // Créer la table de suivi des migrations
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Lire tous les fichiers de migration
    const migrationsDir = path.join(__dirname, "migrations");
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".js"))
      .sort();

    for (const file of files) {
      // Vérifier si la migration a déjà été exécutée
      const result = await pool.query(
        "SELECT * FROM migrations WHERE name = $1",
        [file]
      );

      if (result.rows.length === 0) {
        console.log(`▶️  Exécution de ${file}...`);

        const migration = require(path.join(migrationsDir, file));
        await migration.up();

        // Enregistrer la migration
        await pool.query("INSERT INTO migrations (name) VALUES ($1)", [file]);

        console.log(`✅ ${file} exécutée avec succès`);
      } else {
        console.log(`⏭️  ${file} déjà exécutée`);
      }
    }

    console.log("✅ Toutes les migrations ont été exécutées");
  } catch (error) {
    console.error("❌ Erreur lors des migrations:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

// Exécuter si appelé directement
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
