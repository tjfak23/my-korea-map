// src/components/ImageButton.jsx
import React from "react";
import "./Popup.css";

function ImageButton({ label, onClick }) {
  return (
    <div className="image-button-wrapper" onClick={onClick}>
      <div className="image-button-box" />
      <div className="image-button-label">{label}</div>
    </div>
  );
}

export default ImageButton;
