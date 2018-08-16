import React from 'react';
import { shallow } from 'enzyme';

import { SetPassword } from '../../components/user-preferences/setPassword';

describe('<SetPassword />', () => {
  const testCurrentUser = {
    username: 'derpyderp',
    email: 'derp@foo.com',
    preferences: [],
    workouts: []
  }

  it('should render <SetPassword />', () => {
    shallow(<SetPassword currentUser={testCurrentUser}/>);
  });
});