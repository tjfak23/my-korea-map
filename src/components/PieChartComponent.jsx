// src/components/PieChartComponent.jsx
import React, { useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// JSON 데이터
import industryDataDefault from "../data/industryData_cleaned.json";
import industryDataUK from "../data/industryData_updated.json";

ChartJS.register(ArcElement, Tooltip, Legend);

// 🔁 영어 → 한글 산업명 변환 맵핑 (위로 이동!)
function PieChartComponent({ country, setSelectedSector }) {
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
    onClick: (event, elements) => {
      if (elements.length === 0) return;
      const chart = chartRef.current;
      const index = elements[0].index;
      const sectorName = chart.data.labels[index];
      console.log("✅ 클릭된 산업:", sectorName);
      setSelectedSector(sectorName); // 🎯 여기만 실행되도록 변경
    },
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
