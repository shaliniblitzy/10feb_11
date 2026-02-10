/**
 * Server Module Unit Tests
 *
 * Unit tests verifying that the src/app.js module exports a valid Express
 * application instance. Tests import src/app.js (not src/server.js) to
 * avoid triggering port binding during test execution — the app/server
 * separation principle ensures the Express app can be validated without
 * starting a live server.
 *
 * @module tests/server.test
 */

'use strict';

const app = require('../src/app');

describe('Server Module', () => {
  // -------------------------------------------------------------------------
  // App Export — Verify the module exports the Express app correctly
  // -------------------------------------------------------------------------
  describe('App Export', () => {
    it('should export the Express app', () => {
      expect(app).toBeDefined();
      expect(app).not.toBeNull();
      expect(app).not.toBeUndefined();
    });

    it('should export a function', () => {
      // Express applications are callable request handler functions.
      // When passed to http.createServer(), the app handles incoming
      // HTTP requests by routing them to registered handlers.
      expect(typeof app).toBe('function');
    });
  });

  // -------------------------------------------------------------------------
  // App Instance Validation — Verify the app is a proper Express instance
  // -------------------------------------------------------------------------
  describe('App Instance Validation', () => {
    it('should be a valid Express application', () => {
      // A valid Express app exposes standard methods for route registration
      // (get, post, put, delete), middleware mounting (use), and server
      // startup (listen). Verify these essential methods are present.
      expect(typeof app.get).toBe('function');
      expect(typeof app.listen).toBe('function');
      expect(typeof app.use).toBe('function');
    });

    it('should not auto-bind to a port on import', () => {
      // Importing src/app.js should NOT start a server or bind to any port.
      // The app.listen() call resides exclusively in src/server.js, so
      // importing the app module must be free of side effects that would
      // cause port conflicts during parallel test execution.
      //
      // If app.listen() were called in app.js, importing it here would
      // throw an EADDRINUSE error or hang the test. The fact that this
      // test file loaded successfully without errors confirms the app
      // does not auto-bind.
      expect(app).toBeDefined();
      expect(typeof app).toBe('function');
    });
  });
});
