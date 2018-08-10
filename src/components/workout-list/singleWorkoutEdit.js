import React from 'react';
import moment from 'moment';
import { renderInputs } from './renderInputFunction';
import { setWorkoutError } from '../../actions/workoutsDelete';

export default function SingleWorkoutEdit(props){
  //all possible fields that need units appended
  const fieldsWithUnit = [
    'totalDistance', 'totalTime', 'averagePace', 
    'maximumPace', 'totalElevation', 'waterDrank'
  ];

  function handleSubmit(event){
    event.preventDefault();

    //adds correct date, id, and userId to the workout object
    let workoutObj = Object.assign({}, {}, {
      id: props.currentWorkout.id,
      userId: props.currentWorkout.userId
    });

    Object.keys(props.currentWorkout).forEach(field => {
      if(!event.target[field] || !event.target[field].value){ //Don't store empty fields
        return;
      }
      //if the field needs unit appended...
      else if(fieldsWithUnit.includes(field)){
        workoutObj[field] = {
          'amount': Number(event.target[field].value),  //convert String to Number
          'unit': event.target[`${field}-unit`].value
        }
      } else if ( ['date', 'notes'].includes(field) ){
        workoutObj[field] = event.target[field].value; //keep as String
      } else {
        workoutObj[field] = Number(event.target[field].value);
      }
    })

    if(!workoutObj.date){
      return props.dispatch(setWorkoutError('Date must be included for this workout.'));
    }

    props.handleEditFormSubmit(workoutObj);
  }


  const inputList = Object.keys(props.currentWorkout).map(field => {
    if( fieldsWithUnit.includes(field) ){
      return renderInputs(field, 'editForm', props.currentWorkout[field].amount, props.currentWorkout[field].unit);
    } else {
      return renderInputs(field, 'editForm', props.currentWorkout[field]);
    }
  })
  
  return(
    <form id='editForm' onSubmit={e => handleSubmit(e)}>
      <p>Edit workout from {moment(props.currentWorkout.date).format('MMMM Do, dddd')} ?</p>
      <label htmlFor='date'>Workout Date:</label>
      <input type='date' defaultValue={moment(props.currentWorkout.date).format('YYYY-MM-DD')} id='date' form='editForm'/>

      {inputList}

      <button type='submit'>Submit changes</button>
      <button type='reset' onClick={() => props.toggleEditState(false)}>Cancel changes</button>
    </form>
  );
};