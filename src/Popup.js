import React, { useState } from "react";
import "./Popup.css";
import PieChartComponent from "./components/PieChartComponent";
import KoreaMap from "./components/KoreaMap";
import ImageButton from "./ImageButton";

function Popup({ country, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSector, setSelectedSector] = useState(""); // 산업 섹터 상태

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setStep(2);
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="popup-content">
          <div className="button-panel">
            <ImageButton label="산업" onClick={() => handleTopicClick("industry")} />
            <ImageButton label="한류" onClick={() => handleTopicClick("history")} />
            <ImageButton label="환경" onClick={() => handleTopicClick("culture")} />
          </div>

          <div className="info-container">
            <h2>{country}</h2>
            <p>{country}에 대한 간단한 소개가 들어갑니다.</p>
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="popup-content">
          <div className="chart-container">
            {selectedTopic === "industry" && (
              <PieChartComponent
                country={country}
                setSelectedSector={setSelectedSector}
              />
            )}
            {selectedTopic === "history" && <p>{country}의 역사 관련 정보입니다.</p>}
            {selectedTopic === "culture" && <p>{country}의 문화 관련 정보입니다.</p>}
          </div>

          {/* ✅ 항상 한국 지도 표시 */}
          <div className="info-container">
            <KoreaMap
              selectedSector={selectedTopic === "industry" ? selectedSector : null}
            />
          </div>
        </div>
      );
    }

    return null; // fallback
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {renderStepContent()}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
