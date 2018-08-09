import React from 'react';
import { connect } from 'react-redux';

import PreferenceForm from './preferenceForm';

function SetPreferences(props){

  // new user has no preferences yet
  if (props.currentUser.preferences.length === 0) {
    return (
      <div className='lightbox'>
        <h2>Welcome {props.currentUser.username}!</h2>
        <p>Which aspects of your fitness would you like us to log?<span className='sidenote'> (These settings can be changed at any time)</span></p>
        <PreferenceForm dispatch={ props.dispatch } submitButtonMessage={'Get Started'} {...props}/>
      </div>
    )

  } else {
    return (
      <div className='lightbox'>
        <h2>Change Default Fields</h2>
        <p>Which aspects of your fitness would you like us to log?<span className='sidenote'> (These settings can be changed at any time)</span></p>
        <PreferenceForm dispatch={ props.dispatch } submitButtonMessage={'Change Preferences'} {...props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(SetPreferences);
