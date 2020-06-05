import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      probs: [],
      labels: [],
      chartData: {}
    };    
  }

  extractProbs = (data) => {
    if (data === undefined || typeof data === "string") return;
    
    let newProbs = [];

    for (var key in data)
      newProbs.push(data[key].prob);

    let newLabels = Object.getOwnPropertyNames(data).sort((a, b) => {return a - b})

    for (let label in newLabels)
      newLabels[label] = '| ' + newLabels[label] + ' ⟩';

    this.setState({labels: newLabels});
    this.setState({probs: newProbs});
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.extractProbs(this.props.resultChartData);
    }
  }

  render() {
    return (
      <div class="row" style={{ margin: '8px', padding: '1%' }}>
        <Bar
          data={{
            labels: this.state.labels,
            datasets: [{
              label: 'Probability',
              data: this.state.probs,
              backgroundColor:'rgba(90, 170, 255)'
            }]
          }}
          width={this.props.width}
          height={this.props.height}
          options={{
            legend: {
              display: true,
              position: 'bottom'
            },
            tooltips: {
              callbacks:{
                title: function(tooltipItems, data) {
                  return tooltipItems[0]['xLabel'];
                },

                beforeLabel: function(tooltipItems, data) { 
                  let decimalVal = tooltipItems.xLabel.replace('| ', '');
                  decimalVal = decimalVal.replace(' ⟩', '');
                  decimalVal = parseInt(decimalVal, 2);
                  return `Decimal: | ${decimalVal} ⟩`;
                },

                label: function(tooltipItems, data) {  
                  var a = tooltipItems.yLabel;
                  var aRnd = a.toFixed(3);
                  return `Probability: ${aRnd}`;   
                },

                afterLabel: function(tooltipItems, data){
                  let phaseAngleVal = 0;
                  var mag = Math.sqrt(tooltipItems.yLabel);
                  var magRounded = mag.toFixed(3);
                  return `Magnitude: ${magRounded}\nPhase Angle: ${phaseAngleVal}`;
                },     
                                         
             labelTextColor: function(tooltipItem, chart) {
              return 'rgb(0,0,0)';
                },                      
            },
            xPadding: 10,
            yPadding: 10,
            backgroundColor: 'rgb(255, 255, 255)',
            titleFontSize: 16,
            titleFontColor: 'rgb(0,0,0)',
            bodyFontSize: 14,
            bodyFontFamily: "'Helvetica', 'Arial', sans-serif"
           },
            title: {
              display: true,
              fontSize: 24,
              text: this.props.title
            }
          }}
        />
      </div>
    )
  }
}
