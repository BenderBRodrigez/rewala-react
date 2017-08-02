import {Component} from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js';
import store from '../../../store';
import * as questions from "../../../redux/questions/actions";
import {netService} from '../../services/net.service';
import template from './chart-tabs.jsx';

import './chart-tabs.css';

const mapStateToProps = state => ({
  chart_type: state.questions.chart_type,
  results: state.questions.results.data,
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
    }
  },
  doughnut: {
    legend: {
      onClick: false,
      position: 'bottom'
    }
  }
};

class ChartTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart_type: 'bar'
    };
    this.chart = {};
    this.changeChartType = this.changeChartType.bind(this);
  }

  componentWillMount() {
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/get-results`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render = template.bind(this);

  componentDidUpdate() {
    const results = this.props.results;
    const labels = results.map(result => (result.text));
    const data = results.map(result => (result.quantity));

    this.chart[this.state.chart_type] = new Chart(document.getElementById(`${this.state.chart_type}Chart`).getContext('2d'), {
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
    if (this.chart.bar) this.chart.bar.destroy();
    if (this.chart.doughnut) this.chart.doughnut.destroy();
  }

  changeChartType(value) {
    this.setState({
      chart_type: value
    })
  }
}

export default connect(
  mapStateToProps,
)(ChartTabs);