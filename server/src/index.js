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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
// import { loggingMiddleware } from './interceptors/logging';
const repositoryResolver_1 = __importDefault(require("./resolvers/repositoryResolver"));
const repositoryQuery_1 = __importDefault(require("./type/repositoryQuery"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: repositoryQuery_1.default,
        resolvers: repositoryResolver_1.default,
    });
    yield server.start(); // Wait for the server to start
    const app = (0, express_1.default)();
    server.applyMiddleware({ app });
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/graphql`);
    });
});
startServer();
