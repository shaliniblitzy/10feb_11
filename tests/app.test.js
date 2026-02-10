/**
 * Express Application Endpoint Integration Tests
 *
 * Integration test suite for all Express HTTP endpoints in the Node.js
 * tutorial project. Uses Jest as the test runner and Supertest for HTTP
 * assertion testing against the Express app object, injected directly
 * without binding to a network port.
 *
 * Test structure follows §0.7.2 naming conventions with describe/it blocks:
 *   - GET /hello   → "Hello world" with status 200
 *   - GET /evening → "Good evening" with status 200
 *   - 404 Handling → undefined routes return 404
 *
 * Each test creates an ephemeral Supertest connection via request(app),
 * ensuring full isolation with no shared state between test cases (§0.10.1).
 *
 * @module tests/app.test
 * @see {@link module:src/app} Express application under test
 */

'use strict';

// ---------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------

// Supertest (v7.2.2) — HTTP assertion library for integration testing Express
// endpoints. Sends HTTP requests directly to the Express app object without
// starting a live server or binding to a port. Provides a chainable assertion
// API via request(app).get(path).expect(status).expect(body).
const request = require('supertest');

// Express application under test — imported directly for Supertest injection.
// The app/server separation (§0.10.1) ensures this import provides the Express
// app without triggering app.listen(), preventing port binding conflicts during
// parallel test execution.
const app = require('../src/app');

// ---------------------------------------------------------------------------
// Integration Test Suite
// ---------------------------------------------------------------------------

describe('Express Application Endpoints', () => {
  // -------------------------------------------------------------------------
  // GET /hello — Hello World endpoint tests (R1, R4)
  // -------------------------------------------------------------------------
  describe('GET /hello', () => {
    /**
     * Validates the primary happy-path scenario for the Hello World endpoint.
     * Asserts that GET /hello responds with HTTP 200 and the exact string
     * "Hello world" as specified in the tutorial requirements (§0.10.1).
     *
     * Assertions: status code (200) + response body ("Hello world")
     */
    it('should return Hello world with status 200', async () => {
      const response = await request(app)
        .get('/hello')
        .expect(200);

      // Verify the response body contains the exact expected string (§0.10.1).
      // Express res.send('Hello world') sets the body to this exact value.
      expect(response.text).toBe('Hello world');
      // Additional assertion: confirm status code via Jest for explicit
      // double-verification alongside Supertest's .expect(200) chain.
      expect(response.status).toBe(200);
    });

    /**
     * Validates that the GET /hello endpoint returns the correct Content-Type
     * header. Express sets Content-Type to text/html by default when
     * res.send() is called with a string argument.
     *
     * Assertions: status code (200) + Content-Type header + response body
     */
    it('should return correct Content-Type header', async () => {
      const response = await request(app)
        .get('/hello')
        .expect(200)
        .expect('Content-Type', /text\/html/);

      // Verify the response body is present and correct alongside the
      // Content-Type header validation.
      expect(response.text).toBe('Hello world');
    });
  });

  // -------------------------------------------------------------------------
  // GET /evening — Good Evening endpoint tests (R2, R4)
  // -------------------------------------------------------------------------
  describe('GET /evening', () => {
    /**
     * Validates the primary happy-path scenario for the Good Evening endpoint.
     * Asserts that GET /evening responds with HTTP 200 and the exact string
     * "Good evening" as specified in the tutorial requirements (§0.10.1).
     *
     * Assertions: status code (200) + response body ("Good evening")
     */
    it('should return Good evening with status 200', async () => {
      const response = await request(app)
        .get('/evening')
        .expect(200);

      // Verify the response body contains the exact expected string (§0.10.1).
      // Express res.send('Good evening') sets the body to this exact value.
      expect(response.text).toBe('Good evening');
      // Additional assertion: confirm status code via Jest for explicit
      // double-verification alongside Supertest's .expect(200) chain.
      expect(response.status).toBe(200);
    });

    /**
     * Validates that the GET /evening endpoint returns the correct Content-Type
     * header. Express sets Content-Type to text/html by default when
     * res.send() is called with a string argument.
     *
     * Assertions: status code (200) + Content-Type header + response body
     */
    it('should return correct Content-Type header', async () => {
      const response = await request(app)
        .get('/evening')
        .expect(200)
        .expect('Content-Type', /text\/html/);

      // Verify the response body is present and correct alongside the
      // Content-Type header validation.
      expect(response.text).toBe('Good evening');
    });
  });

  // -------------------------------------------------------------------------
  // 404 Handling — Undefined route tests (Edge cases)
  // -------------------------------------------------------------------------
  describe('404 Handling', () => {
    /**
     * Validates that requesting an undefined route returns a 404 status code.
     * Express automatically responds with 404 for routes that are not
     * registered on the application.
     *
     * Assertions: status code (404) + response body is defined (§0.7.2)
     */
    it('should return 404 for undefined routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      // Verify the response body is present — Express returns a default
      // HTML response body for 404 errors even without a custom error handler.
      // §0.7.2 requires at least one status code and one body assertion.
      expect(response.text).toBeDefined();
      expect(response.text.length).toBeGreaterThan(0);
    });

    /**
     * Validates that requesting another undefined path also returns 404.
     * Ensures the 404 behaviour is consistent across any arbitrary unregistered
     * path, not just a single hard-coded test URL.
     *
     * Assertions: status code (404) + response body is defined (§0.7.2)
     */
    it('should return 404 for random paths', async () => {
      const response = await request(app)
        .get('/random-path')
        .expect(404);

      // Verify the response body is present and non-empty for the 404 error.
      // §0.7.2 requires at least one status code and one body assertion.
      expect(response.text).toBeDefined();
      expect(response.text.length).toBeGreaterThan(0);
    });
  });
});
