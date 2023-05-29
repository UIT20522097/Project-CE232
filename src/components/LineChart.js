// components/LineChart.js
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function LineChart({ data, info }) {
  const options = {
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        formatter: function(value, context) {
          if (context.dataIndex === context.dataset.data.length - 1) {
            return value;
          }
          return '';
        },
        color: 'black',
        size: '30px'
      },
      legend: false
    },
    // Các tùy chọn khác của biểu đồ
  };
  return (
    <div
      className="chart-container"
      style={{ minWidth: "700px", maxWidth: "1000px" }}
    >
      <h2 style={{ textAlign: "center" }}>{info.name}</h2>
      <Line
        data={data}
        options={options}
      />
    </div>
  );
}
export default LineChart;
