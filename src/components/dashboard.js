import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import WorkoutList from './workout-list/workoutList';
import SingleWorkout from './workout-list/singleWorkout';
import SingleWorkoutEdit from './workout-list/singleWorkoutEdit';
import SingleWorkoutDelete from './workout-list/singleWorkoutDelete';
import DataAnalysis from './data-analysis/dataAnalysis';
import UserPreferences from './user-preferences/userPreferences';

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
        <Route exact path='/workouts/:id/edit' component={SingleWorkoutEdit}/>
        <Route exact path='/workouts/:id/delete' component={SingleWorkoutDelete}/>
        <Route exact path='/analysis' component={DataAnalysis}/>
        <Route exact path='/profile' component={UserPreferences}/>
      </div>
    </Router>
  )
}