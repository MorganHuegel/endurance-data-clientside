import React from 'react';
import moment from 'moment';
import { renderInputsFromPreferences } from './renderInputFunction';

export default function SingleWorkoutEdit(props){

  const workoutFields = Object.keys(props.currentWorkout);  //whatever fields that are in that specific workout will be rendered as inputs
  const inputList = renderInputsFromPreferences(workoutFields);
  
  return(
    <form id='editForm' name='editForm'>
      <p>Edit workout from {moment(props.currentWorkout.date).format('MMMM Do, dddd')} ?</p>

      {inputList}

      <button type='submit'>Submit changes</button>
      <button type='reset' onClick={() => props.toggleEditState(false)}>Cancel changes</button>
    </form>
  );
};