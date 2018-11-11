import React from 'react';
import { connect } from 'react-redux';

import SelectField from './selectField';
import Graph from './graph';

export class DataAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedField: null,
      numDays: 30
    }
  }

  handleSelectField = e => {
    e.preventDefault();
    this.setState({selectedField: e.target['select-field'].value});
  }

  render() {
    let graphDisplay;
    if (this.state.selectedField) {
      graphDisplay = <Graph data={this.props.currentUser.workouts} selectedField={this.state.selectedField} numDays={this.state.numDays}/>
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