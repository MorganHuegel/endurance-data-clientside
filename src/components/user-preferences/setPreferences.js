import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PreferenceForm from './preferenceForm';

function SetPreferences(props){
  const nevermindButton = (
    <Link to='/profile'>
      <button type='button'>Nevermind...</button>
    </Link>
  )

  // new user has no preferences yet
  if (props.currentUser.preferences.length === 0) {
    return (
      <div className='lightbox'>
        <h2>Welcome {props.currentUser.username}!</h2>
        <p>Which aspects of your fitness would you like us to log?<span className='sidenote'> (These settings can be changed at any time)</span></p>
        <PreferenceForm dispatch={ props.dispatch } submitButtonMessage={'Get Started'} onSubmitPath={'/workouts'} nevermindButton={''} {...props}/>
      </div>
    )

  } else {
    return (
      <div className='lightbox'>
        <h2>Change Default Fields</h2>
        <p>Which aspects of your fitness would you like us to log?<span className='sidenote'> (These settings can be changed at any time)</span></p>
        <PreferenceForm dispatch={ props.dispatch } onSubmitPath={'/profile'} submitButtonMessage={'Change Preferences'} nevermindButton={nevermindButton} {...props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(SetPreferences);
