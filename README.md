# 10feb_11 — Node.js + Express.js Tutorial Server

A minimal Node.js tutorial server built with Express.js that exposes two HTTP
GET endpoints. It is intentionally single-file and dependency-light so that you
can clone, install, and run it in under a minute.

## Prerequisites

- **Node.js 18 or newer** — required by Express 5 (the installed version of
  Express). Verify with `node --version`.
- **npm** — bundled with Node.js. Verify with `npm --version`.

## Installation

From the repository root, install the project dependencies:

```bash
npm install
```

This reads `package.json`, resolves the `express` dependency (pinned to
`^5.2.1`) plus its transitive graph, populates the `node_modules/` directory,
and generates/updates `package-lock.json` to lock the exact versions for
reproducible installs.

## Running the server

Start the server with either command:

```bash
npm start
# or
node index.js
```

By default the server listens on port `3000`, so the base URL is
<http://localhost:3000>. On a successful boot the process prints a one-line
confirmation message to the console.

To override the port, set the `PORT` environment variable before launching:

```bash
PORT=4000 npm start
```

## Endpoints

The server registers the following routes:

| Method | Path            | Response body |
| ------ | --------------- | ------------- |
| GET    | `/`             | Hello world   |
| GET    | `/good-evening` | Good evening  |

Any request to an unregistered path falls through to the default Express
`404 Not Found` response.

## Usage examples

With the server running, exercise both endpoints from a second terminal using
`curl`:

```bash
curl http://localhost:3000/
# => Hello world

curl http://localhost:3000/good-evening
# => Good evening
```

You can also open the URLs directly in a web browser to see the same plain-text
responses.
