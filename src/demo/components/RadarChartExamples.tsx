import React from 'react';
import { RadarChart, HoveredDataInfo } from '../../lib';

interface RadarChartExamplesProps {
  isDarkMode: boolean;
}

const radarChartDemoData = [
  {
    name: 'Player A',
    color: 'rgba(255, 99, 132, 0.6)',
    dataPoints: [
      { axis: 'Shooting', value: 80 },
      { axis: 'Passing', value: 65 },
      { axis: 'Dribbling', value: 70 },
      { axis: 'Defense', value: 50 },
      { axis: 'Pace', value: 90 },
      { axis: 'Physical', value: 75 },
    ],
  },
  {
    name: 'Player B',
    color: 'rgba(54, 162, 235, 0.6)',
    dataPoints: [
      { axis: 'Shooting', value: 70 },
      { axis: 'Passing', value: 85 },
      { axis: 'Dribbling', value: 60 },
      { axis: 'Defense', value: 70 },
      { axis: 'Pace', value: 80 },
      { axis: 'Physical', value: 85 },
    ],
  },
];

const axes = ['Shooting', 'Passing', 'Dribbling', 'Defense', 'Pace', 'Physical'];

const singleSeriesData = [
  {
    name: 'Specialist Hero',
    color: 'rgba(75, 192, 192, 0.7)', // A distinct teal color
    dataPoints: [
      { axis: 'Shooting', value: 95 },
      { axis: 'Passing', value: 60 },
      { axis: 'Dribbling', value: 75 },
      { axis: 'Defense', value: 40 },
      { axis: 'Pace', value: 85 },
      { axis: 'Physical', value: 65 },
    ],
  },
];

export const RadarChartExamples: React.FC<RadarChartExamplesProps> = ({ isDarkMode }) => {
  const customTooltipFormat = (hoveredData: HoveredDataInfo) => {
    const bgColor = isDarkMode ? 'rgba(20,20,30,0.95)' : 'rgba(250,250,255,0.95)';
    const textColor = isDarkMode ? '#E0E0E0' : '#1A1A1A';
    const borderColor = hoveredData.color || (isDarkMode ? '#555' : '#AAA');

    return `
      <div style="background-color: ${bgColor}; color: ${textColor}; padding: 8px 12px; border-radius: 5px; border: 1px solid ${borderColor}; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-family: sans-serif; font-size: 13px;">
        <strong style="color: ${hoveredData.color || textColor}; display: block; margin-bottom: 4px;">${hoveredData.seriesName}</strong>
        <div>
          <span style="opacity: 0.8;">${hoveredData.axisLabel}: </span>
          <span style="font-weight: bold;">${hoveredData.value}</span>
        </div>
        ${hoveredData.seriesName === 'Player A' && hoveredData.axisLabel === 'Shooting' ? '<div style="margin-top: 5px; font-size: 11px; opacity: 0.7;"><em>Special bonus!</em></div>' : ''}
      </div>
    `;
  };
  return (
    <>
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Basic Radar Chart
        </h3>
        <RadarChart data={radarChartDemoData} axesLabels={axes} size={350} maxValue={100} />
      </div>

      {/* Example with Custom Tooltip and Visible Hover Points */}
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-6 ${
          // Added mt-6 for spacing
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Custom Tooltip & Visible Hover Points
        </h3>
        <RadarChart
          data={radarChartDemoData}
          axesLabels={axes}
          size={350}
          maxValue={100}
          // Hover point customization
          showHoverPoints={true}
          hoverPointRadius={6}
          hoverPointFill={isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'} // Semi-transparent white/black
          hoverPointStroke={isDarkMode ? 'rgba(220, 220, 220, 0.7)' : 'rgba(50, 50, 50, 0.7)'}
          hoverPointStrokeWidth={1.5}
          tooltipFormat={customTooltipFormat}
        />
      </div>
      {/* Example with Glow, Dotted Grid, No Axis Lines */}
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-6 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Styled Chart: Glow, Dotted Grid, No Axis Lines
        </h3>
        <RadarChart
          data={radarChartDemoData}
          axesLabels={axes}
          size={350}
          maxValue={100}
          // Styling Features
          enableSeriesGlow={true}
          seriesGlowBlur={4} // Slightly less blur for the glow
          gridLineStyle={'dotted'}
          showAxisLines={false}
          // Hover point customization (can be different from other examples)
          showHoverPoints={true}
          hoverPointRadius={5}
          hoverPointFill={isDarkMode ? 'rgba(100, 220, 255, 0.5)' : 'rgba(0, 100, 150, 0.3)'}
          hoverPointStroke={isDarkMode ? 'rgba(150, 230, 255, 0.9)' : 'rgba(0, 80, 120, 0.9)'}
          hoverPointStrokeWidth={1}
          // Custom tooltip (can reuse or make a new one)
          tooltipFormat={customTooltipFormat} // Reusing the existing one for simplicity
          // Override axis label colors for this example if needed for dark/light mode
          axisLabelColor={isDarkMode ? '#A0A0A0' : '#555555'}
        />
      </div>

      {/* Example with Single Series and Custom Styling */}
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-6 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Single Series & Custom Styling
        </h3>
        <RadarChart
          data={singleSeriesData}
          axesLabels={axes}
          size={350}
          maxValue={100}
          seriesFillOpacity={0.5}
          seriesStrokeWidth={2.5}
          showHoverPoints={true}
          hoverPointRadius={5}
          tooltipFormat={customTooltipFormat}
        />
      </div>

      {/* Example with Series Shadow Effect */}
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-6 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Series Shadow Effect
        </h3>
        <RadarChart
          data={radarChartDemoData}
          axesLabels={axes}
          size={350}
          maxValue={100}
          enableSeriesShadow={true}
          seriesShadowColor={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)'}
          seriesShadowBlur={5}
          seriesShadowOffsetX={2}
          seriesShadowOffsetY={2}
          enableSeriesGlow={false} // Ensure glow is off to see shadow clearly
          tooltipFormat={customTooltipFormat}
        />
      </div>

      {/* Example with Minimalist Design */}
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-6 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Minimalist Design (No Grid/Labels/Axes)
        </h3>
        <RadarChart
          data={radarChartDemoData.slice(0, 1)} // Use only one series for clarity
          axesLabels={axes}
          size={350}
          maxValue={100}
          showGrid={false}
          showAxesLabels={false}
          showAxisLines={false}
          showHoverPoints={true}
          hoverPointRadius={7}
          hoverPointFill={
            radarChartDemoData[0].color?.replace('0.6', '0.3') || 'rgba(255,99,132,0.3)'
          }
          hoverPointStroke={
            radarChartDemoData[0].color?.replace('0.6', '0.9') || 'rgba(255,99,132,0.9)'
          }
          tooltipFormat={customTooltipFormat}
        />
      </div>

      {/* Example with Legend */}
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-6 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Radar Chart with Legend
        </h3>
        <RadarChart
          data={radarChartDemoData}
          axesLabels={axes}
          size={350}
          maxValue={100}
          showLegend={true}
          legendTitle="Player Comparison"
          legendPosition="bottom"
          legendItemColor={isDarkMode ? '#D1D5DB' : '#374151'}
          legendTitleColor={isDarkMode ? '#9CA3AF' : '#4B5563'}
          legendSwatchSize={10}
          legendGap={10}
          tooltipFormat={customTooltipFormat} // Reusing existing custom tooltip
        />
      </div>

      {/* Example with Clickable Legend and Highlighting */}
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-6 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Radar Chart with Clickable Legend
        </h3>
        <RadarChart
          data={radarChartDemoData}
          axesLabels={axes}
          size={350}
          maxValue={100}
          showLegend={true}
          legendPosition="bottom"
          legendTitle="Click a Player to Highlight"
          clickableLegend={true}
          selectedSeriesFillOpacity={0.6}
          selectedSeriesStrokeWidth={3}
          deselectedSeriesFillOpacity={0.1}
          deselectedSeriesStrokeWidth={1.5}
          seriesFillOpacity={0.25} // Base opacity for non-selected/non-deselected state
          seriesStrokeWidth={2} // Base stroke for non-selected/non-deselected state
          tooltipFormat={customTooltipFormat}
          onLegendItemClick={(seriesName: string | null) =>
            console.log('Legend item clicked:', seriesName)
          }
        />
      </div>
    </>
  );
};
