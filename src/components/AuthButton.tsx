import React from "react";
const AuthButton = () => {
  const clientID = "e161a092c62e4325bac9a70b5bfcbdb3";
  const redirectUri = "http://localhost:8888/callback"; 
  const scope = "user-library-read"; 

  const handleLoginClick = () => {
    // Spotify's authorization URL
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    // Redirect to Spotify's authorization page
    window.location.href = authUrl;
  };


  return (
    <button onClick={handleLoginClick}>Login with Spotify</button>
  );
};



export default AuthButton;