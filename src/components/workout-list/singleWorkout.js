import React from 'react';
import { connect } from 'react-redux';

function SingleWorkout(props){
  const currentWorkout = props.currentUser.workouts.find(entry => entry.id === props.workoutId);

  const fieldsList = Object.keys(currentWorkout)
  const valuesList = fieldsList.map(field => {
    return currentWorkout[field];
  })

  fieldsList.forEach(field => {
    if(typeof currentWorkout[field] === 'Object'){
      console.log(field);
    }
  })
  console.log('FIELDS',fieldsList);
  console.log('VALUES',valuesList);

  return (
    <div>
      <h2>Single Workout {props.workoutId}</h2>
      <ul>
        {fieldsList}
      </ul>
    </div>

  )
};

const mapStateToProps = (state, props) => {
  return {
    workoutId: props.match.params.id,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(SingleWorkout);