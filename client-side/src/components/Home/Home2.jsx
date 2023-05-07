import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
  const [cpuUsage, setCpuUsage] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/get/power-consumption/all', {
        timeout: 5 * 60 * 1000,
      });
      const data = await res.json();
      setCpuUsage(data.data);
    } catch (error) {
      console.error(`Error in fetching data: ${error}`);
    }
  };

  useEffect(() => {
    console.log('Getting CPU usage data');
    fetchData();
  }, []);

  console.log('CPU usage data:', cpuUsage);

  const chartData = {
    labels: cpuUsage?.map((item) => item.name),
    datasets: [
      {
        label: 'Power Consumption',
        data: cpuUsage?.map((item) => item.power_consumption),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Power Consumption Chart</h1>
      {cpuUsage?.length > 0 ? (
        <>
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 300,
                },
              },
            }} 
          />
        </>
      ) : (
        <p>Loading power consumption data....</p>
      )}
    </div>
  );
};

export default App;
