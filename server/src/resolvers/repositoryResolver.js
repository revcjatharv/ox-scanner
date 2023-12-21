"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Octokit } = require('@octokit/rest');
const fetch = require('cross-fetch');
// Replace 'YOUR_ACCESS_TOKEN' with the actual personal access token
const accessToken = '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';
const octokit = new Octokit({
    auth: accessToken,
    request: { fetch }, // Pass the fetch implementation here
});
const repositories = [
    { name: 'repo1', size: 100, owner: 'user1' },
    { name: 'repo2', size: 200, owner: 'user2' },
    // Add more repositories as needed
];
function getRepositoryInfo(owner, repoName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield octokit.repos.get({
                owner,
                repo: repoName,
            });
            const { data } = response;
            // Extract relevant information from the response data
            const repositoryInfo = {
                name: data.name,
                size: data.size,
                owner: owner,
                // Add other fields as needed
            };
            return repositoryInfo;
        }
        catch (error) {
            console.error(`Error fetching repository information for ${repoName}:`, error);
            throw error;
        }
    });
}
function getRepositoriesInfoInBatches(owner, repoNames, batchSize = 2) {
    return __awaiter(this, void 0, void 0, function* () {
        const batches = [];
        for (let i = 0; i < repoNames.length; i += batchSize) {
            const currentBatch = repoNames.slice(i, i + batchSize);
            batches.push(currentBatch);
        }
        const results = [];
        for (const batch of batches) {
            const promises = batch.map((repoName) => __awaiter(this, void 0, void 0, function* () {
                const repositoryInfo = yield getRepositoryInfo(owner, repoName);
                return repositoryInfo;
            }));
            // Limit the number of concurrent requests using Promise.all with setTimeout
            const batchResults = yield Promise.all(promises.map((promise) => promise.then((result) => new Promise((resolve) => setTimeout(() => resolve(result), 1000)))));
            results.push(...batchResults);
        }
        return results;
    });
}
function getRepositoryDetails(owner, repoName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get basic repository information
            const repoResponse = yield octokit.repos.get({
                owner,
                repo: repoName,
            });
            const repoData = repoResponse.data;
            // Get repository details
            const repoDetails = {
                name: repoData.name,
                size: repoData.size,
                owner: repoData.owner.login,
                private: repoData.private,
            };
            // Get the number of files in the repository
            const contentsResponse = yield octokit.repos.getContent({
                owner,
                repo: repoName,
                path: '', // Root path
            });
            const numberOfFiles = contentsResponse.data.length;
            // Get the content of one YAML file (assuming there is at least one YAML file)
            const yamlFile = contentsResponse.data.find((file) => file.name.endsWith('.yml'));
            let yamlContent = null;
            if (yamlFile) {
                const yamlFileContent = yield octokit.repos.getContent({
                    owner,
                    repo: repoName,
                    path: yamlFile.path,
                });
                yamlContent = Buffer.from(yamlFileContent.data.content, 'base64').toString('utf-8');
            }
            // Get active webhooks
            const webhooksResponse = yield octokit.repos.listWebhooks({
                owner,
                repo: repoName,
            });
            const activeWebhooks = webhooksResponse.data.map((webhook) => ({
                url: webhook.url,
                events: webhook.events,
            }));
            const responseData = Object.assign(Object.assign({}, repoDetails), { numberOfFiles,
                yamlContent, activeWebhooks: activeWebhooks.length });
            console.log("THIS IS ME RESPONSE DATA >>>>>", responseData);
            return responseData;
        }
        catch (error) {
            console.error(`Error fetching repository details for ${repoName}:`, error);
            throw error;
        }
    });
}
const resolvers = {
    Query: {
        repositoryList: () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield getRepositoriesInfoInBatches('revcjatharv', ['CRUD_BANNER_APP', 'CRUD_BANNER', 'GOT-WEB'], 2);
            return result;
        }),
        repositoryDetails: (_, { repoName }) => __awaiter(void 0, void 0, void 0, function* () {
            return getRepositoryDetails('revcjatharv', 'CRUD_BANNER_APP');
        }),
    },
};
exports.default = resolvers;
