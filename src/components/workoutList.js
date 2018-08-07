import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export function WorkoutList(props){
  const currentTime = Date.now();
  let nonDisplayedDates = [];

  const workoutList = props.currentUser.workouts.map(workout => {
    const workoutDate = Date.parse(workout.date);

    //only display workouts for the last 30 days (1000 * 60 * 60 * 24 * 30)
    if(currentTime - workoutDate <= 2592000000){
      return (
        <li key={workout.id}>
          {moment(workoutDate).format('MMMM Do, dddd')}
        </li>
      )
    } else {  // for workouts that aren't shown, display their month as a link below
      const alreadyThere = nonDisplayedDates.find(date => {
        return date = moment(workoutDate).format('MMMM YYYY');
      })
      if(!alreadyThere){
        nonDisplayedDates.push(moment(workoutDate).format('MMMM YYYY'));
      }
      return null;
    }
  });

  const showMoreLinks = nonDisplayedDates.map(date => {
    return (
      <li className='show-more' key={Date.parse(date)}>
        <a>Show {date}</a>
      </li>
    )
  });


  return(
    <div>
      <h2>Workout</h2>
      <ul>
        {workoutList}
      </ul>
      <ul>
        {showMoreLinks}
      </ul>
    </div>
  );
}


const mapStateToProps = (state, props) => {
  return{
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(WorkoutList);