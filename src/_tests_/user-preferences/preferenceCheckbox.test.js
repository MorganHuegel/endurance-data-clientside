import React from 'react';
import { shallow } from 'enzyme';

import PreferenceCheckbox from '../../components/user-preferences/preferenceCheckbox';

describe('<PreferenceCheckbox />', () => {

  /* ----- Props that would be passed down to the component ----- */
  const testKey = 'totalDistance';
  const testValue = 'totalDistance';
  const testDisplayedValue = 'Total Distance';
  const testSidenote = '';
  const testSelectedFields = ['totalTime', 'averagePace', 'hoursOfSleep', 'tss'];
  const testHandleCheck = jest.fn();

  
  it('should render <PreferenceCheckbox />', () => {
    shallow(<PreferenceCheckbox 
      key={testKey}
      value={testValue}
      displayedValue={testDisplayedValue}
      sidenote={testSidenote}
      handleCheck={testHandleCheck}
      selectedFields={testSelectedFields}
    />);
  })
});