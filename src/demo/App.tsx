import { BarChart, LineChart } from 'src/lib'
import '../App.css'
import React, { useState } from 'react';

function App() {
  const barChartData1 = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 30 }
  ];

  const barChartData2 = [
    { label: 'X', value: 5 },
    { label: 'Y', value: 12 },
    { label: 'Z', value: 8 }
  ];

  const lineChartData1 = [
    {
      name: 'Single Series',
      values: [
        { label: 'Jan', value: 100 },
        { label: 'Feb', value: 150 },
        { label: 'Mar', value: 120 },
        { label: 'Apr', value: 200 },
        { label: 'May', value: 180 }
      ]
    }
  ];

  const lineChartData2 = [
    {
      name: 'Numeric Labels',
      values: [
        { label: 1, value: 50 },
        { label: 2, value: 75 },
        { label: 3, value: 60 },
        { label: 4, value: 90 },
        { label: 5, value: 80 },
        { label: 6, value: 100 }
      ]
    }
  ];

  const multiLineData = [
    {
      name: 'Series 1',
      values: [
        { label: 'Jan', value: 50 },
        { label: 'Feb', value: 60 },
        { label: 'Mar', value: 55 },
        { label: 'Apr', value: 70 },
        { label: 'May', value: 65 },
      ],
    },
    {
      name: 'Series 2',
      values: [
        { label: 'Jan', value: 80 },
        { label: 'Feb', value: 70 },
        { label: 'Mar', value: 85 },
        { label: 'Apr', value: 90 },
        { label: 'May', value: 88 },
      ],
    },
  ];

  const multiLineNoAreaData = [
    {
      name: 'Series A',
      values: [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 45 },
        { label: 'Mar', value: 40 },
        { label: 'Apr', value: 55 },
        { label: 'May', value: 50 },
      ],
    },
    {
      name: 'Series B',
      values: [
        { label: 'Jan', value: 60 },
        { label: 'Feb', value: 50 },
        { label: 'Mar', value: 65 },
        { label: 'Apr', value: 70 },
        { label: 'May', value: 68 },
      ],
    },
  ];

  const gradientLineData = [
    {
      name: 'Gradient Series',
      values: [
        { label: 'Jan', value: 10 },
        { label: 'Feb', value: 40 },
        { label: 'Mar', value: 20 },
        { label: 'Apr', value: 60 },
        { label: 'May', value: 30 },
        { label: 'Jun', value: 70 },
      ],
    },
  ];

  // State to hold selected data labels from the brush
  const [selectedLabels, setSelectedLabels] = useState<(string | number)[]>([]);

  // Handler for the brush end event
  const handleBrushEnd = (labels: (string | number)[]) => {
    setSelectedLabels(labels);
  };

  // Find the full data points for the selected labels from multiLineData
  const selectedDataPoints = selectedLabels.map((label: string | number) => {
      // Find the first occurrence of the label across all series in multiLineData
      let foundPoint: { label: string | number; value: number } | undefined;
      for (const series of multiLineData) {
          foundPoint = series.values.find((point: { label: string | number; value: number }) => String(point.label) === String(label));
          if (foundPoint) break; // Stop searching once found
      }
      return foundPoint;
  }).filter((point): point is { label: string | number; value: number } => point !== undefined);

  return (
    <div className="App">
      <h1>Chart Library Demo</h1>
      
      {/* Responsive Test Section */}
      <div className="responsive-test">
        <h2>Responsive Test</h2>
        <div className="responsive-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <LineChart 
            data={multiLineData} 
            responsive={true}
            lineColors={['#ff6666', '#66cc66']}
            showGridLines={true}
            brushable={true}
          />
        </div>
        <div className="responsive-container" style={{ width: '100%', maxWidth: '600px', margin: '20px auto' }}>
           <h2>Responsive Bar Chart Example</h2>
           <BarChart 
             data={barChartData1} 
             responsive={true}
             color={['#ff9900', '#66cc66', '#ff6666', '#3399ff', '#b366ff']}
           />
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h2>Bar Chart Example 1 (Default)</h2>
          <BarChart data={barChartData1} width={400} height={300} />
        </div>
        <div className="chart">
          <h2>Bar Chart Example 2 (Multi-color & Custom Margin)</h2>
          <BarChart 
            data={barChartData2} 
            width={400} 
            height={300} 
            color={['#ff9900', '#66cc66', '#ff6666']}
            margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
          />
        </div>
        <div className="chart">
          <h2>Line Chart Example (Brushable)</h2>
          <LineChart 
            data={multiLineData} 
            width={400} 
            height={300} 
            brushable={true}
            showGridLines={true}
            lineColors={['#aaccff', '#ff9900']}
            onBrushEnd={handleBrushEnd}
          />
          <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#333' }}>
            <h3>Selected Data Points:</h3>
            {
              selectedDataPoints.length > 0 ? (
                <ul>
                  {selectedDataPoints.map((point: { label: string | number; value: number }, index: number) => (
                    <li key={index}>Label: {point?.label?.toString()}, Value: {point?.value}</li>
                  ))}
                </ul>
              ) : (
                <p>Brush over the chart to select data.</p>
              )
            }
          </div>
        </div>
        <div className="chart">
          <h2>Line Chart Example 1 (Default)</h2>
          <LineChart data={lineChartData1} width={400} height={300} areaColor="rgba(70, 130, 180, 0.3)" />
        </div>
         <div className="chart">
          <h2>Line Chart Example 2 (Gradient, Grid Lines & Custom Tooltip)</h2>
          <LineChart 
            data={lineChartData2} 
            width={400} 
            height={300} 
            areaGradientColors={['#aaccff', '#2a2a2a']}
            showGridLines={true}
            yAxisTicks={7}
            tooltipBackgroundColor="#555"
            tooltipTextColor="#fff"
            tooltipPadding="10px"
            tooltipBorderRadius="5px"
            tooltipFontSize="13px"
          />
        </div>
         <div className="chart">
          <h2>Line Chart Example 3 (No Axes)</h2>
          <LineChart 
            data={lineChartData1} 
            width={400} 
            height={300} 
            areaColor="rgba(255, 159, 64, 0.3)" 
            lineColors={'#ff9500'}
            showXAxis={false}
            showYAxis={false}
          />
        </div>
        <div className="chart">
          <h2>Line Chart Example 4 (Multiple Lines)</h2>
          <LineChart 
            data={multiLineData} 
            width={400} 
            height={300} 
            lineColors={['#ff6666', '#66cc66']}
            pointColor="#ffffff"
          />
        </div>
         <div className="chart">
          <h2>Line Chart Example 5 (Gradient Line)</h2>
          <LineChart 
            data={gradientLineData} 
            width={400} 
            height={300} 
            lineGradientColors={['#e0aaff', '#88b0de']}
            areaColor="rgba(140, 92, 185, 0.2)"
            pointColor="#e0aaff"
          />
        </div>
         <div className="chart">
          <h2>Line Chart Example 6 (Multi-series, No Area)</h2>
          <LineChart 
            data={multiLineNoAreaData} 
            width={400} 
            height={300} 
            showArea={false}
            lineColors={['#88b0de', '#ff9900']}
            pointColor="#ffffff"
          />
        </div>
      </div>
    </div>
  )
}

export default App
