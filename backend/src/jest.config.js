module.exports = {
  testEnvironment: "node",
  coverageDirectory: "../coverage",
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!src/database/migrate.js",
    "!src/database/migrations/**",
  ],
  testMatch: ["**/__tests__/**/*.test.js"],
  verbose: true,
};
