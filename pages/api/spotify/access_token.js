var SpotifyWebApi = require("spotify-web-api-node");

export default async function handler(req, res) {
  const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });
  if (req.method === "POST") {
    const { refresh_token } = req.body;

    spotify.setRefreshToken(refresh_token);

    const auth = await spotify.refreshAccessToken();

    try {
      res.status(200).json({
        accessToken: auth.body.access_token,
      });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}
