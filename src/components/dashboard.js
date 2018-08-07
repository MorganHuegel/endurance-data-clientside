import React from 'react';
import WorkoutList from './workoutList';
import SingleWorkout from './singleWorkout';
import DataAnalysis from './dataAnalysis';
import UserPreferences from './userPreferences';
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

        <Route exact path='/workouts' component={WorkoutList}/>
        <Route exact path='/workouts/:id' component={SingleWorkout}/>
        <Route exact path='/analysis' component={DataAnalysis}/>
        <Route exact path='/profile' component={UserPreferences}/>
      </div>
    </Router>
  )
}