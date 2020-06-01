import '../App.css';
import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import { getStudentID } from '../circuit/functions.js';
// Main Components
import NavBar from "../components/navBar.js";
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { retrieveCircuits, gradeCircuit } from '../circuit/apicaller';
import { Button } from 'react-bootstrap';


// dummy data to use in the meantime.
var table_columns = [{
  dataField: 'algorithm_grade',
  text: 'Grade',
}, {
  dataField: 'circuit_input',
  text: 'Circuit Input'
},{
  dataField: 'circuit_name',
  text: 'Circuit Name',
  filter: textFilter()
}, {
  dataField: 'circuit_output_json',
  text: 'Circuit Output'
},{
  dataField: 'created_date',
  text: 'Submitted at',
}, {
  dataField: 'id',
  text: 'Circuit ID',
  filter: textFilter()
}, {
  dataField: 'is_deleted',
  text: 'Is Deleted',
}, {
  dataField: 'is_graded',
  text: 'Graded',
  filter: textFilter()
}, {
  dataField: 'is_submitted',
  text: 'Is Submitted',
}, {
  dataField: 'student_id',
  text: 'Student ID',
  filter: textFilter()
},{
  dataField: 'updated_date',
  text: 'last Updated at',
}]

/*
var table_data = [
  {student_id: 98106545, student_name: 'Patrick', circuit_name: 'Assignment 2.1', circuit_input: '001 010 000', circuit_output: '1'},
  {student_id: 54560189, student_name: 'Justin', circuit_name: 'Assignment 1.1', circuit_input: '001 010 000', circuit_output: '0'},
  {student_id: 87481254, student_name: 'Jasmine', circuit_name: 'Assignment1', circuit_input: '001 010 000', circuit_output: '0'},
  {student_id: 87483922, student_name: 'Alexa', circuit_name: 'Quiz 3', circuit_input: '001 010 000', circuit_output: '0'},
  {student_id: 31243932, student_name: 'Berkan', circuit_name: 'Assignment4', circuit_input: '001 010 000', circuit_output: '1'},
  {student_id: 87383942, student_name: 'David', circuit_name: 'Assignment1.3', circuit_input: '001 010 000', circuit_output: '00'},
  {student_id: 12483612, student_name: 'Piyush', circuit_name: 'Quiz 2', circuit_input: '001 010 000', circuit_output: '1'},
  {student_id: 87487912, student_name: 'Jacob', circuit_name: 'Assignment final', circuit_input: '001 010 000', circuit_output: '01'},
  {student_id: 87443912, student_name: 'Saanchi', circuit_name: 'Assignment draft', circuit_input: '001 010 000', circuit_output: '01'},
  {student_id: 87583912, student_name: 'Eestwa', circuit_name: 'Quiz 2', circuit_input: '001 010 000', circuit_output: '0'},
  {student_id: 87483312, student_name: 'John', circuit_name: 'Assignment1', circuit_input: '001 010 000', circuit_output: '0'},
  {student_id: 87483112, student_name: 'Smith', circuit_name: 'Assignment1', circuit_input: '001 010 000', circuit_output: '0'},
  {student_id: 87483912, student_name: 'Steve', circuit_name: 'Assignment1', circuit_input: '001 010 000', circuit_output: '0'}
];
*/


// Gets the length of the payload data to determine roof of pagination.
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);

var tablePaginationOptions;

const Body = styled.body`
  background-color: white;
  background-blend-mode: multiply;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`;

  const Title = styled.div`
    padding:14px 5px 14px 0px;
    font-size: calc(32px + 2vmin);
  `;

  const Text = styled.span`
  vertical-align: text-top;
  `;

export default class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      table_data: []
    };
  }

  async componentWillMount() {
    // Gets data before the render
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

  getCircuits = async () => {
    let student_id = "all";
    var list = [];
    const results = await retrieveCircuits({ 'student_id': student_id });
    for (var i = 0; i < results['circuits'].length; i++) {
      list[i] = results['circuits'][i];
    }
    //console.log(list);
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
    //console.log("state:",this.state.table_data);

    if (admin_id && is_admin) {
      return (
        <BrowserRouter>
          <div className="App">
              <NavBar />
      {/* <Button onClick={this.getCircuits}> CLick here</Button> */}
              <div><br></br></div>
              <div class="container admin-table">
                  <div class="row" style={{ margin: '8px', padding: '1%' }}>
                  </div>    
                  <BootstrapTable keyField='student_id' data={ this.state.table_data } columns={ table_columns } pagination={ paginationFactory(tablePaginationOptions) } filter={ filterFactory() }  />
              </div>
          </div>
        </BrowserRouter>
      );
    } else window.location.href = '/';
  } 
  
}
