import React from 'react';
import moment from 'moment';

export default function SingleWorkoutDelete(props){
  const workoutDate = props.currentWorkout.date;

  return(
    <div>
      <p>Delete workout from {moment(workoutDate).format('dddd, MMMM Do')} ?</p>
      <div>

        <button onClick={() => props.confirmDelete()}>
          Confirm Delete
        </button>

        <button onClick={() => props.toggleDeleteScreen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

