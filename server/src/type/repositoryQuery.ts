// schema.js
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Repository {
    name: String!
    size: Int!
    owner: String!
  }

  type RepositoryDetails {
    name: String
    size: Int
    owner: String
    private: Boolean
    numberOfFiles: Int
    yamlContent: String
    activeWebhooks: Int
  }

  type Query {
    repositoryList: [Repository]!
  }
  
  type Query {
    repositoryDetails(repoName: String!): RepositoryDetails
  }
`;

export default typeDefs;
