// index.js
// -----------------------------------------------------------------------------
// Minimal Node.js tutorial server built with Express.js.
//
// This is the single, root-level composition file of the entire tutorial. It
// imports the Express framework, instantiates one application instance, mounts
// two HTTP GET routes on that instance, and starts a single HTTP listener.
//
// Endpoints (both return HTTP 200 with a plain-text body):
//   GET /               -> "Hello world"
//   GET /good-evening   -> "Good evening"
//
// Any other request path or HTTP method falls through to Express's built-in
// 404 Not Found response. No additional middleware, body parsers, CORS, logging,
// or error handlers are configured - this file is deliberately kept flat so a
// tutorial reader can see the entire request/response lifecycle at a glance.
//
// Run:
//   npm start           (from the repository root - uses the "start" script in
//                        package.json, which in turn runs `node index.js`)
//   node index.js       (equivalent direct invocation)
//
// The listener binds to process.env.PORT when set, otherwise to port 3000.
// -----------------------------------------------------------------------------

// CommonJS import of the Express framework. This is the standard Node.js
// import form because package.json does not set "type": "module", so the
// runtime interprets index.js as a CommonJS module.
const express = require('express');

// Create a single Express application instance. Both routes below are
// registered against this instance, and the HTTP listener at the bottom of
// the file binds this same instance to a TCP port.
const app = express();

// Resolve the TCP port the server should listen on. The PORT environment
// variable takes precedence when provided (for example, by a hosting
// platform that injects one); otherwise the server falls back to port 3000,
// which matches the canonical Express "hello world" example.
const port = process.env.PORT || 3000;

// Route: GET /
// Responds with the plain-text body "Hello world" and HTTP 200. This is the
// original tutorial endpoint - its behavior is preserved exactly as a reader
// of an introductory Node.js tutorial would expect.
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Route: GET /good-evening
// Responds with the plain-text body "Good evening" and HTTP 200. This is the
// new endpoint introduced alongside the original; it lives on the same
// Express application instance and is served by the same HTTP listener.
app.get('/good-evening', (req, res) => {
  res.send('Good evening');
});

// Start the HTTP listener. The route registrations above must already have
// been applied at this point so that the server accepts traffic for both
// endpoints the moment it starts listening. The boot-log message includes
// the resolved port so the reader can confirm the server is up and know
// which URL to exercise next.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
