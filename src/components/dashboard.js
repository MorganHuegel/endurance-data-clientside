import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

export default function Dashboard(props){
  return (
    <Router>
      <div>
        <nav>
          <Link to='/workouts' className='navbar-link'>Workout Logs</Link>
          <Link to='/analysis' className='navbar-link'>Data Analysis</Link>
          <Link to='/profile' className='navbar-link'>User Preferences</Link>
        </nav>
        <ul>
          <li>{props.currentUser.workouts[0].date}</li>
        </ul>
      </div>
      </Router>
  )
}