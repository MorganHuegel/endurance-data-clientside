import React from 'react';
import { shallow } from 'enzyme';

import { SetEmail } from '../../components/user-preferences/setEmail';

describe('<SetEmail />', () => {
  const testCurrentUser = {
    username: 'derpyderp',
    email: 'derp@foo.com',
    preferences: [],
    workouts: []
  }

  it('should render <SetEmail />', () => {
    shallow(<SetEmail currentUser={testCurrentUser}/>);
  });
});