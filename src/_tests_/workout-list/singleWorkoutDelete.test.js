import React from 'react';
import { shallow } from 'enzyme';

import SingleWorkoutDelete from '../../components/workout-list/singleWorkoutDelete';

describe('<SingleWorkoutDelete />', () => {
  //Example props that would be sent to Dashbaord component
  const testCurrentWorkout = {
    id: '11111111111111111111',
    date: '2018-08-14T00:00:00.000',
    userId: '000000001111111100000000',
    totalTime: {amount: 10, unit: 'minutes'},
    totalDistance: {amount: 2, unit: 'km'},
    averageHeartrate: 155
  };

  const testToggleDeleteScreen = jest.fn();
  const testConfirmDelete = jest.fn();

  it('should render the <SingleWorkoutDelete /> component', () => {
    shallow(
      <SingleWorkoutDelete 
        currentWorkout={testCurrentWorkout} 
        confirmDelete={testConfirmDelete}
        toggleDeleteScreen={testToggleDeleteScreen}
      />
    );
  });


});