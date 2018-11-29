import React from 'react';
import { updateUserInfo } from '../../actions/userUpdate';
import { Redirect } from 'react-router-dom';
import PreferenceFieldset from './preferenceFieldset';

export default class PreferenceForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      formError: '',
      selectedFields: [],
      submitted: false
    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleCheck(event){
    const checkboxValue = event.target.value;

    if ( !this.state.selectedFields.find(field => field === checkboxValue) ) {
      this.setState({selectedFields: [...this.state.selectedFields, checkboxValue]});
    } else {
      this.setState({selectedFields: this.state.selectedFields.filter(field => field !== checkboxValue)});
    }
  }


  handleSubmit (event) {
    event.preventDefault();
    if (this.state.selectedFields.length === 0) {
      this.setState({
        formError: 'Must have at least one field selected.',
        selectedFields: []
      })
    } else {
      this.setState({submitted: true}, () => {
        this.props.dispatch(updateUserInfo({preferences: this.state.selectedFields}));
      });
    }
  }


  render(props){
    let nevermindButton = '';

    if(this.props.nevermindButton){
      nevermindButton = <button type='button' className='back' onClick={e => this.setState({submitted: true})}>Nevermind...</button>
    }

  
    if(this.state.submitted){
      return <Redirect to={this.props.onSubmitPath} />
    }

    /* FIELDS variable is at bottom of this file (for brevity) */
    const fieldsets = fields.map(fieldset => {
      return <PreferenceFieldset 
        key={fieldset.name}
        name={fieldset.name} 
        displayName={fieldset.displayName}
        inputs={fieldset.inputs}
        handleCheck={this.handleCheck}
        selectedFields={this.state.selectedFields}  />
    })

    return (
      <form id='preferenceForm' onSubmit={e => this.handleSubmit(e)}>
        <p className='error-message'>{this.state.formError}</p>

        {fieldsets}

        <button type='submit'>{this.props.submitButtonMessage}</button>
        <button type='reset' onClick={() => this.setState({selectedFields: []})} >Clear Form</button>
        {nevermindButton}
      </form>
    )

    
  }
};



export const fields = [
  {
    name: 'workoutDetails',
    displayName: 'Workout Details',
    inputs: [
      {value: 'totalDistance', displayedValue:'Total Distance', sidenote:'', normalizedUnit: 'miles'},
      {value: 'totalTime', displayedValue:'Total Time', sidenote:'', normalizedUnit: 'minutes'},
      {value: 'averagePace', displayedValue:'Average Pace / Speed', sidenote:'', normalizedUnit: 'mph'},
      {value: 'maximumPace', displayedValue:'Max Pace / Speed', sidenote:'', normalizedUnit: 'mph'},
      {value: 'averageWatts', displayedValue:'Average Watts', sidenote:'', normalizedUnit: 'watts'},
      {value: 'maximumWatts', displayedValue:'Max Watts', sidenote:'', normalizedUnit: 'watts'},
      {value: 'totalElevation', displayedValue:'Total Elevation', sidenote:'', normalizedUnit: 'feet'},
      {value: 'averageHeartrate', displayedValue:'Average Heartrate', sidenote:'', normalizedUnit: 'bpm'},
      {value: 'maxHeartrate', displayedValue:'Max Heartrate', sidenote:'', normalizedUnit: 'bpm'},
      {value: 'tss', displayedValue:'TSS', sidenote:'', normalizedUnit: ''}
    ]
  },
  {
    name: 'injuryDetails',
    displayName: 'Injury-Prevention Details',
    inputs: [
      {value: 'minutesStretching', displayedValue:'Time Stretching', sidenote:'(min)', normalizedUnit: 'minutes'},
      {value: 'minutesFoamRollingMassage', displayedValue:'Time Foam Rolling / Massage', sidenote:'(min)', normalizedUnit: 'minutes'},
      {value: 'minutesCore', displayedValue:'Time on Core Work', sidenote:'(min)', normalizedUnit: 'minutes'},
      {value: 'injuryRating', displayedValue:'Injury Rating', sidenote:'(1-10)', normalizedUnit: 'out of 10'},
      {value: 'sorenessRating', displayedValue:'Soreness Rating', sidenote:'(1-10)', normalizedUnit: 'out of 10'}
    ]
  },
  {
    name: 'generalDetails',
    displayName: 'General Details',
    inputs: [
      {value: 'stressRating', displayedValue:'Stress Rating', sidenote:'(1-10)', normalizedUnit: 'out of 10'},
      {value: 'bodyWeight', displayedValue: 'Body Weight', sidenote:'', normalizedUnit: 'lbs'},
      {value: 'dietRating', displayedValue: 'Diet Rating', sidenote:'(1-10)', normalizedUnit: 'out of 10'},
      {value: 'hoursOfSleep', displayedValue: 'Hours of Sleep', sidenote:'', normalizedUnit: 'hours'},
      {value: 'waterDrank', displayedValue: 'Amount of Water Drank', sidenote:'', normalizedUnit: 'ounces'},
      {value: 'notes', displayedValue: 'General notes', sidenote:'', normalizedUnit: ''}
    ]
  }
]