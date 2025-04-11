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
  const svgPath =
    selectedSector && sectorToSVG[selectedSector]
      ? sectorToSVG[selectedSector]
      : "/assets/korea.svg";

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
        key={svgPath}
        data={svgPath}
        type="image/svg+xml"
        className="korea-map"
        aria-label="Map of South Korea by selected industry"
        role="img"
        style={{
          width: "80%",
          height: "auto",
          transform: "translateY(0px)",
        }}
      >
        {/* ✅ fallback image - object가 실패하면 이 <img>가 보여짐 */}
        <img
          src={svgPath}
          alt="Map of Korea"
          className="korea-map"
          style={{
            width: "80%",
            height: "auto",
          }}
        />
      </object>
    </div>
  );
}

export default KoreaMap;
