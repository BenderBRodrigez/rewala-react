import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js';
import {Tabs, Tab} from 'material-ui/Tabs';
import store from '../../../../../store';
import * as questions from "../../../../../redux/questions/actions";
import {netService} from '../../../../../shared/services/net.service';

const mapStateToProps = state => ({
  chart_type: state.questions.chart_type,
  results: state.questions.results,
});

const backgroundColor = [
  'rgba(56,142,60, 0.7)',
  'rgba(54,162,235, 0.7)',
  'rgba(245,124,0, 0.7)',
  'rgba(255,206,86, 0.7)',
  'rgba(211,47,47, 0.7)',
  'rgba(153,102,255, 0.7)',
  'rgba(75,192,192, 0.7)',
  'rgba(81,45,168, 0.7)',
  'rgba(255,99,132, 0.7)',
  'rgba(93,64,55, 0.7)',
  'rgba(69,90,100, 0.7)',
  'rgba(255,159,64, 0.7)',
  'rgba(175,180,43, 0.7)',
];

const options = {
  bar: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          callback: tick => {
            if (tick.toString().indexOf('.') !== -1) {
              return null;
            }
            return tick.toLocaleString();
          }
        }
      }],
    }},
  doughnut: {
    legend: {
      onClick: false,
      position: 'bottom'
    }}
};

const barOptions = {
};

class PastQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart_type: 'bar'
    };
    this.chart = null;
    this.changeChartType = this.changeChartType.bind(this);
  }

  componentWillMount() {
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/get-results`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render() {
    return (
      <Tabs onChange={this.changeChartType}>
        <Tab label="Bar Chart" value="bar">
          <canvas id="barChart" className="chart-canvas"></canvas>
        </Tab>
        <Tab label="Doughnut Chart" value="doughnut">
          <canvas id="doughnutChart" className="chart-canvas"></canvas>
        </Tab>
      </Tabs>
    );
  }

  componentDidUpdate() {
    const results = this.props.results;
    const labels = results.map(result => (result.text));
    const data = results.map(result => (result.quantity));

    this.chart = new Chart(document.getElementById(`${this.state.chart_type}Chart`).getContext('2d'), {
      type: this.state.chart_type,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor
        }]
      },
      options: options[this.state.chart_type]
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  changeChartType(value) {
    this.setState({
      chart_type: value
    })
  }
}

export default connect(
  mapStateToProps,
)(PastQuestions);