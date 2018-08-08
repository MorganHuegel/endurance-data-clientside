import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteWorkoutDatabase } from '../../actions/workoutsDelete';

function SingleWorkoutDelete(props){
  const workoutDate = props.currentUser.workouts.find(workout => workout.id === props.workoutId).date;


  return(
    <div>
      <p>Delete workout from {moment(workoutDate).format('dddd, MMMM Do')} ?</p>
      <div>
        <Link to={`/workouts`}>
          <button onClick={ () => props.dispatch(deleteWorkoutDatabase(props.workoutId))}>
            Confirm Delete
          </button>
        </Link>

        <Link to={`/workouts/${props.workoutId}`}>
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    currentUser : state.auth.currentUser,
    workoutId : props.match.params.id
  }
}

export default connect(mapStateToProps)(SingleWorkoutDelete);