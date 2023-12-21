import { Repository, RepositoryDetails } from "../interface/repository";
import { checkHeader } from "../services/checkHeader";
import { getRepositoriesInfoInBatches, getRepositoryDetails } from "../services/repository";


const resolvers = {
  Query: {
    // This function will return repositoryList in bacthes of 2;
    /**
     * @param ownerName
     * @param repoList in an array
     * @param concurrent
     * @returns Repository[]
     */
    repositoryList: async (_:any , __: any, context: any): Promise<Repository[]> => {
      // Check header if token and owner name is correctly passed
      if(!checkHeader(context)){
        throw "Invalid Header"
      }
      
      // Gets the list of repo in batches
      const result = await getRepositoriesInfoInBatches(context.headers.ownername, ['Repo1', 'Repo2', 'Repo3'], 2, context.headers.developertoken);
      return result;
    },

    // This function will return repositoryDetails;
    /**
     * @param ownerName
     * @param repoName in an array
     * @returns RepositoryDetails
     */
    repositoryDetails: async (_: any, { repoName }: { repoName: string }, context: any): Promise<(Repository & RepositoryDetails) | null> => {
      // Check header if token and owner name is correctly passed
      if(!checkHeader(context)){
        throw "Invalid Header"
      }

      // Return all the required details for repository
      return getRepositoryDetails(context.headers.ownername, repoName, context.headers.developertoken)
    },
  },
};

export default resolvers;
