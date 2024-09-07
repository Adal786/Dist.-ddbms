// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  // Limit data to the latest 12 entries
  const recentData = data.slice(-12);

  const chartData = {
    labels: recentData.map(record => new Date(record.request_ret).toLocaleTimeString()), // Format timestamps for display
    datasets: [
      {
        label: 'Execution Time (ms)',
        data: recentData.map(record => new Date(record.request_ret) - new Date(record.request_in)),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Execution Time: ${context.raw} ms`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Query Time',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Execution Time (ms)',
        },
        beginAtZero: true,
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
