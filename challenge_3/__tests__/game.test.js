import React from 'react';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Bowling from '../client/Bowling.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Name', () => {
  test('name', () => {
    expect(1).toBe(1);
  });

  test('Simulate selecting a pin', () => {
    const wrapper = mount(<Bowling />);
    expect(JSON.stringify(wrapper.find('Scoreboard').prop('scores'))).toBe(JSON.stringify([]));
    wrapper.find('button[value=1]').simulate('click');
    expect(JSON.stringify(wrapper.find('Scoreboard').prop('scores'))).toBe(JSON.stringify([{ first: 1 }]));
  });
});
