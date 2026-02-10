/**
 * Express Application Setup
 *
 * Core application module for the Node.js/Express tutorial project.
 * Creates an Express app instance and registers two GET route handlers:
 *   - GET /hello  → responds with "Hello world"
 *   - GET /evening → responds with "Good evening"
 *
 * This file intentionally does NOT call app.listen(). The server startup
 * logic resides in src/server.js, keeping the app and server concerns
 * separated. This separation allows Supertest to inject the Express app
 * directly in tests without binding to a network port.
 *
 * @module src/app
 */

'use strict';

// Import the Express framework (v5.2.1) — provides HTTP server,
// routing, and middleware capabilities for the application.
const express = require('express');

// Create the Express application instance.
// The app object exposes get(), listen(), and use() methods
// for route registration, server startup, and middleware mounting.
const app = express();

// ---------------------------------------------------------------------------
// Route Handlers
// ---------------------------------------------------------------------------

/**
 * GET /hello
 *
 * Returns the exact string "Hello world" with an HTTP 200 status code.
 * Express sets the Content-Type header to text/html by default when
 * res.send() is called with a string argument.
 *
 * @param {import('express').Request}  req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/hello', (req, res) => {
  res.send('Hello world');
});

/**
 * GET /evening
 *
 * Returns the exact string "Good evening" with an HTTP 200 status code.
 * Express sets the Content-Type header to text/html by default when
 * res.send() is called with a string argument.
 *
 * @param {import('express').Request}  req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/evening', (req, res) => {
  res.send('Good evening');
});

// ---------------------------------------------------------------------------
// Module Export
// ---------------------------------------------------------------------------

// Export the Express app instance so that:
//   - src/server.js can import it and call app.listen(port)
//   - Test files can import it for Supertest injection:
//       const app = require('../src/app');
//       const request = require('supertest');
//       request(app).get('/hello').expect(200);
module.exports = app;
