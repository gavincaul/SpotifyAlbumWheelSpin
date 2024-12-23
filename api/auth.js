export default function handler(req, res) {
    const allowedOrigins = ['http://localhost:8888', 'https://gavincaul.github.io'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    const clientID = process.env.CLIENT_ID;
    const scope = 'user-library-read';
    const redirectURI = req.query.redirect_uri || 'http://localhost:8888'; 
  
    if (!clientID) {
      return res.status(500).json({ error: 'Client ID not found' });
    }
  
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&scope=${encodeURIComponent(scope)}`;
    res.status(200).json({ authUrl }); 
  }