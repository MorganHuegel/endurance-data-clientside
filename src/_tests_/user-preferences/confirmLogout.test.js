import React from 'react';
import { shallow } from 'enzyme';

import ConfirmLogout from '../../components/user-preferences/confirmLogout';

describe('<ConfirmLogout />', () => {
  /*
  ---- Initial State of this component ------
  initialState = {
    confirmed: false,
    nevermind: false
  } */


  /* ----- Props that would be passed down to the component ----- */
  const testDispatch = jest.fn();


  it('should render <ConfirmLogout />', () => {
    shallow(<ConfirmLogout 
      dispatch={testDispatch}
    />);
  })
});