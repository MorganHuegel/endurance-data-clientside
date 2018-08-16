import React from 'react';
import { shallow } from 'enzyme';

import { SetUsername } from '../../components/user-preferences/setUsername';

describe('<SetUsername />', () => {
  const testCurrentUser = {
    username: 'derpyderp',
    email: 'derp@foo.com',
    preferences: [],
    workouts: []
  }

  it('should render <SetUsername />', () => {
    shallow(<SetUsername currentUser={testCurrentUser}/>);
  });
});