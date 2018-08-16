import React from 'react';
import { shallow } from 'enzyme';

import {App} from '../components/app';

describe('<App />', () => {
  const initialState = {
      loading: false,
      currentUser: null,
      workoutError: null,
      loginError: null,
      registerError: null
    }
  const testDispatch = jest.fn();

  it('should render the <App /> component', () => {
    shallow(<App store={initialState} dispatch={testDispatch}/>);
  });
});