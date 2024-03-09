"use client";
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CategoryChart({ categoryChart }) {
  const data = categoryChart.map((item) => {
    return {
      label: item.category,
      y: item.quantity,
    };
  });
  const options = {
    title: {
      text: "Items Chart",
    },
    data: [
      {
        type: "column",
        dataPoints: [...data],
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

export default CategoryChart;
