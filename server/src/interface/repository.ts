/**
 * Repository List Interface for Listing required repo details.
 */
export interface Repository {
  name: string;
  size: number;
  owner: string;
}

/**
 * RepositoryDetails Interface for details in repo.
 */
export interface RepositoryDetails {
  name: string;
  size: number;
  owner: string;
  private: boolean;
  numberOfFiles: number;
  yamlContent: string;
  activeWebhooks: number;
}