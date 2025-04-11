import React, { useState } from "react";
import "./Popup.css";
import PieChartComponent from "./components/PieChartComponent";
import KoreaMap from "./components/KoreaMap";
import ImageButton from "./ImageButton";
import CultureChartComponent from "./components/CultureChartComponent";

function Popup({ country, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSector, setSelectedSector] = useState(""); // 산업 섹터 상태

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setStep(2);
  };
  <div className={step === 2 ? "popup-content step-two" : "popup-content"}></div>
  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="popup-content">
          <div className="button-panel">
            <ImageButton label="INDUSTRY" onClick={() => handleTopicClick("industry")} />
            <ImageButton label="HISTORY" onClick={() => handleTopicClick("history")} />
            <ImageButton label="CULTURE" onClick={() => handleTopicClick("culture")} />
          </div>

          <div className="info-container">
            <h2>{country}</h2>
            <p>{country}</p>
          </div>
        </div>
      );
    }

    const handleBack = () => {
      setStep(1);
      setSelectedTopic(null);
    };

    if (step === 2) {
      const handleBack = () => {
        setStep(1);
        setSelectedTopic(null);
        setSelectedSector(null);
      };
    
      return (
        <>
          <div className="popup-content">
            <div className="chart-container">
              {selectedTopic === "industry" && (
                <PieChartComponent
                  country={country}
                  setSelectedSector={setSelectedSector}
                />
              )}
              {selectedTopic === "history" && (
                <p></p>
              )}
              {selectedTopic === "culture" && <CultureChartComponent />}
            </div>
    
            <div className="info-container">
              {selectedTopic === "industry" && (
                <KoreaMap selectedSector={selectedSector} />
              )}
    
              {selectedTopic === "culture" && (
                <>
                  <h2>Influence of Korean Wave content in the UK</h2>
                  <p>
                  Korean lifestyle content such as food, beauty, and fashion
                  It is highly popular in the UK.
                  </p>
                </>
              )}
    
              {selectedTopic === "history" && (
                <>
                  <h2>{country}history</h2>
                  <p>
                  Britain has a long imperial history and has been a center of diverse cultural exchanges.
                  </p>
                </>
              )}
            </div>
          </div>
    
          {/* ✅ 버튼 2개를 가로로 나란히 배치 */}
          <div className="button-row">
            <button className="back-button" onClick={handleBack}>
              뒤로가기
            </button>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      );
    }
    
    

    
    

    return null; // fallback
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {renderStepContent()}
      
      </div>
    </div>
  );
}

export default Popup;
