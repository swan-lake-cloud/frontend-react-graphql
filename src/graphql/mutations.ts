import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login {
    login(identifier: "swanronco@gmail.com", password: "password1234") {
      token
      user {
        id
        username
        email
      }
    }
  }
`
