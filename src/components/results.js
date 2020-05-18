import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class Results extends Component {
  constructor(props) {
    super(props);

    // This is a temporary block of mock output JSON data
    const testData = {
      "000": {
        "int": 1,
        "prob": 4.23
      },
      "010": {
        "int": 0,
        "prob": 1.54
      },
      "001": {
        "int": 1,
        "prob": 2.35
      }
    }

    // Get the keys of testData as an array into this.labels
    this.labels = Object.getOwnPropertyNames(testData);
    this.probs = [];

    // Map each label in labels array to their probability and push to probs array
    this.labels.map(label => {
      this.probs.push(testData[label].prob);
    });
  }

  render() {
    return (
      <div class="row" style={{ margin: '8px', padding: '1%' }}>
        <Bar
          data={{
            labels: this.labels,
            datasets: [{
              label: 'Probability',
              data: this.probs
            }]
          }}
          width={this.props.width}
          height={this.props.height}
          options={{
            legend: {
              display: true,
              position: 'bottom'
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