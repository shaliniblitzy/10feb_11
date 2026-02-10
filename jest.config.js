/**
 * Jest Configuration for Node.js/Express Tutorial Project
 *
 * Configures Jest as the test runner for backend integration and unit tests.
 * Uses the Node test environment (not jsdom) since this is a server-side
 * Express.js application with no browser dependencies.
 *
 * Coverage is collected automatically on every test run via Istanbul/V8,
 * with threshold enforcement aligned to project quality targets (§0.7.1).
 */
module.exports = {
  // Use Node.js environment for backend Express.js testing (not jsdom/browser)
  testEnvironment: 'node',

  // Match test files in the tests/ directory following the *.test.js convention
  testMatch: ['**/tests/**/*.test.js'],

  // Enable automatic code coverage collection on every test run
  collectCoverage: true,

  // Output coverage reports to the coverage/ directory at the project root
  coverageDirectory: 'coverage',

  // Exclude third-party packages from coverage metrics
  coveragePathIgnorePatterns: ['/node_modules/'],

  // Enforce minimum coverage thresholds per §0.7.1 quality targets:
  // - Statements: ≥90% for comprehensive code path verification
  // - Branches:   ≥80% for conditional logic coverage
  // - Functions:  100% to ensure all exported functions are tested
  // - Lines:      ≥90% aligned with statement coverage target
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 100,
      lines: 90
    }
  }
};
