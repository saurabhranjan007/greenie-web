import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import LoadingDots from '../Loader/Loader'


const App = () => {
  const [cpuUsage, setCpuUsage] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState('');
  const [popupChartData, setPopupChartData] = useState(null);

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

  const handleProcessSelect = (event) => {
    setSelectedProcess(event.target.value);
  };

  useEffect(() => {
    if (selectedProcess) {
      const selectedData = cpuUsage.find((item) => item.name === selectedProcess);
      if (selectedData) {
        setPopupChartData({
          labels: [selectedData.name],
          datasets: [
            {
              label: 'Power Consumption',
              data: [selectedData.power_consumption],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      }
    }
  }, [selectedProcess, cpuUsage]);

  return (
    <div className="App">
      <h1>Power Consumption Chart</h1>
      <div>
        <h2>Select Process name</h2>
        <select value={selectedProcess} onChange={handleProcessSelect}>
          <option value=""> -- Select -- </option>
          {cpuUsage.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {popupChartData && (
        <div className="PopupChart">
          <h2>Power Consumption for {selectedProcess}</h2>
          <Bar
            data={popupChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 10,
                },
              },
            }}
          />
        </div>
      )}
      {
        cpuUsage.length === 0 && 
        <>
          <p>Fetching data, please wait...</p>
          <LoadingDots />
        </>
      }
    </div>
  );
};

export default App;
