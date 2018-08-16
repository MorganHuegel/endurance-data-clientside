import React from 'react';
import { shallow, mount } from 'enzyme';

import AddWorkout from '../../components/workout-list/addNewWorkout';

describe.only('<AddWorkout />', () => {
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

  const renderComponent = function(a=testToggleAddState, b=testCurrentUser, c=testHandleAddFormSubmit, d=testDispatch, e=testFormOptions, f=testChangeFormOptions){
    return shallow(
      <AddWorkout 
        toggleAddState={a}
        currentUser={b} 
        handleAddFormSubmit={c}
        dispatch={d}
        formOptions={e}
        changeFormOptions={f}
      />
    );
  }

  it('should render the <AddWorkout /> component', () => {
    renderComponent();
  });

  // it('should display fields from the FormOptions prop', () => {
  //   const mockFormOptions = ['totalTime', 'averagePace'];

  //   const wrapper = renderComponent(undefined, undefined, undefined, undefined, mockFormOptions, undefined);
  //   const totalTimeInput = wrapper.find('#totalTime');

  //   expect(wrapper.find('.form-field').filter('#totalTime')).toEqual(totalTimeInput);

  // });

  // it('should update the FormOptions prop with User Preferences when component mounts', () => {

  // });


});