import React from "react";
const AuthButton = () => {
  const clientID = process.env.CLIENT_ID || "e161a092c62e4325bac9a70b5bfcbdb3";
  const scope = "user-library-read"; 
  
  const handleLoginClick = () => {
    const currentURL = window.location.href;
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&redirect_uri=${encodeURIComponent(currentURL)}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };


  return (
    <button onClick={handleLoginClick}>Login with Spotify</button>
  );
};



export default AuthButton;