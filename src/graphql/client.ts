import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/jaxrs-liquibase-graphql-api-0.0.1-SNAPSHOT/api/graphql',
  }),
  cache: new InMemoryCache(),
})

