import React from 'react';
import moment from 'moment';

import ShowMoreWorkouts from './showMoreWorkouts';

export default function WorkoutList (props){
  const currentTime = Date.now();
  let nonDisplayedDates = [];

  const workoutList = props.currentUser.workouts.map(workout => {
    const workoutDate = Date.parse(workout.date);

    //only display workouts for the last 30 days (1000 * 60 * 60 * 24 * 30)
    if(currentTime - workoutDate <= 2592000000){
      return (
        <li key={workout.id} value={workout.id} onClick={e => console.log(e.target.value)}>
          {moment(workoutDate).format('MMMM Do, dddd')}
        </li>
      )
    } else {
      // for workouts that aren't shown, display their month as a link below
      const alreadyThere = nonDisplayedDates.find(date => {
        return date === moment(workoutDate).format('MMMM YYYY');
      })
      if(!alreadyThere){
        nonDisplayedDates.push(moment(workoutDate).format('MMMM YYYY'));
      }
      return null;
    }
  });


  return(
    <div>
      <button>Log New Workout</button>
      <h2>Most Recent</h2>
      <ul>
        {workoutList}
      </ul>
      <ShowMoreWorkouts nonDisplayedDates={nonDisplayedDates} currentUser={props.currentUser}/>
    </div>
  );
}