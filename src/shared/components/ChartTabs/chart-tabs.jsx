import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import './chart-tabs.css';

export default function() {
  return (
    <Tabs
      className="chart-tabs"
      onChange={this.changeChartType}
    >
      <Tab
        label="Bar Chart"
        value="bar"
      >
        <canvas
          id="barChart"
          className="chart-canvas"
        >
        </canvas>
      </Tab>
      <Tab
        label="Doughnut Chart"
        value="doughnut"
      >
        <canvas
          id="doughnutChart"
          className="chart-canvas"
        >
        </canvas>
      </Tab>
    </Tabs>
  );
}