import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js';
import RaisedButton from 'material-ui/RaisedButton';
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

class PastQuestions extends Component {
  constructor(props) {
    super(props);
    this.chart = null;
    this.changeChartType = this.changeChartType.bind(this);
    this.componentDidUpdate = this.componentDidMount;
  }

  componentWillMount() {
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/get-results`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render() {
    return (
      <div>
        {this.props.id}
        <RaisedButton
          label="Change Chart Type"
          onClick={this.changeChartType}
        />
        {this.props.chart_type=='bar' && <canvas id="barChart"></canvas>}
        {this.props.chart_type=='doughnut' && <canvas id="doughnutChart"></canvas>}
      </div>
    );
  }

  componentDidMount() {
    const results = this.props.results;
    const labels = results.map(result => (result.text));
    const data = results.map(result => (result.quantity));

    console.log(this.props.results, labels, data)
    this.chart = new Chart(document.getElementById(`${this.props.chart_type}Chart`).getContext('2d'), {
      type: this.props.chart_type,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor
        }]
      }
    });
  }

  componentWillUnmount() {console.log(this.chart)
    // const chart = this.state.chart;
    this.chart.destroy();console.log(this.chart)
  }

  changeChartType() {
    store.dispatch({
      type: questions.ActionTypes.CHANGE_CHART_TYPE,
      chart_type: this.props.chart_type == 'bar' ? 'doughnut' : 'bar',
    })
  }
}

export default connect(
  mapStateToProps,
)(PastQuestions);