import React from 'react';
import moment from 'moment';
import { renderInputs } from './renderInputFunction';
import { setWorkoutError } from '../../actions/workoutsDelete';

export default class AddWorkout extends React.Component{

  // componentWillMount(props){
  //   this.setState({formOptions: this.props.currentUser.preferences});
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    //all possible fields that need units appended
    const fieldsWithUnit = [
      'totalDistance', 'totalTime', 'averagePace', 
      'maximumPace', 'totalElevation', 'waterDrank'
    ];
    let newWorkoutObj = {};
    this.props.currentUser.preferences.forEach(field => {
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

  render(){

    const inputFields = this.props.currentUser.preferences.map(field => {
      return renderInputs(field, 'addForm');
    });

    let currentDate = moment().format('YYYY-MM-DD');

    return (
      <div className='lightbox'>
        <h3>New Workout</h3>
        <form id='addForm' onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='date'>Workout Date:</label>
          <input type='date' id='date' defaultValue={currentDate} required/>
          {inputFields}
          {addFieldDropbox}
          <button type='submit'>Submit Workout</button>
          <button type='reset' onClick={() => this.props.toggleAddState(false)}>Cancel</button>
        </form>
      </div>
    )
  }
}

const addFieldDropbox = (
  <div className='addField'>
  <label htmlFor='addFieldDropbox'>Add Field:</label>
  <select>
    <option>Total Distance:</option>
  </select>
</div>
);