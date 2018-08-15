import React from 'react';
import { shallow } from 'enzyme';

import SingleWorkoutEdit from '../../components/workout-list/singleWorkoutEdit';

describe('<SingleWorkoutEdit />', () => {

  //Example props that would be sent to Dashbaord component
  const testCurrentWorkout = {
    id: '11111111111111111111',
    date: '2018-08-14T00:00:00.000',
    userId: '000000001111111100000000',
    totalTime: {amount: 10, unit: 'minutes'},
    totalDistance: {amount: 2, unit: 'km'},
    averageHeartrate: 155
  };
  const testFormOptions = [];

  /* ------ Props that are Functions ----- */
  const testToggleEditState = jest.fn();
  const testHandleEditFormSubmit = jest.fn();
  const testChangeFormOptions = jest.fn();



  it('should render the <SingleWorkoutEdit /> component', () => {
    shallow(
      <SingleWorkoutEdit 
        currentWorkout={testCurrentWorkout} 
        toggleEditState={testToggleEditState}
        handleEditFormSubmit={testHandleEditFormSubmit}
        formOptions={testFormOptions}
        changeFormOptions={testChangeFormOptions}
      />
    );
  });


});