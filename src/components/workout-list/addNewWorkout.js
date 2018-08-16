import '../../stylesheets/workouts/addNewWorkout.css';

import React from 'react';
import moment from 'moment';
import { renderInputs } from './renderInputFunction';
import { setWorkoutError } from '../../actions/workoutsDelete';
import formatDisplayName from '../../format-display-name';

export default class AddWorkout extends React.Component{

  componentWillMount(props){
    if(this.props.currentUser){
      this.props.changeFormOptions(this.props.currentUser.preferences, 'ADD');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //all possible fields that need units appended
    const fieldsWithUnit = [
      'totalDistance', 'totalTime', 'averagePace', 
      'maximumPace', 'totalElevation', 'waterDrank'
    ];
    let newWorkoutObj = {};
    this.props.formOptions.forEach(field => {
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
    newWorkoutObj.userId = this.props.currentUser.id;
    if(!newWorkoutObj.date){
      return this.props.dispatch(setWorkoutError('Date must be included for this workout.'));
    }

    this.props.handleAddFormSubmit(newWorkoutObj);
  }

  render(props){
    const nonDisplayedFields = [
      'totalDistance', 'totalTime', 'averagePace', 'maximumPace', 'averageWatts', 
      'maximumWatts', 'totalElevation', 'averageHeartrate', 'maxHeartrate', 'tss', 
      'minutesStretching', 'minutesFoamRollingMassage', 'minutesCore', 'injuryRating', 
      'sorenessRating', 'stressRating', 'bodyWeight', 'dietRating', 'hoursOfSleep', 
      'waterDrank', 'notes'
    ].filter(field => !this.props.formOptions.includes(field));

    const dropboxOptions = nonDisplayedFields.map(field => {
      const formattedName = formatDisplayName(field);
      return (
        <option value={field} key={field}>{formattedName}</option>
      )
    })

    const buttonFunction = (event) => this.props.changeFormOptions( [event.target.value], 'DELETE');
    const inputFields = this.props.formOptions.map(field => {
      return renderInputs(field, 'addForm', null, null, buttonFunction);
    });

    let currentDate = moment().format('YYYY-MM-DD');

    return (
      <div className='add-workout'>
        <h2>New Workout</h2>
        <form id='addForm' onSubmit={e => this.handleSubmit(e)}>
          <div className='form-field date'>
            <label htmlFor='date'>Workout Date:</label>
            <div className='input-row'>
              <input type='date' id='date' defaultValue={currentDate} required/>
            </div>
          </div>

          {inputFields}

           <div className='add-field'>
            <label htmlFor='addFieldDropbox'>Add Field:</label>
            <select onChange={e => this.props.changeFormOptions([e.target.value], 'ADD')}>
              <option value=''></option>
              {dropboxOptions}
            </select>
          </div>
          <button type='submit'>Submit Workout</button>
          <button type='reset' onClick={() => this.props.toggleAddState(false)}>Cancel</button>
        </form>
      </div>
    )
  }
}