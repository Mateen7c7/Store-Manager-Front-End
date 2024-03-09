"use client";
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



function ItemsChart({ itemsChart }) {
  const data = itemsChart.map((item) => {
    return {
      label: item.name,
      y: item.tookQuantity,
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

export default ItemsChart;
