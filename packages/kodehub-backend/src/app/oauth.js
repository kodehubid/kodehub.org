import configs from './configs';
import axios from 'axios';
import { handleGetGithubProfile, handleUserAuth } from '../shared/utils/auth';

export async function githubOAuthCallback(req, res) {
  try {
    const requestCode = req.query.code;
    const requestAuth = await axios({
      url: `https://github.com/login/oauth/access_token?client_id=${ configs.githubOAuth.githubClient }&client_secret=${ configs.githubOAuth.githubSecret }&code=${ requestCode }`,
      method: 'post',
      headers: {
        accept: 'application/json'
      }
    });

    const { data } = requestAuth;
    const userProfile = await handleGetGithubProfile(data.access_token);
    const generatedUserToken = await handleUserAuth(
      userProfile,
      data.access_token
    );

    res.cookie('X-token', generatedUserToken);
    res.redirect(
      301,
      `${ configs.app.baseUrl }/wellcome?token=${ generatedUserToken }`
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
}
