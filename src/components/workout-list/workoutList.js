import React from 'react';
import moment from 'moment';

import ShowMoreWorkouts from './showMoreWorkouts';

export default function WorkoutList (props){
  //when you click on workout, it updates stateful Workout component
  function handleClickOnWorkout (event) {
    const workoutId = event.target.getAttribute('workoutid');
    if(!workoutId){
      return;
    } else {
      return props.viewSingleWorkout(workoutId);
    }
  }


  const currentTime = Date.now();
  let nonDisplayedDates = [];

  //Makes sure workouts display in chronological order
  props.currentUser.workouts.sort( (a, b) => {
    return moment(b.date).format('x') - moment(a.date).format('x');
  });

  const workoutList = props.currentUser.workouts.map(workout => {
    const workoutDate = Date.parse(workout.date);

    //only display workouts for the last 30 days (1000 * 60 * 60 * 24 * 30)
    if(currentTime - workoutDate <= 2592000000){
      return (
        <li key={workout.id} id={workout.id} className='displayed-workout-list'>
          <a href={`#${workout.id}`} workoutid={workout.id}>{moment(workoutDate).format('MMMM Do, dddd')}</a>
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
    <div className='workoutList'>
      <button onClick={() => props.toggleAddState(true)} className='add-workout-button'>Log New Workout</button>
      <h2>Most Recent</h2>
      <ul onClick={e => handleClickOnWorkout(e)}>
        {workoutList}
      </ul>
      <ShowMoreWorkouts 
      nonDisplayedDates={nonDisplayedDates} 
      currentUser={props.currentUser}
      viewSingleWorkout={props.viewSingleWorkout}/>
    </div>
  );
}