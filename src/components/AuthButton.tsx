import React from "react";
const AuthButton = () => {
  const clientID = process.env.CLIENT_ID || "e161a092c62e4325bac9a70b5bfcbdb3";
  const redirect_uri = process.env.REDIRECT_URI || "https://gavincaul.github.io/SpotifyAlbumWheelSpin/";
  const scope = "user-library-read"; 
  
  const handleLoginClick = () => {
    // Spotify's authorization URL
    console.log(redirect_uri)
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}`;
    // Redirect to Spotify's authorization page
    window.location.href = authUrl;
  };


  return (
    <button onClick={handleLoginClick}>Login with Spotify</button>
  );
};



export default AuthButton;