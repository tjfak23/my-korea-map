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
            {selectedTopic === "history" && (
              <p>{country}의 역사 관련 정보입니다.</p>
            )}
            {selectedTopic === "culture" && (
              <CultureChartComponent />
            )}
          </div>
    
          {/* ✅ 오른쪽 패널: 조건에 따라 지도 또는 설명 */}
          <div className="info-container">
            {selectedTopic === "industry" && (
              <KoreaMap selectedSector={selectedSector} />
            )}
    
            {selectedTopic === "culture" && (
              <>
                <h2>영국 내 한류 콘텐츠 영향력</h2>
                <p>
                  음식, 뷰티, 패션 등 한국의 라이프스타일 콘텐츠가
                  영국 현지에서 높은 선호도를 보이고 있습니다.
                </p>
              </>
            )}
    
            {selectedTopic === "history" && (
              <>
                <h2>{country}의 역사</h2>
                <p>
                  영국은 오랜 제국의 역사를 가지고 있으며, 다양한 문화적 교류의 중심지였습니다.
                </p>
              </>
            )}
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
