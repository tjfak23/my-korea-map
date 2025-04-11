import React from "react";

function KoreaMap({ selectedSector }) {
  const sectorToSVG = {
    "Agriculture, forestry and fishing": "/assets/korea.svg",
    "Mining and quarrying": "/assets/korea.svg",
    "Manufacturing": "/assets/korea_manufacturing.svg",
    "Electricity, gas and water supply": "/assets/korea_electric.svg",
    "Construction": "/assets/korea_construct.svg",
    "Services sector": "/assets/korea_services.svg",
  };

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
      <img
        key={svgPath}
        src={svgPath}
        className="korea-map"
        alt="Map of Korea"
        style={{
          width: "80%",
          height: "auto",
        }}
      />
    </div>
  );
}

export default KoreaMap;
