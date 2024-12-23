export default function handler(req, res) {
    const clientID = process.env.CLIENT_ID;
    const scope = 'user-library-read';
    const redirectURI = req.query.redirect_uri || 'http://localhost:8888'; 
  
    if (!clientID) {
      return res.status(500).json({ error: 'Client ID not found' });
    }
  
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&scope=${encodeURIComponent(scope)}`;
    res.redirect(authUrl); 
  }