import React from 'react';
import { connect } from 'react-redux';

function SingleWorkout(props){
  return (
    <h2>Single Workout {props.workoutId}</h2>
  )
};

const mapStateToProps = (state, props) => {
  return {
    workoutId: props.match.params.id,
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(SingleWorkout);