import React from 'react';
import { shallow } from 'enzyme';

import WorkoutList from '../../components/workout-list/workoutList';

describe('<WorkoutList />', () => {

  //Example props that would be sent to Dashbaord component
  const testCurrentUserNew = {
    userId: "000000001111111100000000",
    preferences: ['totalTime', 'totalDistance'],
    workouts: [],
    username: 'TestUser',
    email: 'TestUserEmail@foo.com'
  };
  const testViewSingleWorkout = jest.fn();
  const testToggleAddState = jest.fn();

  it('should render the <WorkoutList /> component', () => {
    shallow(
      <WorkoutList 
        currentUser={testCurrentUserNew} 
        viewSingleWorkout={testViewSingleWorkout}
        toggleAddState={testToggleAddState}
      />
    );
  });


});