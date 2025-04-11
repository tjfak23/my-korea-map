import React from "react";

function KoreaMap({ selectedSector }) {
  // 산업군별 SVG 파일 경로 매핑
  const sectorToSVG = {
    "Agriculture, forestry and fishing": "/assets/korea.svg",
    "Mining and quarrying": "/assets/korea.svg",
    "Manufacturing": "/assets/korea_manufacturing.svg",
    "Electricity, gas and water supply": "/assets/korea_electric.svg",
    "Construction": "/assets/korea_construct.svg",
    "Services sector": "/assets/korea_services.svg",
  };

  // 선택된 산업군에 맞는 SVG 경로 (없으면 기본 지도)
  const svgPath = sectorToSVG[selectedSector] || "/assets/korea.svg";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <object
        key={svgPath} // ✅ 이걸 추가해야 React가 바뀐 svg를 감지함!
        type="image/svg+xml"
        data={svgPath}
        className="korea-map"
        aria-label="Map of South Korea by selected industry"
        role="img"
        style={{
          width: "80%",     // ← 크기 조절 가능
          height: "auto",
          transform: "translateY(0px)", // ← 위치 조절도 가능
        }}
      >
        </object>
      
    </div>
  );
}

export default KoreaMap;
