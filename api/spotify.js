const spotify = require("spotify-api.js");
const { Client } = spotify;
const fetch = require("node-fetch"); 

export default async function getAlbums(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Authorization code is required." });
    }

    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;

    try {
        // Step 1: Exchange the code for an access token
        const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: redirect_uri,
            }),
        });
        const client = await Client.create({
            token: {
                clientID: clientID, // Your spotify application client id.
                clientSecret: clientSecret, // Your spotify application client secret.
                code: code, // The code search query from the web redirect. Do not use this field if your aim is to refresh the token.
                redirectURL: redirect_uri  // The redirect url which you have used when redirected to the login page.
            }
        });
        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            return res.status(500).json({ error: errorData });
        }
        
        const { access_token } = await tokenResponse.json();
        console.log("redirect URI:", redirect_uri)
        console.log("Access token:", access_token); // Ensure this is valid
        console.log("Client:", client); // Check if client is properly initialized
        console.log("Client.user:", client.user); // Check if user object exists
        return res.status(200)
        const savedAlbums = await client.user.getSavedAlbums();
        return res.status(200).json(savedAlbums);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
