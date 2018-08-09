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
      this.state.selectedFields.push(checkboxValue);
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
  
    if(this.state.submitted){
      return <Redirect to={this.props.onSubmitPath} />
    }

    /* DATA variable is at bottom of this file (for brevity) */
    const fieldsets = data.map(fieldset => {
      return <PreferenceFieldset 
        key={fieldset.name}
        name={fieldset.name} 
        displayName={fieldset.displayName}
        inputs={fieldset.inputs}
        handleCheck={this.handleCheck}  />
    })

    return (
      <form id='preferenceForm' onSubmit={e => this.handleSubmit(e)}>
        <p className='error-message'>{this.state.formError}</p>

        {fieldsets}

        <button type='submit'>{this.props.submitButtonMessage}</button>
        <button type='reset' onClick={() => this.setState({selectedFields: []})} >Clear Form</button>
        {this.props.nevermindButton}
      </form>
    )

    
  }
};



const data = [
  {
    name: 'workoutDetails',
    displayName: 'Workout Details:',
    inputs: [
      {value: 'totalDistance', displayedValue:'Total Distance', sidenote:''},
      {value: 'totalTime', displayedValue:'Total Time', sidenote:''},
      {value: 'averagePace', displayedValue:'Average Pace / Speed', sidenote:''},
      {value: 'maximumPace', displayedValue:'Max Pace / Speed', sidenote:''},
      {value: 'averageWatts', displayedValue:'Average Watts', sidenote:''},
      {value: 'maximumWatts', displayedValue:'Max Watts', sidenote:''},
      {value: 'totalElevation', displayedValue:'Total Elevation', sidenote:''},
      {value: 'averageHeartrate', displayedValue:'Average Heartrate', sidenote:''},
      {value: 'maximumHeartrate', displayedValue:'Max Heartrate', sidenote:''},
      {value: 'tss', displayedValue:'TSS', sidenote:''}
    ]
  },
  {
    name: 'injuryDetails',
    displayName: 'Injury-Prevention Details:',
    inputs: [
      {value: 'minutesStretching', displayedValue:'Time Stretching', sidenote:'(min)'},
      {value: 'minutesFoamRollingMassage', displayedValue:'Time FoamRolling / Massage', sidenote:'(min)'},
      {value: 'minutesCore', displayedValue:'Time on Core Work', sidenote:''},
      {value: 'injuryRating', displayedValue:'Injury Rating', sidenote:'(1-10)'},
      {value: 'sorenessRating', displayedValue:'Soreness Rating', sidenote:'(1-10)'}
    ]
  },
  {
    name: 'generalDetails',
    displayName: 'General Details:',
    inputs: [
      {value: 'stressRating', displayedValue:'Stress Rating', sidenote:'(1-10)'},
      {value: 'bodyWeight', displayedValue: 'Body Weight', sidenote:''},
      {value: 'dietRating', displayedValue: 'Diet Rating', sidenote:'(1-10)'},
      {value: 'hoursOfSleep', displayedValue: 'Hours of Sleep', sidenote:''},
      {value: 'waterDrank', displayedValue: 'Amount of Water Drank', sidenote:''},
      {value: 'notes', displayedValue: 'General notes', sidenote:''}
    ]
  }
]