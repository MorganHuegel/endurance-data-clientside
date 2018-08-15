import '../../stylesheets/user-preferences/setPreferences.css';

import React from 'react';
import { connect } from 'react-redux';

import PreferenceForm from './preferenceForm';

function SetPreferences(props){
  // new user has no preferences yet
  if (props.currentUser.preferences.length === 0) {
    return (
      <div className='set-preferences'>
        <h2>Welcome {props.currentUser.username}!</h2>
        <p>Select what data you want to track!</p>
        <span className='sidenote'> (These settings can be changed at any time)</span>
        <PreferenceForm dispatch={ props.dispatch } submitButtonMessage={'Get Started'} onSubmitPath={'/workouts'} nevermindButton={false} {...props}/>
      </div>
    )

  } else {
    return (
      <div className='set-preferences'>
        <h2>Change Default Fields</h2>
        <p>Select what data you want to track!</p>
        <span className='sidenote'> (These settings can be changed at any time)</span>
        <PreferenceForm dispatch={ props.dispatch } onSubmitPath={'/profile'} submitButtonMessage={'Change Preferences'} nevermindButton={true} {...props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(SetPreferences);
