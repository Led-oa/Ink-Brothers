const request = require("supertest");
const app = require("../server");
const { pool } = require("../config/database");

describe("API Health Check", () => {
  // Fermer la connexion après tous les tests
  afterAll(async () => {
    await pool.end();
  });

  it("GET /api/health devrait retourner OK", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
    expect(response.body).toHaveProperty("timestamp");
  });

  it("GET /api/db-test devrait vérifier la connexion DB", async () => {
    const response = await request(app).get("/api/db-test");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
  });

  it("GET /api/route-inexistante devrait retourner 404", async () => {
    const response = await request(app).get("/api/route-inexistante");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
