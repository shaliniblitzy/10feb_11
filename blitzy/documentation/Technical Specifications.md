# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification


### 0.1.1 Core Testing Objective

Based on the provided requirements, the Blitzy platform understands that the testing objective is to **add new tests** for a greenfield Node.js tutorial project that introduces Express.js and exposes two HTTP endpoints. The user is building a simple Node.js server hosting one endpoint that returns "Hello world" and adding a second endpoint powered by Express.js that returns "Good evening."

**Request Category:** Add new tests (greenfield — no existing tests or source code)

**Testing Requirements with Enhanced Clarity:**

- **R1 — Hello World Endpoint Test:** Verify that the server exposes an HTTP endpoint that responds with the exact string `"Hello world"`
- **R2 — Good Evening Endpoint Test:** Verify that the newly added Express.js endpoint responds with the exact string `"Good evening"`
- **R3 — Express.js Integration Test:** Confirm that Express.js is correctly integrated into the project and serves as the HTTP framework for the new endpoint
- **R4 — HTTP Response Validation:** Assert correct HTTP status codes (200 OK) and content types for both endpoints
- **R5 — Server Startup Test:** Ensure the Express application initializes without errors and binds to the expected port

**Implicit Testing Needs (Surfaced):**

- Edge case: Verify endpoints return proper 404 responses for undefined routes
- Error handling: Confirm the server gracefully handles malformed requests
- Content-Type validation: Ensure responses include appropriate `Content-Type` headers (e.g., `text/html` or `text/plain`)
- Response body integrity: Confirm response bodies contain exact expected strings without trailing whitespace or encoding issues

### 0.1.2 Special Instructions and Constraints

- **No user-specified testing constraints were provided** — the testing strategy will follow Node.js/Express.js community best practices
- **Greenfield project:** Since the repository contains only a `README.md`, all test infrastructure, configuration, and test files must be created from scratch
- **Tutorial context:** Tests should remain simple and didactic, reflecting the tutorial nature of the project
- **No Figma attachments** were provided for this project
- **Web search requirements documented:** Version compatibility research was conducted for Express.js (5.2.1), Jest (30.2.0), Supertest (7.2.2), and Node.js 22 LTS

### 0.1.3 Technical Interpretation

These testing requirements translate to the following technical test implementation strategy:

- To **test the Hello World endpoint**, we will **create** `tests/endpoints.test.js` containing a Supertest-based integration test that issues a `GET` request and asserts the response body equals `"Hello world"` with a `200` status code
- To **test the Good Evening endpoint**, we will **create** test cases in the same file that issue a `GET` request to the new route and assert the response body equals `"Good evening"` with a `200` status code
- To **test Express.js integration**, we will **create** `tests/app.test.js` containing unit tests that verify the Express application object is properly instantiated and routes are correctly registered
- To **test error handling**, we will **create** test cases verifying that requests to undefined routes return `404` status codes
- To **support all tests**, we will **create** `jest.config.js` for test runner configuration and update `package.json` with test scripts

### 0.1.4 Coverage Requirements Interpretation

- **Explicit coverage targets:** None specified by the user
- **Implicit coverage expectations based on industry standards for Node.js/Express:**
  - Statement coverage target: ≥ 90% for a simple tutorial application
  - Branch coverage target: ≥ 80%
  - Function coverage target: 100% (all exported functions must be tested)
- **Existing coverage patterns:** None — greenfield repository with no prior test infrastructure
- **Critical path analysis:** Both endpoints (`"Hello world"` and `"Good evening"`) are the only functional paths and must have 100% coverage

To achieve comprehensive testing, coverage should include all route handler functions, the Express application initialization logic, and all HTTP response paths (success and error).


## 0.2 Test Discovery and Analysis


### 0.2.1 Existing Test Infrastructure Assessment

Repository analysis was conducted using `get_source_folder_contents` on the root directory and `read_file` on `README.md`. The repository is a greenfield project containing a single file:

| File | Content | Test Relevance |
|------|---------|---------------|
| `README.md` | Contains only the heading `# 10feb_11` | No test infrastructure present |

**Discovery Findings:**

- **No test files found:** No files matching patterns `*test*`, `*spec*`, `test_*`, `spec_*`, `*_test.*`, or `*_spec.*` exist in the repository
- **No testing framework detected:** No `package.json`, `node_modules`, or dependency manifest exists
- **No test configuration files found:** No `jest.config.*`, `pytest.ini`, `.mocharc.*`, `vitest.config.*`, or similar files exist
- **No test data, fixtures, or factories found:** The repository is completely empty of test infrastructure
- **No CI/CD configuration detected:** No `.github/workflows`, `.gitlab-ci.yml`, or similar pipeline files exist

Repository analysis reveals **no existing testing setup** — all test infrastructure must be provisioned from scratch for this greenfield Node.js/Express.js tutorial project.

### 0.2.2 Test Infrastructure to Be Established

Based on the greenfield state and the Node.js/Express.js ecosystem best practices, the following test infrastructure will be established:

- **Testing framework:** Jest 30.2.0 — the most widely adopted JavaScript testing framework with built-in assertion library, mocking capabilities, and coverage reporting
- **HTTP testing library:** Supertest 7.2.2 — the standard library for testing Express.js HTTP endpoints without starting a live server
- **Test runner configuration:** `jest.config.js` at the project root
- **Coverage tool:** Jest's built-in `--coverage` flag (powered by Istanbul/V8)
- **Mock/stub libraries:** Jest's built-in `jest.fn()` and `jest.mock()` — no additional mocking libraries needed for this simple tutorial
- **Test data fixtures:** Not required — the project returns static string responses with no data dependencies

### 0.2.3 Web Search Research Conducted

The following research was conducted via web search to inform the testing strategy:

- **Express.js version research:** Confirmed Express.js 5.2.1 is the latest stable release, now the default on npm. Express 5 dropped support for Node.js versions before v18 and added native async/await middleware support, which simplifies testing of async route handlers.
- **Jest version research:** Confirmed Jest 30.2.0 is the latest release. Jest provides comprehensive test running, assertion, mocking, and coverage capabilities out of the box.
- **Supertest version research:** Confirmed Supertest 7.2.2 is the latest release. Supertest is a SuperAgent-driven library purpose-built for testing HTTP servers, supporting direct Express app object injection without requiring a running server.
- **Node.js LTS research:** Confirmed Node.js 22 (Jod) is the established Active LTS, with Node.js 24 (Krypton) having entered LTS on October 28, 2025. Node.js 22.22.0 was installed and verified for this project.
- **Testing best practices:** Jest with Supertest is the most recommended testing stack for Express.js applications, enabling both unit-level and integration-level endpoint testing in a single test suite.


## 0.3 Testing Scope Analysis


### 0.3.1 Test Target Identification

**Primary code to be tested:**

Since this is a greenfield project, the source files do not yet exist but will be created as part of the feature implementation. The testing plan targets the following anticipated source modules:

| Module/File | Description | Test Types Required |
|-------------|-------------|-------------------|
| `src/app.js` | Express application setup, route registration, middleware configuration | Unit tests, Integration tests |
| `src/server.js` | Server entry point, port binding, startup logic | Unit tests |
| `src/routes/hello.js` *(if modularized)* | Route handler for the "Hello world" endpoint | Unit tests |
| `src/routes/evening.js` *(if modularized)* | Route handler for the "Good evening" endpoint | Unit tests |

**Functions requiring test coverage:**

- Express app factory/initialization function
- `GET /` or `GET /hello` route handler → returns `"Hello world"`
- `GET /evening` or `GET /good-evening` route handler → returns `"Good evening"`
- Server listen/startup function

**Existing test file mapping:**

| Source File | Existing Test File | Test Categories Present |
|-------------|-------------------|----------------------|
| `src/app.js` | None — to be created | None |
| `src/server.js` | None — to be created | None |

**Dependencies requiring mocking:**

- No external services to mock — the application returns static string responses
- No database interactions to stub — no data persistence layer exists
- No file system operations to virtualize — endpoints serve in-memory string responses
- **Server listen function:** The `app.listen()` call should be isolated from tests to prevent port binding conflicts. Supertest handles this by injecting the Express app object directly

### 0.3.2 Version Compatibility Research

Based on web search verification of current package versions and compatibility:

**Recommended testing stack for Node.js 22 LTS:**

| Component | Package | Version | Rationale |
|-----------|---------|---------|-----------|
| Runtime | Node.js | 22.22.0 (LTS Jod) | Active LTS with broadest ecosystem compatibility and support through April 2027 |
| Framework | Express.js | 5.2.1 | Latest stable release, now default on npm, requires Node.js ≥ 18 |
| Test Runner | Jest | 30.2.0 | Latest stable, built-in coverage via V8/Istanbul, excellent Express.js ecosystem support |
| HTTP Testing | Supertest | 7.2.2 | Latest stable, direct Express app injection, chainable assertion API |

**Version conflict analysis:** No conflicts detected. All packages are compatible with Node.js 22 LTS. Express 5.x's minimum requirement of Node.js 18 is satisfied. Jest 30.x and Supertest 7.x both support Node.js 22.


## 0.4 Test Implementation Design


### 0.4.1 Test Strategy Selection

**Test types to implement:**

- **Unit tests:** Focus on isolated testing of each route handler function to confirm it produces the correct response string and status code when invoked independently
- **Integration tests:** Cover full HTTP request/response cycle through the Express application stack using Supertest, verifying that middleware, routing, and response formatting work together correctly
- **Edge case tests:** Address undefined route handling (404 responses), verifying the application does not crash or return unexpected data for unregistered paths
- **Error handling tests:** Verify the Express application returns appropriate error responses for malformed or unexpected requests

### 0.4.2 Test Case Blueprint

```
Component: Express Application (src/app.js)
Test Categories:
- Happy path: GET request to /hello returns "Hello world" with status 200
- Happy path: GET request to /evening returns "Good evening" with status 200
- Edge cases: GET request to /nonexistent returns 404 status
- Error cases: Application handles undefined routes gracefully
```

```
Component: Hello World Endpoint
Test Categories:
- Happy path: Returns exact string "Hello world"
- Happy path: Returns HTTP 200 status code
- Happy path: Returns correct Content-Type header
- Edge cases: Responds correctly regardless of trailing slash
```

```
Component: Good Evening Endpoint
Test Categories:
- Happy path: Returns exact string "Good evening"
- Happy path: Returns HTTP 200 status code
- Happy path: Returns correct Content-Type header
- Edge cases: Responds correctly regardless of trailing slash
```

```
Component: Server Startup (src/server.js)
Test Categories:
- Happy path: Server exports the Express app for testing
- Happy path: App is a valid Express instance
- Error cases: App does not bind to port during test execution
```

### 0.4.3 Existing Test Extension Strategy

- **No existing tests to extend** — the repository is greenfield
- **No tests to refactor** — no legacy test patterns exist
- **No tests to fix** — no broken tests to repair
- All test files will be created from scratch following Jest + Supertest conventions

### 0.4.4 Test Data and Fixtures Design

- **Required test data structures:** None — both endpoints return hardcoded string responses (`"Hello world"` and `"Good evening"`) with no dynamic data
- **Fixture organization strategy:** No fixtures required for this tutorial project. If needed in the future, a `tests/fixtures/` directory can be introduced
- **Mock object specifications:** No mocks required — there are no external dependencies, databases, or third-party services to simulate
- **Test database/state management approach:** Not applicable — the application is stateless with no persistence layer. Each test is inherently isolated since Supertest creates a fresh HTTP connection per request against the Express app object


## 0.5 Test File Transformation Mapping


### 0.5.1 File-by-File Test Plan

All test files are new creations since the repository is greenfield. The following table maps every test file to its source and purpose:

| Target Test File | Transformation | Source File/Test | Purpose/Changes |
|-----------------|----------------|------------------|-----------------|
| `tests/app.test.js` | CREATE | `src/app.js` | Integration tests for all Express endpoints using Supertest — validates HTTP responses for /hello, /evening, and 404 handling |
| `tests/server.test.js` | CREATE | `src/server.js` | Unit tests verifying the server module exports a valid Express app instance and does not auto-bind to a port during test execution |
| `jest.config.js` | CREATE | N/A | Jest test runner configuration — sets test environment to Node, defines test match patterns, enables coverage collection |
| `package.json` | UPDATE | `package.json` | Add test script (`"test": "jest"`), coverage script, and devDependencies for jest and supertest |

### 0.5.2 New Test Files Detail

- **`tests/app.test.js`** — Express endpoint integration tests
  - Test categories: happy path (200 responses), edge cases (404 for undefined routes), content-type validation
  - Mock dependencies: None — Supertest injects the Express app directly
  - Assertions focus: HTTP status codes, response body string matching, Content-Type headers
  - Test cases:
    - `GET /hello` returns status 200 with body `"Hello world"`
    - `GET /evening` returns status 200 with body `"Good evening"`
    - `GET /nonexistent` returns status 404
    - Response headers include expected Content-Type

- **`tests/server.test.js`** — Server module unit tests
  - Test categories: module export validation, app instance verification
  - Mock dependencies: None
  - Assertions focus: Verify the exported app is a valid Express application, verify it does not auto-start on import
  - Test cases:
    - Server module exports an Express app
    - Exported app is a function (Express apps are callable)

### 0.5.3 Test Configuration Updates

- **`jest.config.js`:** Create with the following settings:
  - `testEnvironment`: `"node"` (not jsdom, since this is a backend project)
  - `testMatch`: `["**/tests/**/*.test.js"]`
  - `collectCoverage`: `true`
  - `coverageDirectory`: `"coverage"`
  - `coveragePathIgnorePatterns`: `["/node_modules/"]`

- **`package.json`:** Update scripts section:
  - `"test"`: `"jest"`
  - `"test:coverage"`: `"jest --coverage"`
  - `"test:watch"`: `"jest --watchAll"`

### 0.5.4 Cross-File Test Dependencies

- **Shared fixtures:** None required — static string responses need no fixture data
- **Mock objects:** None required — no external dependencies to simulate
- **Test utilities:** None required — Supertest and Jest built-ins are sufficient
- **Import updates required:** Each test file will import the Express app from `src/app.js` using `const app = require('../src/app')` and Supertest using `const request = require('supertest')`
- **App/Server separation:** The Express app (`src/app.js`) must be exported separately from the server startup logic (`src/server.js`) to allow Supertest to inject the app without binding to a port


## 0.6 Dependency Inventory


### 0.6.1 Testing Dependencies

All packages listed are verified as the latest stable releases via npm registry web search conducted during context gathering. No placeholder versions are used.

| Registry | Package Name | Version | Purpose |
|----------|-------------|---------|---------|
| npm | jest | 30.2.0 | JavaScript testing framework — provides test runner, assertion library, mocking, and coverage |
| npm | supertest | 7.2.2 | HTTP assertion library — enables integration testing of Express endpoints without starting a live server |

**Production Dependencies (required for the source code under test):**

| Registry | Package Name | Version | Purpose |
|----------|-------------|---------|---------|
| npm | express | 5.2.1 | Web framework — provides HTTP server, routing, and middleware for the tutorial endpoints |

**Runtime Environment:**

| Component | Version | Notes |
|-----------|---------|-------|
| Node.js | 22.22.0 | Active LTS (Jod) — installed and verified in the project environment |
| npm | 10.9.4 | Package manager bundled with Node.js 22 |

### 0.6.2 Import Updates

Since this is a greenfield project, there are no existing imports to transform. The following import patterns will be established in new test files:

- **`tests/app.test.js`:**
  - `const request = require('supertest')` — Supertest HTTP client
  - `const app = require('../src/app')` — Express application under test

- **`tests/server.test.js`:**
  - `const app = require('../src/app')` — Express application module validation


## 0.7 Coverage and Quality Targets


### 0.7.1 Coverage Metrics

- **Current coverage:** 0% — no tests or source code exist in the greenfield repository
- **Target coverage:** ≥ 90% statement coverage based on Node.js/Express community best practices for simple applications
- **Coverage gaps to address:**

| Component | Current Coverage | Target Coverage | Focus Areas |
|-----------|-----------------|-----------------|-------------|
| `src/app.js` (Express app) | 0% | 100% | All route handlers, middleware chain, route registration |
| `src/server.js` (Server entry) | 0% | 80% | App export validation; server listen logic excluded from unit tests |
| Route handlers | 0% | 100% | Happy path responses, status codes, content-type headers |
| Error paths | 0% | 90% | 404 handling for undefined routes |

- **Per-file coverage targets:**
  - `src/app.js`: 100% — all routes and middleware must be fully tested
  - `src/server.js`: 80% — the `app.listen()` call is intentionally excluded from test coverage since Supertest bypasses port binding

### 0.7.2 Test Quality Criteria

- **Assertion density expectations:** Each test case must contain at least one status code assertion and one response body assertion. Integration tests should include 2-3 assertions per test case (status, body, optional header)
- **Test isolation requirements:** Each test must be fully independent — no shared state between test cases. Supertest creates isolated HTTP connections per request, ensuring natural isolation
- **Performance constraints for test execution:** The full test suite should complete within 5 seconds given the minimal scope of the application. No network calls, database queries, or file I/O should occur during testing
- **Maintainability standards:** Tests must use descriptive `describe` and `it` blocks with clear naming conventions (e.g., `it('should return Hello world with status 200')`)
- **Repository test patterns and conventions:** Since no existing patterns exist, the following conventions will be established:
  - Test files reside in a `tests/` directory at the project root
  - Test files are named `*.test.js` matching the source module name
  - Tests use CommonJS `require()` syntax consistent with the tutorial's simplicity
  - Each `describe` block corresponds to one logical component or endpoint


## 0.8 Scope Boundaries


### 0.8.1 Exhaustively In Scope

**New test files:**
- `tests/app.test.js` — integration tests for all Express HTTP endpoints
- `tests/server.test.js` — unit tests for server module exports and app instantiation

**Test configuration:**
- `jest.config.js` — Jest test runner configuration (test environment, match patterns, coverage settings)
- `package.json` — test scripts (`test`, `test:coverage`, `test:watch`) and devDependencies (`jest`, `supertest`)

**Source files to be created (required for tests to execute):**
- `src/app.js` — Express application setup with route handlers for `/hello` and `/evening`
- `src/server.js` — Server entry point that imports the app and calls `app.listen()`

**Test utilities and helpers:**
- No shared test utilities required for this scope
- No mock objects required
- No test fixtures required

**Documentation updates:**
- `README.md` — add testing instructions section describing how to run tests and view coverage

### 0.8.2 Explicitly Out of Scope

- **Complex middleware testing** — no authentication, rate limiting, or custom middleware is part of this tutorial
- **Database integration tests** — no database or persistence layer exists in this tutorial project
- **End-to-end (E2E) tests** — not warranted for a two-endpoint tutorial server; integration tests via Supertest provide sufficient coverage
- **Performance or load testing** — not relevant for a tutorial application
- **Frontend/UI tests** — the project is a backend-only Node.js server with no UI layer
- **CI/CD pipeline configuration** — no `.github/workflows` or other pipeline definitions are in scope
- **TypeScript migration** — the project uses plain JavaScript as appropriate for a tutorial
- **Refactoring beyond what is needed for testability** — source code structure should be minimal, only separating app from server for Supertest compatibility
- **Additional endpoints beyond user specification** — only `/hello` ("Hello world") and `/evening` ("Good evening") are in scope
- **Security testing or penetration testing** — not applicable for this tutorial scope


## 0.9 Execution Parameters


### 0.9.1 Testing-Specific Instructions

- **Test execution command:**
  ```
  npm test
  ```
  This invokes `jest` via the `package.json` test script, running all files matching `tests/**/*.test.js`.

- **Coverage measurement command:**
  ```
  npm run test:coverage
  ```
  This invokes `jest --coverage`, generating an Istanbul/V8 coverage report in the `coverage/` directory.

- **Watch mode command:**
  ```
  npm run test:watch
  ```
  This invokes `jest --watchAll` for continuous test re-execution during development.

- **Single test execution pattern:**
  ```
  npx jest tests/app.test.js
  ```
  Runs only the specified test file for targeted debugging.

- **Debug mode execution:**
  ```
  node --inspect-brk node_modules/.bin/jest --runInBand
  ```
  Enables Node.js inspector for step-through debugging of test cases.

- **Specific test patterns to follow in the repository:**
  - All tests live in the `tests/` directory at the project root
  - Test file naming convention: `<module-name>.test.js`
  - Tests use `describe` / `it` blocks for clear structure
  - Supertest is used for all HTTP endpoint assertions
  - The Express app is imported directly (not via a running server)

- **Excluded test categories:** None — all test categories (unit, integration, edge cases) are included

- **Environment setup requirements for tests:**
  - Node.js 22.x must be installed
  - Run `npm install` to install all dependencies before executing tests
  - No environment variables are required
  - No database or external service setup is needed
  - Tests do not require network access


## 0.10 Special Instructions for Testing


### 0.10.1 Testing-Specific Requirements

The user did not provide explicit testing-specific instructions. The following directives are inferred from the tutorial context and Node.js/Express best practices to ensure a clean, maintainable test implementation:

- **App/Server separation principle:** The Express app object must be exported from `src/app.js` independently of the `app.listen()` call in `src/server.js`. This is required so that Supertest can inject the app directly without binding to a network port, preventing port conflicts during parallel test execution.

- **Follow CommonJS module patterns:** Since this is a beginner-friendly tutorial project, all source and test files should use `require()` / `module.exports` syntax rather than ES Module `import`/`export`. This avoids the need for additional configuration or `"type": "module"` in `package.json`.

- **Maintain test isolation using Supertest's stateless model:** Each Supertest `request(app)` call creates an ephemeral connection. Tests must not share state, rely on execution order, or mutate the Express app object.

- **Ensure all tests can run independently and in parallel:** Jest runs test files in parallel by default. Since each test file imports the app module independently and Supertest avoids persistent server bindings, parallelism is inherently safe.

- **Match the tutorial's simplicity in test design:** Tests should be straightforward and readable, serving as a learning resource alongside the tutorial code. Avoid over-engineering with complex abstractions, custom matchers, or unnecessary helper utilities.

- **DO NOT modify source code beyond what is specified:** The only source files to create are `src/app.js` (Express app with two endpoints) and `src/server.js` (server startup). No additional middleware, error handlers, or utility modules should be introduced unless explicitly required by the user.

- **Exact response string matching:** Test assertions must validate the exact response strings `"Hello world"` and `"Good evening"` as specified by the user — no variations, no additional formatting.


