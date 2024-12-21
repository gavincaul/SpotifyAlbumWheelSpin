const spotify = require("spotify-api.js");
const { Client } = spotify;

export default async function getAlbums(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://gavincaul.github.io');  // Allow requests from this origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow headers

    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Authorization code is required." });
    }

    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;

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
        console.log("Here are the albyms:", albums)
        return res.status(200).json(albums);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
