import React from 'react';
import { shallow } from 'enzyme';

import App from '../components/app';

describe('<App />', () => {
  it('should render the <App /> component', () => {
    const initialState = {
      loading: false,
      currentUser: null,
      workoutError: null,
      loginError: null,
      registerError: null
    }
    const wrapper = shallow(<App store={initialState}/>);
    console.log('WRAPPER',wrapper.debug());
  });
});