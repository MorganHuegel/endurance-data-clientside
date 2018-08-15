import React from 'react';
import { shallow } from 'enzyme';

import ShowMoreWorkouts from '../../components/workout-list/showMoreWorkouts';

describe('<ShowMoreWorkouts />', () => {

  /* ----- Props that are passed down to component ----- */
  const testNonDisplayedDates = ['March 2011', 'February 2011', 'January 1998'];
  const testCurrentUser = {
    userId: "000000001111111100000000",
    preferences: ['totalTime', 'totalDistance'],
    workouts: [],
    username: 'TestUser',
    email: 'TestUserEmail@foo.com'
  };  
  const testViewSingleWorkout = jest.fn();


  it('should render the component', () => {
    shallow(<ShowMoreWorkouts 
      nonDisplayedDates={testNonDisplayedDates}
      currentUser={testCurrentUser}
      viewSingleWorkout={testViewSingleWorkout}
    />);
  });
});