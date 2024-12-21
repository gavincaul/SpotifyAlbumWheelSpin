import React from "react";

const ImageOverlay = ({ src, onClose }) => {
    const handleClick = (e) => {
        if (e.target.tagName === "IMG") {
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
            maxWidth: "90%",
            maxHeight: "90%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
          }}
        />
      </div>
    );
  };

  export default ImageOverlay;