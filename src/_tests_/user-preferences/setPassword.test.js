import React from 'react';
import { shallow } from 'enzyme';

import SetPassword from '../../components/user-preferences/setPassword';

describe('<SetPassword />', () => {
  it('should render <SetPassword />', () => {
    shallow(<SetPassword />);
  });
});