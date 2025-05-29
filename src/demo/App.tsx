import { BarChart, LineChart } from 'src/lib'
import '../App.css'

function App() {
  const barChartData = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 30 }
  ];

  const lineChartData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 120 },
    { label: 'Apr', value: 200 },
    { label: 'May', value: 180 }
  ];

  return (
    <div className="App">
      <h1>Chart Library Demo</h1>
      <div className="charts-container">
        <div className="chart">
          <h2>Bar Chart Example</h2>
          <BarChart data={barChartData} width={400} height={300} />
        </div>
        <div className="chart">
          <h2>Line Chart Example</h2>
          <LineChart data={lineChartData} width={400} height={300} areaColor="rgba(70, 130, 180, 0.3)" />
        </div>
      </div>
    </div>
  )
}

export default App
