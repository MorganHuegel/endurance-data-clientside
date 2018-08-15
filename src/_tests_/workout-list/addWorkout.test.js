import React from 'react';
import { shallow } from 'enzyme';

import AddWorkout from '../../components/workout-list/addNewWorkout';

describe('<AddWorkout />', () => {
  //Example props that would be sent to Dashbaord component
  const testCurrentUser = {
    userId: "000000001111111100000000",
    preferences: ['totalTime', 'totalDistance'],
    workouts: [],
    username: 'TestUser',
    email: 'TestUserEmail@foo.com'
  };
  const testFormOptions = [];

  /* ------ Props that are Functions ----- */
  const testToggleAddState = jest.fn();
  const testHandleAddFormSubmit = jest.fn();
  const testDispatch = jest.fn();
  const testChangeFormOptions = jest.fn();



  it('should render the <AddWorkout /> component', () => {
    shallow(
      <AddWorkout 
        toggleAddState={testToggleAddState}
        currentUser={testCurrentUser} 
        handleAddFormSubmit={testHandleAddFormSubmit}
        dispatch={testDispatch}
        formOptions={testFormOptions}
        changeFormOptions={testChangeFormOptions}
      />
    );
  });


});