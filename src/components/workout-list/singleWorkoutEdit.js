import '../../stylesheets/workouts/singleWorkoutEdit.css';

import React from 'react';
import moment from 'moment';
import { renderInputs } from './renderInputFunction';
import { setWorkoutError } from '../../actions/workoutsDelete';
import formatDisplayName from '../../format-display-name';


//all possible fields that need units appended
const fieldsWithUnit = [
  'totalDistance', 'totalTime', 'averagePace', 
  'maximumPace', 'totalElevation', 'waterDrank'
];


export default class SingleWorkoutEdit extends React.Component{
  componentWillMount(){
    this.props.changeFormOptions(Object.keys(this.props.currentWorkout), 'ADD');
  }


  handleSubmit = (event) => {
    event.preventDefault();

    //adds correct date, id, and userId to the workout object
    let workoutObj = Object.assign({}, {}, {
      id: this.props.currentWorkout.id,
      userId: this.props.currentWorkout.userId
    });

    this.props.formOptions.forEach(field => {
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
      return this.props.dispatch(setWorkoutError('Date must be included for this workout.'));
    }

    this.props.handleEditFormSubmit(workoutObj);
  }


  render(){
    const buttonFunction = (event) => this.props.changeFormOptions( [event.target.value], 'DELETE');

    const inputList = this.props.formOptions.map(field => {
      if(Object.keys(this.props.currentWorkout).includes(field)){ //if the currentWorkout has this field, set a default value for the input
        if( fieldsWithUnit.includes(field) ){
          return renderInputs(field, 'editForm', this.props.currentWorkout[field].amount, this.props.currentWorkout[field].unit, buttonFunction);
        } else {
          return renderInputs(field, 'editForm', this.props.currentWorkout[field], null, buttonFunction);
        }
      } else {
        return renderInputs(field, 'editForm', null, null, buttonFunction);
      }
    })
    
    //filters all possible fields so that it makes a list of the fields that are not shown
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

    return(
      <form id='editForm' onSubmit={e => this.handleSubmit(e)}>
        <p>Edit workout from <span className='display-date'>{moment(this.props.currentWorkout.date).format('MMMM Do, dddd')}</span> ?</p>
        <div className='edit-workout'>
          <div className='form-field date'>
            <label htmlFor='date'>Workout Date:</label>
            <div className='input-row'>
              <input type='date' defaultValue={moment(this.props.currentWorkout.date).format('YYYY-MM-DD')} id='date' form='editForm'/>
            </div>
          </div>

          {inputList}
          
          <div className='add-field'>
            <label htmlFor='addFieldDropbox'>Add Field:</label>
            <select onChange={e => this.props.changeFormOptions([e.target.value], 'ADD')}>
              <option value=''></option>
              {dropboxOptions}
            </select>
          </div>

          <div className='buttons-container'>
            <button type='submit'>Submit changes</button>
            <button type='reset' onClick={() => this.props.toggleEditState(false)}>Cancel changes</button>
          </div>
        </div>
      </form>
    );
  }
};