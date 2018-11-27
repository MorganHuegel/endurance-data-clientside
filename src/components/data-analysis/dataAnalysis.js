import React from 'react';
import { connect } from 'react-redux';

import SelectField from './selectField';
import Graph from './graph';
import { convertDataUnits } from './normalizeData';

export class DataAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedField: null,
      numDays: null
    }
  }

  handleSelectField = e => {
    e.preventDefault();
    let numDays = Number(e.target['select-numDays'].value);
    this.setState({
      selectedField: e.target['select-field'].value,
      numDays: numDays
    });
  }

  render() {
    const normalizedData = convertDataUnits(this.props.currentUser.workouts, this.state.selectedField);
    let graphDisplay;
    if (this.state.selectedField) {
      graphDisplay = <Graph data={normalizedData} selectedField={this.state.selectedField} numDays={this.state.numDays}/>
    }
    return(
      <div className='data-analysis'>
        <h2>Data Analysis</h2>
        <SelectField currentUser={this.props.currentUser} handleSelectField={this.handleSelectField} selected={this.state.selectedField}/>
        {graphDisplay}
      </div>
    );
  }
  
}




const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps)(DataAnalysis);