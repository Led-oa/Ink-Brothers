const { pool } = require("../../config/database");

const up = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Créer un index sur l'email
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);

    await client.query("COMMIT");
    console.log("✅ Migration 001_create_users créée avec succès");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erreur migration:", error);
    throw error;
  } finally {
    client.release();
  }
};

const down = async () => {
  const client = await pool.connect();
  try {
    await client.query("DROP TABLE IF EXISTS users CASCADE");
    console.log("✅ Migration 001_create_users annulée");
  } catch (error) {
    console.error("❌ Erreur rollback:", error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { up, down };
