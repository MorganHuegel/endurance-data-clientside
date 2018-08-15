import React from 'react';
import { shallow } from 'enzyme';

import Workouts from '../../components/workout-list/workouts';

describe('<Workouts />', () => {

  it('should render the <Workouts /> component', () => {
    shallow(<Workouts />);
  });


});