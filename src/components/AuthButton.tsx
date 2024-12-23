import React from "react";
const AuthButton = () => {
  
  const handleLoginClick = async () => {
    const currentURL = window.location.href;
    try {
      const response = await fetch(`https://spotify-album-wheel-spin.vercel.app/api/auth?redirect_uri=${encodeURIComponent(currentURL)}`);
      const authUrl = response.url; 
      window.location.href = authUrl; 
    } catch (error) {
      console.error('Error redirecting to Spotify:', error);
    }
  };


  return (
    <button onClick={handleLoginClick}>Login with Spotify</button>
  );
};



export default AuthButton;