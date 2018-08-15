import React from 'react';
import { shallow } from 'enzyme';

import Profile from '../../components/user-preferences/profile';

describe('<Profile />', () => {
  it('should render <Profile />', () => {
    shallow(<Profile />);
  });
});