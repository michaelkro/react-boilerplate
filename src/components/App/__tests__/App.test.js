import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

test('it renders properly', () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toMatchSnapshot();
});
