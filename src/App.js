import React, { useState, useEffect } from "react";
import "./App.css";
import MySpinWheel from "./components/MySpinWheel.tsx";
import AuthButton from "./components/AuthButton.tsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [codeValue, setCodeValue] = useState(null);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      setCodeValue(code);
      setIsAuthenticated(true); // If there's a token, the user is authenticated
    }
  }, []);

  return (
    <div className="App">
      <h1>Spotify Album Wheel Spinner</h1>

      {isAuthenticated ? (
        // Show the SpinWheel only after authentication
        <MySpinWheel code={codeValue} />
      ) : (
        // Show the login button if not authenticated
        <div>
          <p>Please log in to spin the wheel!</p>
          <AuthButton /> {/* Button that triggers the OAuth flow */}
        </div>
      )}
      <footer>
        <p>
          Music data provided by{" "}
          <a href="https://getsongbpm.com" target="_blank" rel="noreferrer">
            GetSongBPM
          </a>
        </p>
      </footer>
    </div>
  );
}
