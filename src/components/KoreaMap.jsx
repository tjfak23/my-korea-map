import React from "react";

// 🔁 src/assets 경로에서 이미지 import
import koreaDefault from "../assets/korea.svg";
import koreaManufacturing from "../assets/korea_manufacturing.svg";
import koreaElectric from "../assets/korea_electric.svg";
import koreaConstruct from "../assets/korea_construct.svg";
import koreaServices from "../assets/korea_services.svg";

function KoreaMap({ selectedSector }) {
  // 선택된 섹터에 따라 매핑된 이미지 반환
  const sectorToImage = {
    "Agriculture, forestry and fishing": koreaDefault,
    "Mining and quarrying": koreaDefault,
    "Manufacturing": koreaManufacturing,
    "Electricity, gas and water supply": koreaElectric,
    "Construction": koreaConstruct,
    "Services sector": koreaServices,
  };

  const imagePath =
    selectedSector && sectorToImage[selectedSector]
      ? sectorToImage[selectedSector]
      : koreaDefault;

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
        key={imagePath}
        src={imagePath}
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
