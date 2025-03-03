//src/components/charts/line.js

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ temperatureData, humidityData, moistureData }) => {
  // Prepare data for the chart
  const chartData = {
    labels: temperatureData.map((item) => new Date(item.timestamp).toLocaleString()), // Display timestamps as labels
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData.map((item) => item.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        yAxisID: 'y1', // Assign to the first Y-axis
      },
      {
        label: 'Humidity (%)',
        data: humidityData.map((item) => item.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        fill: true,
        yAxisID: 'y2', // Assign to the second Y-axis
      },
      {
        label: 'Moisture (%)',
        data: moistureData.map((item) => item.moisture),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        yAxisID: 'y2', // Assign to the second Y-axis
      },
    ],
  };

  // Set options for the chart
  const chartOptions = {
    responsive: true,
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: true,
          text: 'Percentage (%)',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default Chart;
