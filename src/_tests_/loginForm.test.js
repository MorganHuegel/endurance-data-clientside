import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from '../components/loginForm';

describe('<LoginForm />', () => {
  it('should render the <LoginForm /> component', () => {
    const wrapper = shallow(<LoginForm />);
    console.log('WRAPPER',wrapper.debug());
  });
});