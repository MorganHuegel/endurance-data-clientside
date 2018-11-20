import React from 'react';
import '../../stylesheets/data-analysis/graph.css';

import { changeGraph } from './graph-utils';
import { fields } from '../user-preferences/preferenceForm';

export default class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }
  }

  componentDidMount(){
    changeGraph(this.props.data, this.props.numDays, this.props.selectedField);
    window.addEventListener('resize', this.resizeWindow);
  }
  
  componentDidUpdate(){
    changeGraph(this.props.data, this.props.numDays, this.props.selectedField);
  }

  resizeWindow = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  render(){
    if (this.state.noData) {
      return <p>No data to display</p>
    } 
    else {
      let captionField;
      for (let i = 0; i < 3; i++) {
        const correctField = fields[i].inputs.find(field => field.value === this.props.selectedField)
        if (correctField) captionField = correctField;
        else continue;
      }

      return (
        <figure>
          <figcaption>Displaying <span className='caption'>{captionField.displayedValue}</span> over the last 30 days</figcaption>
          <svg className='da-graph'></svg>
        </figure>
      )
    }
  }
}