import React from 'react';
import { connect } from 'react-redux';
import { formatWorkoutDisplay } from '../../format-workout';
import { Link } from 'react-router-dom';

function SingleWorkout(props){
  // finds workout by ID from params
  const currentWorkout = props.currentUser.workouts.find(entry => entry.id === props.workoutId);

  //makes copy of workout so that the state is not modified directly
  const serializedWorkout = Object.assign({}, currentWorkout);

  /* for fields that are objects {amount:... unit:...}, turns value into a single
  string.  Also, removes ID and userID from object, because those don't need displayed.
  Also, runs each field through the formatting function to remove camel casing */
  Object.keys(serializedWorkout).forEach(field => {
    formatWorkoutDisplay(field, serializedWorkout);
  })

  //Displays formatted data in a list
  const workoutDetails = Object.keys(serializedWorkout).map(field => {
    if(field !== 'date') {
      return (
        <li key={field}>
          <p>{field}: {serializedWorkout[field]}</p>
        </li>
      )
    } else {
      return null;
    }
  });


  return (
    <div>
      <h2>{serializedWorkout.date}</h2>
      <ul>
        {workoutDetails}
      </ul>

      <Link to='/workouts'>
        <button>Back to Workouts</button>
      </Link>

      <Link to={`/workouts/${props.workoutId}/edit`}>
        <button>Edit Workout</button>
      </Link>

      <Link to={`/workouts/${props.workoutId}/delete`}>
        <button>Delete Workout</button>
      </Link>
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