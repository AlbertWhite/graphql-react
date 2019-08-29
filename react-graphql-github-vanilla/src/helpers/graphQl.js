export const GET_ISSUES_OF_REPOSITORY = `
query ($owner: String!, $repository: String!, $cursor: String) {
  repository(owner: $owner, name: $repository) {
    id
    name
    url
    stargazers {
      totalCount
    }
    viewerHasStarred
    issues(first: 5, after: $cursor) {
      edges {
        node {
          id
          title
          url
          reactions(last: 3) {
            edges {
              node {
                id
                content
              }
            }
          }
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

export const ADD_STAR = `
  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = `
  mutation ($repositoryId: ID!) {
    removeStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;