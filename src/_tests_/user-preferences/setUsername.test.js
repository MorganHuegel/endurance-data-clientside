import React from 'react';
import { shallow } from 'enzyme';

import SetUsername from '../../components/user-preferences/setUsername';

describe('<SetUsername />', () => {
  it('should render <SetUsername />', () => {
    shallow(<SetUsername />);
  });
});