import React from 'react';
import { shallow } from 'enzyme';

import SingleWorkout from '../../components/workout-list/singleWorkout';

describe('<SingleWorkout />', () => {
  //Example props that would be sent to Dashbaord component
  const testCurrentWorkout = {
    id: '11111111111111111111',
    date: '2018-08-14T00:00:00.000',
    userId: '000000001111111100000000',
    totalTime: {amount: 10, unit: 'minutes'},
    totalDistance: {amount: 2, unit: 'km'},
    averageHeartrate: 155
  };
  const testBackToWorkoutList = jest.fn();
  const testToggleDeleteScreen = jest.fn();
  const testToggleEditState = jest.fn();

  it('should render the <SingleWorkout /> component', () => {
    shallow(
      <SingleWorkout 
        currentWorkout={testCurrentWorkout} 
        backToWorkoutList={testBackToWorkoutList}
        toggleDeleteScreen={testToggleDeleteScreen}
        toggleEditState={testToggleEditState}
      />
    );
  });


});