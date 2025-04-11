// src/components/PieChartComponent.jsx
import React, { useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// JSON 데이터
import industryDataDefault from "../data/industryData_cleaned.json";
import industryDataUK from "../data/industryData_updated.json";

ChartJS.register(ArcElement, Tooltip, Legend);

// 🔁 영어 → 한글 산업명 변환 맵핑 (위로 이동!)
const sectorNameMap = {
  "Manufacturing": "기계",
  "Electricity, gas and water supply": "전자",
  "Construction": "자동차",
  "Agriculture, forestry and fishing": "식품",
  "Mining and quarrying": "화학",
  "Services sector": "섬유"
};

function PieChartComponent({ country }) {
  const chartRef = useRef();

  const normalizedCountry = country.replace(/\s/g, "").toLowerCase();
  const dataSource =
    normalizedCountry === "unitedkingdom" ? industryDataUK : industryDataDefault;

  const matchedKey = Object.keys(dataSource).find(
    (key) => key.replace(/\s/g, "").toLowerCase() === normalizedCountry
  );

  const data =
    matchedKey && normalizedCountry === "unitedkingdom"
      ? dataSource[matchedKey].filter((item) => typeof item.value === "number")
      : matchedKey
      ? dataSource[matchedKey]
      : [];

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: `${country} 산업 비율`,
        data: data.map((item) => item.value),
        backgroundColor: [
          "#ff6384", "#36a2eb", "#ffcd56", "#b0bec5",
          "#81c784", "#ba68c8", "#f06292"
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { size: 12 },
        },
      },
    },
    onClick: async (event, elements) => {
      if (elements.length === 0) return;
      const chart = chartRef.current;
      const index = elements[0].index;
      const sectorName = chart.data.labels[index];  // 영어 이름
      const translatedName = sectorNameMap[sectorName]; // 한글로 변환
      console.log("클릭된 산업:", sectorName, "| 변환된:", translatedName);

      if (!translatedName) {
        console.warn(`변환할 수 없는 산업명: ${sectorName}`);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/getRegions?sector=${translatedName}`);
        const regionList = await res.json(); // 예: ["포항시", "창원시"]
        console.log("해당 지역 리스트:", regionList);
        highlightRegions(regionList);
      } catch (err) {
        console.error("API 요청 실패:", err);
      }
    },
  };

  const highlightRegions = (regionList) => {
    document.querySelectorAll(".highlight").forEach(el => el.classList.remove("highlight"));

    setTimeout(() => {
      regionList.forEach(regionName => {
        const el = document.getElementById(regionName);
        if (el) {
          el.classList.add("highlight");
        } else {
          console.warn("❗SVG ID를 찾을 수 없음:", regionName);
        }
      });
    }, 200);
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      {data.length > 0 ? (
        <Pie ref={chartRef} data={chartData} options={chartOptions} />
      ) : (
        <p style={{ color: "gray" }}>해당 국가의 데이터가 없습니다.</p>
      )}
    </div>
  );
}

export default PieChartComponent;
