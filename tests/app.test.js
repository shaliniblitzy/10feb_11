/**
 * Express Application Endpoint Integration Tests
 *
 * Integration tests for all Express HTTP endpoints using Jest and Supertest.
 * Validates HTTP responses for GET /hello, GET /evening, and 404 handling
 * for undefined routes. Each test uses Supertest to inject the Express app
 * directly without binding to a network port, ensuring test isolation and
 * preventing port conflicts during parallel execution.
 *
 * @module tests/app.test
 */

'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('Express Application Endpoints', () => {
  // -------------------------------------------------------------------------
  // GET /hello — Hello World endpoint tests
  // -------------------------------------------------------------------------
  describe('GET /hello', () => {
    it('should return Hello world with status 200', async () => {
      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello world');
    });

    it('should return correct Content-Type header', async () => {
      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
      // Express sets Content-Type to text/html by default when res.send()
      // is called with a string argument.
      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  });

  // -------------------------------------------------------------------------
  // GET /evening — Good Evening endpoint tests
  // -------------------------------------------------------------------------
  describe('GET /evening', () => {
    it('should return Good evening with status 200', async () => {
      const response = await request(app).get('/evening');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Good evening');
    });

    it('should return correct Content-Type header', async () => {
      const response = await request(app).get('/evening');

      expect(response.status).toBe(200);
      // Express sets Content-Type to text/html by default when res.send()
      // is called with a string argument.
      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  });

  // -------------------------------------------------------------------------
  // 404 Handling — Undefined route tests
  // -------------------------------------------------------------------------
  describe('404 Handling', () => {
    it('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/nonexistent');

      expect(response.status).toBe(404);
    });

    it('should return 404 for random paths', async () => {
      const response = await request(app).get('/random-path');

      expect(response.status).toBe(404);
    });
  });
});
