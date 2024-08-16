import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const ChartComponent = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // Sample candlestick data for 30 days
    const data = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const timestamp = Math.floor(date.getTime() / 1000); // Convert to Unix timestamp

      return {
        time: timestamp,
        open: Math.random() * 100,
        high: Math.random() * 125 + 70,
        low: Math.random() * 100 - 50,
        close: Math.random() * 140,
      };
    }).reverse(); // Reverse to have recent data on the right

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      crossHair: { mode: 1 },
    });

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(data);
        // Fit content to the chart area
        chart.timeScale().fitContent();

    return () => chart.remove();
  }, []);

  return <div ref={chartContainerRef} style={{width: '100%', height: '400px' }} />;
};

export default ChartComponent;
