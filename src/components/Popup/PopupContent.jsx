// src/components/PopupContent.jsx
import React from "react";
import PieChartComponent from "./PieChartComponent";
import ImageButton from "./ImageButton";
import "./Popup.css";

function PopupContent({ country, activeTab, setActiveTab }) {
  return (
    <div className="popup-content">
      {/* 좌측 버튼 3개 */}
      <div className="button-panel">
        <ImageButton label="산업" onClick={() => setActiveTab("industry")} />
        <ImageButton label="역사" onClick={() => setActiveTab("history")} />
        <ImageButton label="문화" onClick={() => setActiveTab("culture")} />
      </div>

      {/* 우측 내용 */}
      <div className="info-panel">
        <h2>{country}</h2>
        {activeTab === "industry" && (
          <div className="chart-container">
            <PieChartComponent country={country} />
          </div>
        )}
        {activeTab === "history" && <p>{country}의 역사적 배경이 여기에 표시됩니다.</p>}
        {activeTab === "culture" && <p>{country}의 문화 정보가 여기에 표시됩니다.</p>}
      </div>
    </div>
  );
}

export default PopupContent;
