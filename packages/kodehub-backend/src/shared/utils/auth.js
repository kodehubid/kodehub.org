import axios from 'axios';
import { createToken } from './jwt';
import models from '../../app/models';

export async function handleGetGithubProfile(token) {
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${ token }`
    }
  });

  const mapUserProfile = ({
    login,
    id,
    avatar_url,
    html_url,
    name,
    blog,
    location,
    email,
    bio
  }) => ({
    username: login,
    email: email,
    fullName: name,
    password: id + Date.now(), // uhh we will never know the password
    userGithubId: id,
    role: 'USER',
    bio: bio,
    profileImageUrl: avatar_url,
    links: {
      github: html_url,
      blog: blog
    },
    address: {
      kotaKabupaten: location
    },
    userProvider: 'GITHUB',
    userProviderToken: token,
    status: ''
  });

  const userProfile = mapUserProfile(data);

  return userProfile;
}

export async function handleGetGithubEmail(token) {
  const { data } = await axios.get('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${ token }`
    }
  });

  return data ? data[0] : {};
}

export async function handleRegisterUser(userData) {
  const user = new models.User(userData);
  await user.save();
  return user;
}

export async function handleCheckRegisterUser(userData) {
  const user = await models.User.findOne({ email: userData.email });
  if (user) {
    const token = handleGenerateUserToken(user);
    user.token = token;
  }
  return user;
}

export async function handleGenerateUserToken(userInfo) {
  const token = await createToken(userInfo, process.env.SECRET);
  return token;
}

/**
 * handleUserAuth will register the user to internal database if not registered
 * otherwise return a token
 * @param {*} githubUser
 * @param {String} githubAccessToken
 * @returns {String} token
 */
export async function handleUserAuth(githubUser, githubAccessToken) {
  if (!githubUser.email) {
    const userEmails = await handleGetGithubEmail(githubAccessToken);
    githubUser.email = userEmails.email;
    githubUser.status = 'VERIFIED';
  }

  let registeredUser = await handleCheckRegisterUser(githubUser);

  if (registeredUser?.token) {
    return registeredUser.token;
  } else {
    registeredUser = await handleRegisterUser(githubUser);
    registeredUser.token = await handleGenerateUserToken(registeredUser);
  }
  // return a token
  return registeredUser.token;
}
