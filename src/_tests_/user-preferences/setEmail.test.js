import React from 'react';
import { shallow } from 'enzyme';

import SetEmail from '../../components/user-preferences/setEmail';

describe('<SetEmail />', () => {
  it('should render <SetEmail />', () => {
    shallow(<SetEmail />);
  });
});