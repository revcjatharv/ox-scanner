"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// schema.js
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Repository {
    name: String!
    size: Int!
    owner: String!
  }

  type RepositoryDetails {
    isPrivate: Boolean,
    fileCount: Int,
    ymlContent: String,
    activeWebhooks: Int,
  }

  type Query {
    repositoryList: [Repository]!
    repositoryDetails(repoName: String!): RepositoryDetails
  }
`;
exports.default = typeDefs;
