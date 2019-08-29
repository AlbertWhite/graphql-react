import axios from 'axios';
import {GET_ISSUES_OF_REPOSITORY, ADD_STAR, REMOVE_STAR} from './graphQl'

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

export const addStarToRepository = repositoryId => {
  return axiosGitHubGraphQL.post('', {
    query: ADD_STAR,
    variables: { repositoryId },
  });
};


export const removeStarFromRepository = repositoryId => {
  return axiosGitHubGraphQL.post('', {
    query: REMOVE_STAR,
    variables: { repositoryId },
  });
};


export const getIssuesOfRepository = (path, cursor) => {
  const [owner, repository] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { owner, repository, cursor },
  });
};

export const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;
  if (!cursor) {
    return {
      repository: data.repository,
      errors,
    };
  }

  const { edges: oldIssues } = state.repository.issues;
  const { edges: newIssues } = data.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  return {
    repository: {
      ...data.repository,
      issues: {
        ...data.repository.issues,
        edges: updatedIssues,
      },
    },
    errors,
  };
};

export const resolveAddStarMutation = mutationResult => state => {
  const {
    viewerHasStarred,
  } = mutationResult.data.data.addStar.starrable;
  const { totalCount } = state.repository.stargazers;

  return {
    ...state,
    repository: {
      ...state.repository,
      viewerHasStarred,
      stargazers: {
        totalCount: totalCount + 1,
      },
    },
  }
};

export const resolveRemoveStarMutation = mutationResult => state => {
  const {
    viewerHasStarred,
  } = mutationResult.data.data.removeStar.starrable;

  const { totalCount } = state.repository.stargazers;

  return {
    ...state,
    repository: {
      ...state.repository,
      viewerHasStarred,
      stargazers: {
        totalCount: totalCount - 1,
      },
    },
  }
};