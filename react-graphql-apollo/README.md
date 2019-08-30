Tuto: https://www.robinwieruch.de/react-graphql-apollo-tutorial

##### Dependency

- apollo-link-http: config request url and token
- apollo-cache-inmemory: cache for the data
- apollo-client: create apollo client
- graphql-tag: parse graphql string
- graphql
- react-apollo: apollo client for react
- apollo-link-error: catch error on query
- apollo-link: like store enhencers, used to config extension for apolloClient

##### Notes

- The Apollo Client was provided in a previous section with React's Context API in a top level component. You have implicit access to it, but never use it directly for standard queries and mutations. Use **Query** component instead to query the data on component mount.

- `<Query>` use children as render props.

(react apollo api)[https://www.apollographql.com/docs/react/api/react-apollo/#query]
