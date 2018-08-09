import React from 'react';
import moment from 'moment';
import { renderInputsFromPreferences } from './renderInputFunctions';

export default function AddWorkout(props){

  function handleSubmit(event){
    event.preventDefault();
    //all possible fields that need units appended
    const fieldsWithUnit = [
      'totalDistance', 'totalTime', 'averagePace', 
      'maximumPace', 'totalElevation', 'waterDrank'
    ];
    let newWorkoutObj = {};
    props.currentUser.preferences.forEach(field => {
      if(!event.target[field].value){ //Don't store empty fields
        return;
      }
      //if the field needs unit appended...
      else if(fieldsWithUnit.includes(field)){
        newWorkoutObj[field] = {
          'amount': Number(event.target[field].value),  //convert String to Number
          'unit': event.target[`${field}-unit`].value
        }
      } else if (field !== 'notes'){
        newWorkoutObj[field] = Number(event.target[field].value);
      } else {
        newWorkoutObj[field] = event.target[field].value; //keep as String
      }
    })

    newWorkoutObj.date = event.target['date'].value;
    newWorkoutObj.userId = props.currentUser.id;
    console.log(newWorkoutObj);
    props.handleAddFormSubmit(newWorkoutObj);
  }

  const inputFields = renderInputsFromPreferences(props.currentUser.preferences);
  let currentDate = moment().format('YYYY-MM-DD');

  return (
    <div className='lightbox'>
      <h3>New Workout</h3>
      <form id='addForm' onSubmit={e => handleSubmit(e)}>
        <label htmlFor='date'>Workout Date:</label>
        <input type='date' id='date' defaultValue={currentDate} required/>

        {inputFields}

        <button type='submit'>Submit Workout</button>
        <button type='reset' onClick={() => props.toggleAddState(false)}>Cancel</button>
      </form>
    </div>
  )
}