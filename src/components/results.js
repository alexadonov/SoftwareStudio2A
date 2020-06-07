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
    let newLabels = Object.keys(data);

    newLabels.sort();

    for (let i = 0; i < newLabels.length; i++) {
      newProbs.push(data[newLabels[i]]['prob']);
    }
    
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
      this.setState({allData: this.props.resultChartData});
      this.extractProbs(this.props.resultChartData);
    }
  }

  render() {
    var self = this;
    return (
      <div class="row" style={{ margin: '8px', paddingBottom: '2%' }}>
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
            layout: {
              padding: {
                bottom: '10%'
              }
            },
            maintainAspectRatio: true,
            legend: {
              display: false,
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
            bodyFontFamily: "'Helvetica', 'Arial', sans-serif",
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
           },
            title: {
              display: false,
              fontSize: 20,
              text: this.props.title
            }, 
            scales: {
              yAxes: [{
                ticks: {
                    callback:function(label, index, labels) {
                      return label.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
                    },
                    beginAtZero:true,
                    maxTicksLimit: 10,
                    min: 0,
                    max: 1,
                    fontColor: 'rgb(0, 0, 0)'
                },
                scaleLabel: {
                  fontSize: 15,
                  fontColor: 'rgb(0, 0, 0)',
                  display: true,
                  labelString: 'Measurement Probability'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  fontSize: 15,
                  fontColor: 'rgb(0, 0, 0)',
                  display: true,
                  labelString: 'Qubit State'
                }, 
                ticks: {
                  fontColor: 'rgb(0, 0, 0)'
                }
              }]
             }
          }}
        />
      </div>
    )
  }
}
