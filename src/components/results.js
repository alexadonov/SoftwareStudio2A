import React, { Component } from 'react';

export default class results extends Component {

  render() {

    const { data } = this.props;
    
    return (
        <div class="row" style={{margin:'8px', padding: '1%'}}>
            <h5>{data}</h5>
            
            {/*}
            {data.map((item) => {
                return (
                    <div>
                    <h1>item</h1>
                    </div>
                )
            }
            )
            }
        */}
        </div>
    )
    
    
  }
}

