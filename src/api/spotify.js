const spotify = require("spotify-api.js")
const { Client } = spotify


export default async function getAlbums(req, res) {
    const { code } = req.query;
    console.log("are we getting here")
    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required.' });
    }

    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    try {
        const client = await Client.create({
            token: { clientID, clientSecret },
            redirectURL: process.env.REDIRECT_URI,
        });

        await client.auth({
            code,
            redirectURL: process.env.REDIRECT_URI, 
        });

        const savedAlbums = await client.user.getSavedAlbums();

        return res.status(200).json(savedAlbums);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
