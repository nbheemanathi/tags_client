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
      phone
    }
  }
`;
export const ADD_CONTACT_MUTATION = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: Float
  ) {
    addUser(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
      }
    ) {
      id
      firstName
      lastName
      email     
      phone
    }
  }
`;
export const UPDATE_CONTACT_MUTATION = gql`
  mutation updateUser(
    $userId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: Float
  ) {
    updateUser(
      userInput: {
        userId: $userId
        firstName: $firstName
        lastName: $lastName
        email: $email    
        phone: $phone
      }
    ) {
      id
      firstName
      lastName
      email
      phone
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