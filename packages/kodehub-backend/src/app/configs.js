const dev = process.env.NODE_ENV === 'development';

const defaultBaseUrl = `http://localhost:${ process.env.PORT || 8080 }`;
/**
 * app
 * general configs for the whole apps
 */
const app = {
  port: process.env.PORT || 8080,
  baseUrl: dev ? defaultBaseUrl : process.env.BASE_URL
};
/**
 * mongodb
 * configs to set some parameter before connect
 */
const mongodb = {
  debug: process.env.MONGODB_DEBUG || false
};
/**
 * express
 * configs to set some middlewares parameter
 */
const express = {
  requestLimit: {
    // limit http request to the server
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 900 // limit each IP to 900 requests per windowMs (60 request / minute)
  }
};
/**
 * githubOAuth
 * configs to be authenticated to github apis
 */
const githubOAuth = {
  githubClient: process.env.GITHUB_KEY,
  githubSecret: process.env.GITHUB_SECRET,
  baseURL: app.baseUrl,
  loginURI: '/auth/github',
  callbackURI: '/auth/github/callback',
  scope: 'user:email',
  allow_signup: true
};

// register sub config
const configs = {
  app,
  mongodb,
  express,
  githubOAuth
};
// one point to exports all config
export default configs;
