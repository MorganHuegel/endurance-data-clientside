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
      numDays: 30,
      includeOffDays: false
    }
  }

  handleCheckOffDays = e => {
    this.setState({
      includeOffDays: e.target.checked
    });
  }

  handleChangeSelectedField = e => {
    e.preventDefault();
    this.setState({selectedField: e.target.value})
  }

  handleChangeNumDays = e => {
    e.preventDefault();
    this.setState({numDays: Number(e.target.value)})
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
          handleCheckOffDays={this.handleCheckOffDays}
          handleChangeNumDays={this.handleChangeNumDays}
          handleChangeSelectedField={this.handleChangeSelectedField}
          selected={this.state.selectedField} 
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