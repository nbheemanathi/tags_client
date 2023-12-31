import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export const FETCH_CONTACTS = gql`
  {
    getUsers {
      email
      firstName
      id
      lastName
    }
  }
`;
export const ADD_CONTACT_MUTATION = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    addUser(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      id
      firstName
      lastName
      email     
    }
  }
`;
export const UPDATE_CONTACT_MUTATION = gql`
  mutation updateUser(
    $userId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUser(
      userInput: {
        userId: $userId
        firstName: $firstName
        lastName: $lastName
        email: $email    
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_CONTACT_MUTATION = gql`
  mutation ($userId: String) {
    deleteUser(userId: $userId) {
      id
      firstName
      lastName
      email
    }
  }
`;