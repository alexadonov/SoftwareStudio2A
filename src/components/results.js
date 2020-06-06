import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      probs: [],
      labels: [],
      chartData: {},
      allData: []
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

  componentDidMount() {
    this.setState({allData: this.props.resultChartData});
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.extractProbs(this.props.resultChartData);
      this.setState({allData: this.props.resultChartData});
    }
  }

  render() {
    var self = this;
    return (
      <div class="row" style={{ margin: '8px', paddingBottom: '5%' }}>
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

                label: function(tooltipItems, data) {  
                  var a = tooltipItems.yLabel;
                  var aRnd = a.toFixed(5);
                  return `Probability: ${aRnd}`;   
                },

                afterLabel: function(tooltipItems, data){
                  let key = tooltipItems.xLabel.replace('| ', '');
                  key = key.replace(' ⟩', '');
                  let probVal = self.state.allData[key]['prob'];                  
                  let intVal = self.state.allData[key]['int'];
                  let phaseVal = self.state.allData[key]['phase'];
                  let magVal = self.state.allData[key]['mag'];
                  let complexVal = self.state.allData[key]['val'];
                  return `Binary: ${key}\nDecimal: ${intVal}\nValue: ${complexVal}\nMagnitude: ${magVal}\nPhase Angle: ${phaseVal}`;
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
              fontSize: 20,
              text: this.props.title
            }, 
            scales: {
              yAxes: [{
                ticks: {
                    beginAtZero:true,
                    min: 0,
                    max: 1    
                }
              }]
             }
          }}
        />
      </div>
    )
  }
}
