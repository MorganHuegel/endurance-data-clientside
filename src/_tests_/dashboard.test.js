import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '../components/dashboard';

describe('<Dashboard />', () => {
  //Example props that would be sent to Dashbaord component
  const currentUser = {
    userId: "000000001111111100000000",
    preferences: ['totalTime', 'totalDistance'],
    workouts: [],
    username: 'TestUser',
    email: 'TestUserEmail@foo.com'
  };
  
  const workoutError = null;


  it('should render the <Dashboard /> component', () => {
    shallow(
      <Dashboard 
        currentUser={currentUser} 
        workoutError={workoutError}
      />
    );
  });


});