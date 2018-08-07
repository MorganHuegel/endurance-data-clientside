import React from 'react';
import { connect } from 'react-redux';

function UserPreferences(){
  return(
    <div>
      <h2>User Preferences</h2>
      <ul>
        <li>
          Change my default preferences
        </li>
        <li>
          Change my password
        </li>
        <li>
          Change my username
        </li>
        <li>
          Change my email
        </li>
      </ul>
    </div>
  );
}

export default connect()(UserPreferences);