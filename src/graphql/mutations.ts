import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      firstName
      lastName
      username
      email
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
		login(identifier: $identifier, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`
export const LOGOUT_MUTATION = gql`
  mutation Logout($token: String!) {
      logout(token: $token) {
			success
			message
    }
  }
`
