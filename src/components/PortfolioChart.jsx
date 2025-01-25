import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioChart = ({ stocks }) => {
  // Prepare data for the chart
  const chartData = {
    labels: stocks.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Holdings",
        data: stocks.map((stock) => stock.quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const { dataset, dataIndex } = tooltipItem;
            const value = dataset.data[dataIndex];
            return `Quantity: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 rounded-lg shadow-lg w-[400px]">
      <h3 className="text-xl font-bold text-white mb-4">Stock Holdings</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};
