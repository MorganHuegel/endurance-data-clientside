import React from 'react';
import { formatWorkoutDisplay } from '../../format-workout';

export default function SingleWorkout(props){
  // gets workout from props
  const currentWorkout = props.currentWorkout;

  //makes copy of workout so that the state is not mutated
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

        <button onClick={() => props.backToWorkoutList()}>Back to Workouts</button>

        <button onClick={ () => props.toggleEditState(true)}>Edit Workout</button>

        <button onClick={() => props.toggleDeleteScreen(true)}>Delete Workout</button>
    </div>

  )
};