import React from 'react';
import { shallow } from 'enzyme';

import { RegisterForm } from '../components/registerForm';

describe('<registerForm />', () => {
  it('should render the <registerForm /> component', () => {
    shallow(<RegisterForm />);
  });
});