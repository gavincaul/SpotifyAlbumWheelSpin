import React, { useState, useEffect } from "react";
import "./App.css";
import MySpinWheel from "./components/MySpinWheel.tsx";
import AuthButton from "./components/AuthButton.tsx"; // Assuming you created the button in a separate component

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [codeValue, setCodeValue] = useState(null);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      setCodeValue(code)
      setIsAuthenticated(true); // If there's a token, the user is authenticated
    }
  }, []);

  return (
    <div className="App">
      <h1>Spotify Album Wheel Spins</h1>
      
      {isAuthenticated ? (
        // Show the SpinWheel only after authentication
        <MySpinWheel code = {codeValue}/>
      ) : (
        // Show the login button if not authenticated
        <div>
          <p>Please log in to spin the wheel!</p>
          <AuthButton /> {/* Button that triggers the OAuth flow */}
        </div>
      )}
      
      <h2>Spin the wheel and win exciting offers!</h2>
    </div>
  );
}
