/**
 * Server Entry Point
 *
 * Starts the Express HTTP server by importing the application from src/app.js
 * and binding it to a network port. This file is intentionally separated from
 * app.js to maintain the app/server separation principle — Supertest injects
 * the Express app directly in tests without triggering port binding, preventing
 * port conflicts during parallel test execution.
 *
 * Usage:
 *   node src/server.js
 *
 * Environment Variables:
 *   PORT — TCP port number for the HTTP server (default: 3000)
 *
 * @module src/server
 */

'use strict';

// Import the Express application instance from app.js.
// The app object contains all registered route handlers (/hello, /evening)
// and is ready to handle incoming HTTP requests.
const app = require('./app');

// Define the port for the HTTP server. Uses the PORT environment variable
// if provided, otherwise defaults to 3000 for local development.
const port = process.env.PORT || 3000;

// Start the HTTP server by binding the Express app to the specified port.
// The callback fires once the server is successfully listening and ready
// to accept incoming connections.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
