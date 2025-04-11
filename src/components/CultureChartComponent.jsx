// src/components/CultureChartComponent.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function CultureChartComponent() {
  const labels = [
    "드라마", "예능", "영화", "음악", "애니메이션",
    "출판물", "웹툰", "게임", "패션", "뷰티", "음식"
  ];

  const values = [9.2, 8.7, 9.6, 9.0, 8.4, 7.4, 7.2, 9.0, 9.8, 10.6, 11.2];

  const chartData = {
    labels,
    datasets: [
      {
        label: "한국 문화 콘텐츠 영향력 (10점 만점 기준)",
        data: values,
        backgroundColor: "#81d4fa",
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: { beginAtZero: true, max: 12 },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px", marginTop: "60px" }}>
  <Bar data={chartData} options={chartOptions} />
</div>
  );
}

export default CultureChartComponent;
