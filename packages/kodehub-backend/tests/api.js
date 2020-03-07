import axios from 'axios';
const API_URL = 'http://localhost:8080/graphql';

let savedToken;
export const loginAndGetToken = async ({ login, password }) => {
  if (savedToken) return savedToken;
  const {
    data: {
      data: {
        signIn: { token }
      }
    }
  } = await signIn({ login, password });
  savedToken = token;
  return token;
};

export const getUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
          query ($id: ID!) {
            getUser(id: $id) {
              id
              role
              username
            }
          }
        `,
      variables
    },
    {
      headers: {
        'x-token': token
      }
    }
  );

export const getUsers = async token =>
  axios.post(
    API_URL,
    {
      query: `
      query {
        getUsers {
          id
          role
          username
        }
      }
    `
    },
    {
      headers: {
        'x-token': token
      }
    }
  );

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables
  });

export const deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables
    },
    {
      headers: {
        'x-token': token
      }
    }
  );
