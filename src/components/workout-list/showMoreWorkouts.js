import '../../stylesheets/workouts/showMoreWorkouts.css';

import React from 'react';
import moment from 'moment';

export default class ShowMoreWorkouts extends React.Component {
  constructor(props){
    super(props);

    let initialState = {};
    this.props.nonDisplayedDates.forEach(date => {
      initialState[date] = false;
    })

    this.state = Object.assign({}, initialState);
  }

  convertTimeStringToUnix = (dateString) => {
    return moment(dateString, 'MMMM YYYY').format('x');
  }

  handleShowSectionClick = (targetDate) => {
    this.setState({[`${targetDate}`]: true})
  }

  handleHideSectionClick = (targetDate) => {
    this.setState({[`${targetDate}`]: false})
  }

  handleClickOnWorkout = (event) => {
    const workoutId = event.target.getAttribute('workoutId');
    if(!workoutId){
      return;
    } else {
      return this.props.viewSingleWorkout(workoutId);
    }
  }


  render(){
    const showMoreLinks = Object.keys(this.state).map(date => {
      if(this.state[date] === false){
        return (
          <li className='show-more' key={Date.parse(date)}>
            <button onClick={e => this.handleShowSectionClick(date)}>
              Show {date}
            </button>
          </li>
        )
      } else {
        // filters all workouts from state to include only ones within 31 days of date on the button
        const withinThirtyDays = this.props.currentUser.workouts.filter(workout => {
          const buttonTime = this.convertTimeStringToUnix(date);
          const dataTime = Date.parse(workout.date);
          return ( dataTime >= buttonTime 
                  && dataTime - (1000 * 60 * 60 * 24 * 31) <= buttonTime )
        });
        // makes a list of all workouts within 30 days of the date on original button
        const showMoreList = withinThirtyDays.map(workout => {
          return (
            <li key={workout.id} id={workout.id} className='displayed-workout-list'>
              <a href={`#${workout.id}`} workoutid={workout.id}>{moment(workout.date).format('MMMM Do, dddd')}</a>
            </li>
          )
        });

        return (
          <div key={date} className='show-old-workouts'>
            <h3>
              {date}
              <button onClick={e => this.handleHideSectionClick(date)} className='hide-workout-list'>Hide</button>
            </h3>
            <ul onClick={e => this.handleClickOnWorkout(e)}>
              {showMoreList}
            </ul>
          </div>
        );
      }
    });


    return (
      <ul>
        {showMoreLinks}
      </ul>
    )
  }
}

