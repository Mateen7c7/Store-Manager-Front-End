/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function ProfitChart({ profitChart }) {
  const info = profitChart.map((item) => {
    return {
      x: new Date(item.date),
      y: item.revenue - item.expense,
    };
  });
  
  const options = {
    animationEnabled: true,
    title: {
      text: "Profit Chart",
    },
    axisX: {
      valueFormatString: "DD",
    },
    axisY: {
      title: "Sales (in ₹)",
      prefix: "₹",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "DD MMM",
        type: "spline",
        dataPoints: [...info],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
}

export default ProfitChart;
