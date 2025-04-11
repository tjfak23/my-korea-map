import React from "react";
import mapImage from "./assets/map.svg";

const MapWithMarkers = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      <img src={mapImage} alt="World Map" style={{ width: "100%" }} />

      {/* UK 마커 */}
      <div
        style={{
          position: "absolute",
          top: "360px",
          left: "920px",
          width: "30px",
          height: "30px",
          backgroundColor: "red",
          borderRadius: "50%",
          border: "2px solid white",
          zIndex: 1000,
        }}
      />

      {/* US 마커 */}
      <div
        style={{
          position: "absolute",
          top: "460px",
          left: "340px",
          width: "30px",
          height: "30px",
          backgroundColor: "blue",
          borderRadius: "50%",
          border: "2px solid white",
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default MapWithMarkers;
