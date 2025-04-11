// src/components/PieChartComponent.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import industryData from "../data/industryData_updated.json"; // ← 최신 JSON

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartComponent({ country }) {
  const normalizedCountry = country.replace(/\s/g, "").toLowerCase();

  const matchedKey = Object.keys(industryData).find(
    (key) => key.replace(/\s/g, "").toLowerCase() === normalizedCountry
  );

  const data = matchedKey ? industryData[matchedKey] : [];

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: `${country} 산업 비율`,
        data: data.map((item) => item.ratio), // ← 여기 주의!
        backgroundColor: [
          "#ff6384", // 붉은 계열
          "#36a2eb", // 파란 계열
          "#ffcd56", // 노란 계열
          "#b0bec5", // 회색 계열
          "#81c784", // 초록 계열
          "#ba68c8", // 보라 계열
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
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      {data.length > 0 ? (
        <Pie data={chartData} options={chartOptions} />
      ) : (
        <p style={{ color: "gray" }}>해당 국가의 데이터가 없습니다.</p>
      )}
    </div>
  );
}

export default PieChartComponent;
