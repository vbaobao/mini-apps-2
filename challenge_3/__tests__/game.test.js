import React from 'react';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Bowling from '../client/Bowling.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Name', () => {

  test('Simulate selecting a pin', () => {
    const wrapper = mount(<Bowling />);
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([]);
    wrapper.find('button[value=1]').simulate('click');
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([{ first: "1", total: 1 }]);
  });

  test('One round can only add up to 10', () => {
    const wrapper = mount(<Bowling />);
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([]);
    wrapper.find('button[value=9]').simulate('click');
    expect(wrapper.find('button[value=2]').hasClass('inactive')).toBe(true);
  });

  test('Simulate 1 round', () => {
    const wrapper = mount(<Bowling />);
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([]);
    wrapper.find('button[value=5]').simulate('click');
    wrapper.find('button[value=2]').simulate('click');
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([{ first: "5", second: "2", total: 7 }]);
  });

  test('Simulate a strike', () => {
    const wrapper = mount(<Bowling />);
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([]);
    wrapper.find('button[value=10]').simulate('click');
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([{ first: "X", second: " ", total: 10 }]);
  });

  test('Simulate a spare', () => {
    const wrapper = mount(<Bowling />);
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([]);
    wrapper.find('button[value=5]').simulate('click');
    wrapper.find('button[value=5]').simulate('click');
    expect(wrapper.find('Scoreboard').prop('scores')).toMatchObject([{ first: "5", second: "/", total: 10 }]);
  });

  test('Simulate a perfect game', () => {
    const clicks = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    const wrapper = mount(<Bowling />);
    clicks.forEach((click) => {
      wrapper.find(`button[value=${click}]`).simulate('click');
    });
    expect(wrapper.find('Scoreboard').prop('scores')[9].total).toBe(300);
  });

  test('Simulate a game of spares', () => {
    const clicks = [5, 5, 3, 7, 2, 8, 6, 4, 0, 10, 9, 1, 3, 7, 2, 8, 6, 4, 1, 9];
    const wrapper = mount(<Bowling />);
    clicks.forEach((click) => {
      wrapper.find(`button[value=${click}]`).simulate('click');
    });
    expect(wrapper.find('Scoreboard').prop('scores')[9].total).toBe(132);
  });

  test('Simulate a game where round 10 contains a strike', () => {
    const clicks = [5, 5, 3, 7, 2, 8, 6, 4, 0, 10, 9, 1, 3, 7, 2, 8, 6, 4, 10, 9, 9];
    const wrapper = mount(<Bowling />);
    clicks.forEach((click) => {
      wrapper.find(`button[value=${click}]`).simulate('click');
    });
    expect(wrapper.find('Scoreboard').prop('scores')[9].total).toBe(159);
  });

  test('Reset the game', () => {
    const clicks = [5, 5, 3, 7, 2, 8, 6, 4, 0, 10, 9, 1, 3, 7, 2, 8, 6, 4, 10, 9, 9];
    const wrapper = mount(<Bowling />);
    clicks.forEach((click) => {
      wrapper.find(`button[value=${click}]`).simulate('click');
    });
    expect(wrapper.find('Scoreboard').prop('scores')[9].total).toBe(159);
    wrapper.find(`button[value="Restart"]`).simulate('click');
    expect(wrapper.find('Scoreboard').props()).toMatchObject({
      scores: [],
      isFirstFrame: true,
      bonus: false
    });
    expect(wrapper.find('Pins').prop('isFirstFrame')).toBe(true);
    expect(wrapper.find('Pins').prop('gameState')).toBe(true);
  });
});
