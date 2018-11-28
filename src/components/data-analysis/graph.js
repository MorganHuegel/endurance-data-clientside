import React from 'react';
import moment from 'moment';
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
    let captionField;
    for (let i = 0; i < 3; i++) {
      const correctField = fields[i].inputs.find(field => field.value === this.props.selectedField)
      if (correctField) captionField = correctField;
      else continue;
    }

    // Only use most recent for calculating average
    const workouts = this.props.data.filter(workout => {
      const now = Number(moment(moment().format('YYYY MMM D'), 'YYYY MMM D').format('x'));
      const workoutDate = Number(moment(workout.date).format('x'));
      return (now - workoutDate <= 1000 * 60 * 60 * 24 * this.props.numDays) && (workout[this.props.selectedField]);
    });

    // calculate average
    let total = 0;
    workouts.forEach(workout => {
      const value = workout[this.props.selectedField].amount || workout[this.props.selectedField];
      if (value) total += value;
    });

    const average = (total / this.props.numDays).toFixed(2);

    return (
      <figure>
        <figcaption>Average <span className='caption'>{captionField.displayedValue}</span> over the last {this.props.numDays} days is {average}</figcaption>
        <svg className='da-graph'></svg>
      </figure>
    )
  }
}
