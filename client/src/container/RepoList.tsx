// RepoList.tsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { GITHUB_CONST } from '../constant/github';

interface RepoListProps {
}

interface Repository {
  name: string;
  size: number;
  owner: string;
}


const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositoryList {
      name
      size
      owner
    }
  }
`;


const RepoList: React.FC<RepoListProps> = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES,{
    context: {
      headers: {
        ownername: GITHUB_CONST.owner,
        developertoken: GITHUB_CONST.developerToken,
      },
    },
  });
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const navigate = useNavigate();
  const viewMore = (repo: any) => {
    navigate(`/repo/${repo.name}`)
  }

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
<div>
        <h1 className='header-name'>Repository List</h1>
        <div className='table-container'>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.repositoryList.map((repo: any) => (
              <tr key={repo.name}>
                <td>{repo.name}</td>
                <td>{repo.size}</td>
                <td>{repo.owner}</td>
                <td>
                  <button className='view-more' onClick={() => viewMore(repo)}>View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
  );
};

export default RepoList;
