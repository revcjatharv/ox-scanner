import { Repository } from "../interface/repository";
const { Octokit } = require('@octokit/rest');
const crossfetch = require('cross-fetch');

async function initializeOctoKit(accessToken:string){
  const octokit = await new Octokit({
    auth: accessToken,
    request: { fetch: crossfetch }, // Pass the fetch implementation here
  });

  return octokit;
}

async function getRepos(octokit:any, owner: string, repoName: string){
  const response = await octokit.repos.get({
    owner,
    repo: repoName,
    branch: "main", // Replace with the desired branch name
  });

  const { data } = response;
  console.log("default_branch", data.default_branch)
    // Extract relevant information from the response data
    const repositoryInfo = {
      name: data.name,
      size: data.size,
      owner: owner,
      private: data.private,
      // Add other fields as needed
    };
  return repositoryInfo;
}

async function getContent(octokit:any, owner: string, repoName: string, path='') {
  const contentsResponse = await octokit.repos.getContent({
    owner,
    repo: repoName,
    path, // Root path
  });

  return contentsResponse;
}

async function getContentRecurisve(octokit: any, owner: string, repoName: string, path = '') {
  const contentsResponse = await getContent(
    octokit,
    owner,
    repoName,
    path, // Root path
  );

  const files = [];
  for (const item of contentsResponse.data) {
    console.log("Camme in recursion getContentRecurisve")
    if (item.type === 'file') {
      files.push(item);
    } else if (item.type === 'dir') {
      const subdirectoryFiles:any = await getContentRecurisve(octokit, owner, repoName, item.path);
      files.push(...subdirectoryFiles);
    }
  }

  return files;
}

async function findYamlFile(octokit: any, owner: string, repoName: string, path = '') {
  const contentsResponse = await getContent(octokit, owner, repoName, path);

  for (const file of contentsResponse.data) {
    console.log("Came in findYamlFile recursion")
    if (file.type === 'file' && (file.name.endsWith('.yml')|| file.name.endsWith('.yaml'))) {
      const yamlFileContent = await getContent(octokit, owner, repoName, file.path);
      const yamlContent = Buffer.from(yamlFileContent.data.content, 'base64').toString('utf-8');
      return { yamlFile: file, yamlContent };
    } else if (file.type === 'dir') {
      const result:any = await findYamlFile(octokit, owner, repoName, file.path);
      if (result) {
        return result; // Found in a subdirectory
      }
    }
  }

  return { yamlFile: null, yamlContent:null };
}


async function getWebhook(octokit:any, owner: string, repoName: string) {
  // Get active webhooks
  const webhooksResponse = await octokit.repos.listWebhooks({
    owner,
    repo: repoName,
  });

  return webhooksResponse;
}


export async function getRepositoryInfo(owner: any, repoName: any, accessToken: any) {
  try {
    const octokit = await initializeOctoKit(accessToken)
    const response = await getRepos(octokit, owner, repoName);
    return response;
  } catch (error) {
    console.error(`Error fetching repository information for ${repoName}:`, error);
    throw error;
  }
}

// Get Repo Info in batch size
export async function getRepositoriesInfoInBatches(owner: string, repoNames: string[], batchSize = 2, accessToken: string): Promise<Repository[]> {
  const batches = [];
  for (let i = 0; i < repoNames.length; i += batchSize) {
    const currentBatch = repoNames.slice(i, i + batchSize);
    batches.push(currentBatch);
  }

  const results: any = [];

  for (const batch of batches) {
    const promises = batch.map(async (repoName: any) => {
      const repositoryInfo = await getRepositoryInfo(owner, repoName, accessToken);
      return repositoryInfo;
    });

    // Limit the number of concurrent requests using Promise.all with setTimeout
    const batchResults = await Promise.all(
      promises.map((promise) =>
        promise.then((result) => new Promise((resolve) => setTimeout(() => resolve(result), 1000)))
      )
    );

    results.push(...batchResults);
  }

  return results;
}

// Get Repo Details in batch size
export async function getRepositoryDetails(owner: any, repoName: any, accessToken:any) {
  try {
    // Get basic repository information

    const octokit = await initializeOctoKit(accessToken);
    const [repoDetails, webhooksResponse] :any = await Promise.allSettled(
      [
        getRepos(octokit, owner, repoName),
        getWebhook(octokit, owner, repoName)
      ]
    )
    console.log("RepoDetails Resolved")

    let files:any = await getContentRecurisve(octokit, owner, repoName, '');
    let numberOfFiles = files.length;

    const { yamlContent } = await findYamlFile(octokit, owner, repoName);

    const activeWebhooks = webhooksResponse.value.data.map((webhook: any) => ({
      url: webhook.url,
      events: webhook.events,
    }));
    const responseData: any = {
      ...repoDetails.value,
      numberOfFiles,
      yamlContent,
      activeWebhooks: activeWebhooks.length,
    }
    // console.log("THIS IS ME RESPONSE DATA >>>>>", responseData)
    return responseData;
  } catch (error) {
    console.error(`Error fetching repository details for ${repoName}:`, error);
    throw error;
  }
}
