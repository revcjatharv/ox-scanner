// RepoDetails.tsx
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from './Loader';
import { GITHUB_CONST } from '../constant/github';


interface RepoDetailsProps {
}


interface RepoDetails {
  repository: {
    name: string;
    size: number;
    owner: string;
    isPrivate: boolean;
    numberOfFiles: number;
    yamlContent: string | null;
    activeWebhooks: { url: string; events: string[] }[];
  } | null;
}


const GET_REPOSITORIES_DETAIL = gql`
  query GetRepositoriesDetail($repoName: String!) {
    repositoryDetails (repoName: $repoName) {
      name
      size
      owner
      private
      numberOfFiles
      yamlContent
      activeWebhooks
    }
  }
`;

const RepoDetails: React.FC<RepoDetailsProps> = () => {
  const navigate = useNavigate();
  const { repoName } = useParams()

  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES_DETAIL, {
    variables: { repoName},
    context: {
      headers: {
        ownername: GITHUB_CONST.owner,
        developertoken: GITHUB_CONST.developerToken,
      },
    },
  });

  useEffect(() => {
    refetch({repoName})
  }, [repoName])

  const goBack = () => {
    navigate('/')
  }

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='page-container'>
      <button className= "view-more" onClick={goBack}>
        Back
      </button>
      <h1 className='header-name'>Repository Details</h1>

      {data && data.repositoryDetails ? (
        <div className="data-container">
          <p><strong>Name:</strong> {data.repositoryDetails.name}</p>
          <p><strong>Size:</strong> {data.repositoryDetails.size}</p>
          <p><strong>Owner:</strong> {data.repositoryDetails.owner}</p>
          <p><strong>Private: </strong>{data.repositoryDetails.private ? 'Yes' : 'No'}</p>
          <p><strong>Number of Files:</strong> {data.repositoryDetails.numberOfFiles}</p>
          <p><strong>YAML Content:</strong> {data.repositoryDetails.yamlContent}</p>
          <p><strong>
            Active Webhooks: </strong>{data.repositoryDetails.activeWebhooks}
          </p>
        </div>
      ) : (
        <p>No repository selected.</p>
      )}
    </div>
  );
};

export default RepoDetails;
