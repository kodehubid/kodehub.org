import configs from './configs';
import axios from 'axios';

// make an authentication request to github
//  github.com/login/oauth/authorize?client_id=59c245d2ae52d24999fd&redirect_uri=http://localhost:8080/auth/github/callback
// then after user success authorization on github, it will redirect to the below callback link
export function useOauthGithub(app) {
  app.get('/auth/github/callback', async function(req, res) {
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

      res.redirect(
        301,
        `http://localhost:8080/wellcome?token=${ data.access_token }`
      );
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get('/wellcome', async function(req, res) {
    res.send('Wellcome');
  });
}
