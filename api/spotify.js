const spotify = require("spotify-api.js");
const { Client } = spotify;

export default async function getAlbums(req, res) {
    console.log("req", req, "\nres", res)
    const allowedOrigins = ['http://localhost:8888', 'https://gavincaul.github.io'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Authorization code is required." });
    }

    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirect_uri = origin.includes("localhost") ? process.env.LOCAL_REDIRECT_URI : process.env.REDIRECT_URI;
    console.log(redirect_uri)

    try {
        const client = await Client.create({
            token: {
                clientID: clientID,         
                clientSecret: clientSecret,
                code: code,
                redirectURL: redirect_uri 
            }
        });
       
        const savedAlbums = await client.user.getSavedAlbums();
        const albums = savedAlbums.map(savedAlbum => savedAlbum.item); 
    
        return res.status(200).json(albums);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
