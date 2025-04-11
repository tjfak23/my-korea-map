// src/components/Popup.jsx
import React, { useState } from "react";
import "./Popup.css";
import PopupContent from "./PopupContent";

function Popup({ country, onClose }) {
  const [activeTab, setActiveTab] = useState("industry");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <PopupContent country={country} activeTab={activeTab} setActiveTab={setActiveTab} />
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Popup;
