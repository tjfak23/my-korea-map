import React, { useEffect, useState } from "react";
import { ReactComponent as MapSVG } from "./assets/map.svg";
import Popup from "./Popup";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [highlightedRegions, setHighlightedRegions] = useState([]);

  // 🔸 산업 클릭 → 백엔드 요청 → 상위 5개 시군구 받아오기
  const handleIndustryClick = async (industryName) => {
    try {
      const res = await fetch(`http://localhost:5000/top-regions?industry=${industryName}`);
      const data = await res.json();
      if (data.top_regions) {
        setHighlightedRegions(data.top_regions);
      }
    } catch (error) {
      console.error("불러오기 실패:", error);
    }
  };

  // 🔸 마커 클릭 이벤트 설정
  useEffect(() => {
    const circles = document.querySelectorAll(".country-group");
    circles.forEach((group) => {
      group.addEventListener("click", () => {
        const title = group.querySelector("title")?.textContent;
        if (title) {
          setSelectedCountry(title);
        }
      });
    });
    return () => {
      circles.forEach((group) => {
        group.removeEventListener("click", () => {});
      });
    };
  }, []);

  // 🔸 SVG 내 산업 파이차트 클릭 이벤트
  useEffect(() => {
    const industryPaths = document.querySelectorAll(".uk-industry path");
    industryPaths.forEach((path) => {
      path.addEventListener("click", () => {
        const industry = path.getAttribute("id");
        if (industry) {
          handleIndustryClick(industry);
        }
      });
    });

    return () => {
      industryPaths.forEach((path) => {
        path.removeEventListener("click", () => {});
      });
    };
  }, []);

  // 🔸 하이라이팅 적용
  useEffect(() => {
    const allPaths = document.querySelectorAll("path");
    allPaths.forEach((path) => {
      const regionId = path.getAttribute("id");
      if (highlightedRegions.includes(regionId)) {
        path.style.fill = "red";
      } else {
        path.style.fill = "#ccc";
      }
    });
  }, [highlightedRegions]);

  const closeModal = () => {
    setSelectedCountry(null);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* ✅ 조건부 blur 처리 */}
      <MapSVG
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: selectedCountry ? "blur(2px)" : "none",
          transition: "filter 0.3s ease",
        }}
      />
      {selectedCountry && <Popup country={selectedCountry} onClose={closeModal} />}
    </div>
  );
}

export default App;
