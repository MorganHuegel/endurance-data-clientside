import React from 'react';
import { shallow } from 'enzyme';

import { LoginForm } from '../components/loginForm';

describe('<LoginForm />', () => {
  it('should render the <LoginForm /> component', () => {
    shallow(<LoginForm />);
  });
});