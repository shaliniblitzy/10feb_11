# 10feb_11

## Project Description

A Node.js tutorial project demonstrating how to build a simple HTTP server using [Express.js](https://expressjs.com/). The application exposes two endpoints:

- **`GET /hello`** — Returns `"Hello world"`
- **`GET /evening`** — Returns `"Good evening"`

This project serves as an introductory example for building and testing Express.js applications with Node.js.

## Prerequisites

- [Node.js](https://nodejs.org/) **22.x** (LTS recommended)
- npm (bundled with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running the Server

Start the Express server:

```bash
node src/server.js
```

The server will start and listen for incoming HTTP requests. You can then access the endpoints at:

- `http://localhost:3000/hello` — Returns `"Hello world"`
- `http://localhost:3000/evening` — Returns `"Good evening"`

## Testing

The project uses [Jest](https://jestjs.io/) as the test runner and [Supertest](https://github.com/ladislav-zezula/supertest) for HTTP endpoint integration testing.

### Running Tests

Run the full test suite:

```bash
npm test
```

### Running Tests with Coverage

Generate a coverage report in the `coverage/` directory:

```bash
npm run test:coverage
```

### Running Tests in Watch Mode

Continuously re-run tests on file changes during development:

```bash
npm run test:watch
```

### Running a Single Test File

Run a specific test file for targeted debugging:

```bash
npx jest tests/app.test.js
```

## Project Structure

```
├── src/
│   ├── app.js              # Express application with route handlers
│   └── server.js           # Server entry point
├── tests/
│   ├── app.test.js         # Endpoint integration tests
│   └── server.test.js      # Server module unit tests
├── jest.config.js           # Jest configuration
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

| File | Description |
|------|-------------|
| `src/app.js` | Express application setup with route handlers for `/hello` and `/evening` |
| `src/server.js` | Server entry point that imports the app and starts listening |
| `tests/app.test.js` | Integration tests for all Express HTTP endpoints using Supertest |
| `tests/server.test.js` | Unit tests for server module exports and app instantiation |
| `jest.config.js` | Jest test runner configuration (test environment, match patterns, coverage) |
| `package.json` | Project metadata, scripts, and dependency declarations |
