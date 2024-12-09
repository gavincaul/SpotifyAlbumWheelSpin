import { Client } from 'spotify-api.js';

export default async function getAlbums(req, res) {
    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    
    try {
        const client = await Client.create({
            token: { clientID, clientSecret },
            redirectURL: 'http://localhost:8888/callback',  
        });

        const userData = await client.user.getSavedAlbums();  // Example API call
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
