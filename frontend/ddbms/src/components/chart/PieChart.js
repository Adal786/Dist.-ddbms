import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ colors, labels, state, Data }) => {
  const [shouldRender, setShouldRender] = useState(false);


  useEffect(() => {
    if (!state) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [state]);

  if (!shouldRender) {
    return null;
  }

  // Calculate time differences in milliseconds
  const requestInToNlpStart = new Date(Data?.nlp_start) - new Date(Data?.request_in);
  const nlpStartToRequestRet = new Date(Data?.request_ret) - new Date(Data?.nlp_start);
  const requestRetToNlpEnd = new Date(Data?.nlp_end) - new Date(Data?.request_ret);

  const totalTime = requestInToNlpStart + nlpStartToRequestRet + requestRetToNlpEnd;
  
  const data = {
    labels: labels,
    datasets: [
      {
        data: [
          (requestInToNlpStart / totalTime) * 100,
          (nlpStartToRequestRet / totalTime) * 100,
          (requestRetToNlpEnd / totalTime) * 100
        ],
        // data:[10,25,25.5],
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <>
      <div style={{ width: '400px', height: '400px' }}>
        <Pie data={data} options={options} />
      </div>
      <div className="flex items-center justify-center">
        <h4>Total time {totalTime || 0} milliseconds</h4>
      </div>
    </>
  );
};

export default PieChart;
