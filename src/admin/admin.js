import styles from '../App.css';
import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import { getStudentID, setAlgorithmName, setStudentIDView, getStudentIDView } from '../circuit/functions.js';
// Main Components
import NavBar from "../components/navBar.js";
import filterFactory, { textFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { retrieveCircuits, gradeCircuit } from '../circuit/apicaller';
import { Button } from 'react-bootstrap';


// dummy data to use in the meantime.
var table_columns = [{
  dataField: 'student_id',
  text: 'Student ID',
  filter: textFilter(),
  headerStyle: () => {return{width:"15%"}},
}, {
  dataField: 'circuit_name',
  text: 'Circuit Name',
  filter: textFilter(),
  headerStyle: () => {return{width:"15%"}},
}, {
  dataField: 'circuit_input',
  text: 'Circuit Input',
  headerStyle: () => {return{width:"15%"}},
},{
  dataField: 'circuit_output_json',
  text: 'Circuit Output',
  headerStyle: () => {return{width:"30%"}},
},{
  dataField: 'created_date',
  text: 'Submitted at',
}, {
  dataField: 'algorithm_grade',
  text: 'Grade',
}, {
  dataField: 'is_graded',
  text: 'Graded',
}, {
  dataField: 'view',
  text: 'View',
  events: {
    onClick: (e, column, columnIndex, row) => {
      setStudentIDView(row.student_id);
      setAlgorithmName(row.circuit_name);
      // window.location.href = '/admin/dnd';
    }
  },
  formatter: (cellContent, row) => (
    <button class="btn btn-primary">View</button>
  ),
  headerStyle: () => {return{width:"8%"}},
}]

// Gets the length of the payload data to determine roof of pagination.
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);

var tablePaginationOptions;

export default class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      table_data: []
    };
  }

  async componentDidMount() {
    // Gets data before the render
    const is_admin = parseInt(localStorage.getItem('isAdmin'));
    if (!is_admin) window.location.href = '/';
    else {
      var data = await this.getCircuits();
      this.setState({
        table_data: data
      });
      // Needs to be defined at this point because only now do we have a length for table_data
      tablePaginationOptions = {
        paginationSize: 4,
        pageStartIndex: 0,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: this.state.table_data.length
        }] 
      };
    }
  }

  getCircuits = async () => {
    var list = [];
    const results = await retrieveCircuits({ 
      'student_id': 'all',
      'is_submitted': "true"
   });
    for (var i = 0; i < results['circuits'].length; i++) {
        list[i] = results['circuits'][i];
    }
    console.log(list);
    return list;
  }

  onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('student_id', this.state.studentID);
    window.location.href = '/dnd';
  }

  render() {
    const admin_id = getStudentID();
    const is_admin = parseInt(localStorage.getItem('isAdmin'));
    //console.log("dummy:",table_data);
    console.log("state:",this.state.table_data);

    if (admin_id && is_admin) {
      return (
        <BrowserRouter>
          <div className="App">
              <NavBar />
              <div><br></br></div>
              <div class="containerAdmin admin-table">
                  <BootstrapTable 
                  bodyClasses="tbodyContainer"
                  keyField='student_id' 
                  data={ this.state.table_data } 
                  columns={ table_columns } 
                  pagination={ paginationFactory(tablePaginationOptions) } 
                  filter={ filterFactory() }  />
              </div>
          </div>
        </BrowserRouter>
      );
    } else {
      window.location.href = '/';
    } 
  } 
}
