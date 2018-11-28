import React from 'react';
import { connect } from 'react-redux';
import '../../stylesheets/data-analysis/dataAnalysis.css'

import SelectField from './selectField';
import Graph from './graph';
import { convertDataUnits } from './normalizeData';

export class DataAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedField: null,
      numDays: null,
      includeOffDays: false
    }
  }

  handleCheckOffDays = (e) => {
    this.setState({
      includeOffDays: e.target.checked
    });
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
      graphDisplay = <Graph 
        data={normalizedData} 
        selectedField={this.state.selectedField} 
        numDays={this.state.numDays} 
        includeOffDays={this.state.includeOffDays}
      />
    }
    return(
      <div className='data-analysis'>
        <SelectField 
          currentUser={this.props.currentUser} 
          handleSelectField={this.handleSelectField} 
          selected={this.state.selectedField} 
          handleCheckOffDays={this.handleCheckOffDays}
        />
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