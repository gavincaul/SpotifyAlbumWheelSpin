import React from "react";
import "./App.css";
import MySpinWheel from "./components/MySpinWheel.tsx";

export default function App() {
  return (
    <div className="App">
      <h1>Spotify Album Wheel Spins</h1>
      <MySpinWheel /> 
      <h2>Spin the wheel and win exciting offers!</h2>
    </div>
  );
}
