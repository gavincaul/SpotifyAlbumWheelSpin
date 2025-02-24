import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (window.location.href.includes("localhost")) {
  root.render(<App />); // No StrictMode on localhost
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ); // StrictMode for production-like environments
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
