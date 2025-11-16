/* eslint-disable no-undef */
import { vi } from "vitest";

// Mock des variables d'environnement
vi.mock("import.meta", () => ({
  env: {
    VITE_API_URL: "http://localhost:3000/api",
    VITE_APP_NAME: "InkBrothers",
    VITE_APP_VERSION: "1.0.0",
  },
}));

// Configuration globale pour les tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
