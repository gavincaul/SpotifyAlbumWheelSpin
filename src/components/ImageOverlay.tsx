import React from "react";

const ImageOverlay = ({ src, onClose }) => {
    const handleClick = (e) => {
        if (e.target.tagName === "IMG" || e.target.id === "albumtitle") {
            window.location.href = src[1]; 
        } else {
            onClose(); 
        }
    };
  
    return (
      <div
        onClick={handleClick}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",  
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
      >
        <img
          src={src[0]}
          alt="Preview"
          style={{
            maxWidth: "50%",
            maxHeight: "50%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
          }}
        />
        <p id="albumtitle" style={{ color: "black", fontSize: "40px", marginTop: "10px", fontWeight: "bold" }}>
          {src[2]}
        </p>
      </div>
    );
};

export default ImageOverlay;
