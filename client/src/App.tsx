// App.tsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import RepoList from './container/RepoList';
import RepoDetails from './container/RepoDetails';
import Loader from './container/Loader';
import { BrowserRouter as Router, Route, HashRouter, Routes } from 'react-router-dom';


const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositoryList {
      name
      size
      owner
    }
  }
`;

const App: React.FC = () => {
  return (
        <HashRouter>
          <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/repo/:repoName"  element={<RepoDetails />} />
          </Routes>
        </HashRouter>
  );
};

export default App;
