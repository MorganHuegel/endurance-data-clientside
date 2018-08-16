import React from 'react';
import { shallow } from 'enzyme';

import { SetPreferences } from '../../components/user-preferences/setPreferences';

describe('<SetPreferences />', () => {
  const testCurrentUser = {
    username: 'derpyderp',
    email: 'derp@foo.com',
    preferences: [],
    workouts: []
  }

  it('should render <SetPreferences />', () => {
    shallow(<SetPreferences currentUser={testCurrentUser}/>);
  });
});