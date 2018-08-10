import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';

import Workouts from './workout-list/workouts';
import DataAnalysis from './data-analysis/dataAnalysis';
import Profile from './user-preferences/profile';
import SetPreferences from './user-preferences/setPreferences';
import SetEmail from './user-preferences/setEmail';
import SetUsername from './user-preferences/setUsername';
import SetPassword from './user-preferences/setPassword';

export default function Dashboard(props){
  if (props.currentUser.preferences.length === 0) {
    return (
      <Router>
        <div>
          <SetPreferences />
        </div>
      </Router>
    )
  } else {

  return (
    <Router>
      <div>
        <nav>
          <Link to='/workouts' className='navbar-link'>Workout Logs</Link>
          <Link to='/analysis' className='navbar-link'>Data Analysis</Link>
          <Link to='/profile' className='navbar-link'>Profile</Link>
        </nav>

        <p className='error-message'>{props.workoutError}</p>

        <Switch>
          <Route exact path='/workouts' component={Workouts}/>
          <Route exact path='/analysis' component={DataAnalysis}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/profile/preferences' component={SetPreferences} />
          <Route exact path='/profile/email' component={SetEmail} />
          <Route exact path='/profile/username' component={SetUsername} />
          <Route exact path='/profile/password' component={SetPassword} />
          <Redirect from='/' to='/workouts'/>
        </Switch>

      </div>
    </Router>
  )
  }
}