import '../../stylesheets/workouts/singleWorkoutDelete.css';

import React from 'react';
import moment from 'moment';

export default function SingleWorkoutDelete(props){
  const workoutDate = props.currentWorkout.date;

  return(
    <div className='single-workout-delete'>
      <p>Delete workout from <span className='date'>{moment(workoutDate).format('dddd, MMMM Do')}</span> ?</p>
      <div className='button-container'>

        <button onClick={() => props.confirmDelete()} className='delete button'>
          Confirm Delete
        </button>

        <button onClick={() => props.toggleDeleteScreen(false)} className='back button'>
          Cancel
        </button>
      </div>
    </div>
  );
};

