import React from 'react';
import { shallow } from 'enzyme';

import LoginScreen from '../components/loginScreen';

describe('<LoginScreen />', () => {
  it('should render the <LoginScreen /> component', () => {
    shallow(<LoginScreen />);
  });
});