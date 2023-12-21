# GitHub GraphQL Explorer

GitHub GraphQL Explorer is a project consisting of a GraphQL server and a React client that fetches information from GitHub's API. The server queries GitHub repositories using a developer token and owner name specified in the API headers.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [Usage](#usage)
  - [Client](#client-usage)
  - [Server](#server-usage)

## Project Structure

The project is organized into two main folders:

- **client:** Contains the React client application.
- **server:** Contains the GraphQL server.
- **FullProjectStructure**
## Client

```plaintext
client
│
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.test.tsx
    ├── App.tsx
    ├── constant
    │   └── github.tsx
    ├── container
    │   ├── Loader.tsx
    │   ├── RepoDetails.tsx
    │   └── RepoList.tsx
    ├── index.css
    ├── index.tsx
    ├── logo.svg
    ├── react-app-env.d.ts
    ├── reportWebVitals.ts
    └── setupTests.ts
└── tsconfig.json
server
│
├── dist
│   ├── GitHubScanner.js
│   ├── constant
│   │   └── index.js
│   ├── index.js
│   ├── interceptors
│   │   └── logging.js
│   ├── interface
│   │   └── repository.js
│   ├── resolvers
│   │   └── repositoryResolver.js
│   ├── services
│   │   ├── checkHeader.js
│   │   └── repository.js
│   └── type
│       ├── repository.js
│       ├── repositoryDetails.js
│       └── repositoryQuery.js
├── package-lock.json
├── package.json
├── src
│   ├── constant
│   │   └── index.ts
│   ├── index.js
│   ├── index.ts
│   ├── interceptors
│   │   ├── logging.js
│   │   └── logging.ts
│   ├── interface
│   │   └── repository.ts
│   ├── resolvers
│   │   ├── repositoryResolver.js
│   │   └── repositoryResolver.ts
│   ├── services
│   │   ├── checkHeader.ts
│   │   └── repository.ts
│   └── type
│       ├── repositoryQuery.js
│       └── repositoryQuery.ts
└── tsconfig.json
```

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js:** Version 16 or later. [Install Node.js](https://nodejs.org/)

## Installation

### Client

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Server

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    3. Build TypeScript files (if not built):

    ```bash
    tsc
    ```

## Usage

### Client

1. Start the React client:

    ```bash
    npm start
    ```

   The client will be hosted on [http://localhost:3000](http://localhost:3000).

### Server

1. Run the GraphQL server:

    ```bash
    node dist/index.js
    ```

   The server will be hosted on [http://localhost:your-port](http://localhost:your-port). Replace `your-port` with the specified port in your server configuration.
