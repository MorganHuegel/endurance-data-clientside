import React from 'react';
import { shallow } from 'enzyme';

import PreferenceFieldset from '../../components/user-preferences/preferenceFieldset';

describe('<PreferenceFieldset />', () => {

  const testInputs = [
    {value: 'totalDistance', displayedValue:'Total Distance', sidenote:''},
    {value: 'totalTime', displayedValue:'Total Time', sidenote:''},
    {value: 'averagePace', displayedValue:'Average Pace / Speed', sidenote:''},
    {value: 'maximumPace', displayedValue:'Max Pace / Speed', sidenote:''},
    {value: 'averageWatts', displayedValue:'Average Watts', sidenote:''},
    {value: 'maximumWatts', displayedValue:'Max Watts', sidenote:''},
    {value: 'totalElevation', displayedValue:'Total Elevation', sidenote:''},
    {value: 'averageHeartrate', displayedValue:'Average Heartrate', sidenote:''},
    {value: 'maxHeartrate', displayedValue:'Max Heartrate', sidenote:''},
    {value: 'tss', displayedValue:'TSS', sidenote:''}
  ];
  /* Props that would get passed down to component */
  const testKey = '123456789012345678901234';
  const testName = 'workoutDetails';
  const testDisplayName = 'Workout Details';
  const testHandleCheck = jest.fn();

  it('should render <PreferenceFieldset />', () => {
    shallow(<PreferenceFieldset 
      key={testKey}
      name={testName} 
      displayName={testDisplayName}
      inputs={testInputs}
      handleCheck={testHandleCheck}
    />);
  });
});