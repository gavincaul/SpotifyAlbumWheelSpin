import React from "react";
const AuthButton = () => {
  
  const handleLoginClick = async () => {
    const currentURL = window.location.href;
    try {
      const response = await fetch(`https://spotify-album-wheel-spin.vercel.app/api/auth?redirect_uri=${encodeURIComponent(currentURL)}`);
      const data = await response.json(); 
      window.location.href = data.authUrl; 
    } catch (error) {
      console.error('Error redirecting to Spotify:', error);
    }
  };


  return (
    <button onClick={handleLoginClick}>Login with Spotify</button>
  );
};



export default AuthButton;