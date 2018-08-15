import React from 'react';
import { shallow } from 'enzyme';

import PreferenceForm from '../../components/user-preferences/preferenceForm';

describe('<PreferenceForm />', function(){
  /* ----- Example Props that are passed down ------ */
  const testCurrentUserNew = {
    userId: "000000001111111100000000",
    preferences: ['totalTime', 'totalDistance'],
    workouts: [],
    username: 'TestUser',
    email: 'TestUserEmail@foo.com'
  };
  const testDispatch = jest.fn();
  const testOnSubmitPath = '/profile';
  const testSubmitButtonMessage = 'Change Preferences';
  const testNevermindButton = '';

  it('should render <PreferenceForm />', () => {
    shallow(<PreferenceForm 
        currentUser={testCurrentUserNew}
        dispatch={testDispatch}
        onSubmitPath={testOnSubmitPath}
        submitButtonMessage={testSubmitButtonMessage}
        nevermindButton={testNevermindButton}
      />);
  })
});