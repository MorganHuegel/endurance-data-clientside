import React from 'react';
import { shallow } from 'enzyme';

import SetPreferences from '../../components/user-preferences/setPreferences';

describe('<SetPreferences />', () => {
  it('should render <SetPreferences />', () => {
    shallow(<SetPreferences />);
  });
});