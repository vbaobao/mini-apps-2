import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('Test that the proper DOM elements are present.', () => {
  const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);

  test('The title reflects the start game state', () => {
    expect(wrapper.find('h1').text()).toEqual('Minesweeper');
  });

  test('The board by default has 100 tiles', () => {
    expect(wrapper.find('div.cell-container')).toHaveLength(100);
  });

  test('The board tiles are empty', () => {
    wrapper.find('div.cell-container').forEach((element) => {
      expect(element.hasClass('hidden')).toEqual(true);
    });
  });

  test('There is a "Reset Game" button', () => {
    expect(wrapper.find('button').text()).toEqual('Restart Game');
  });

  test('At game over, the title and tiles reflects this status.', () => {
    const props = wrapper.props().store.getState().game;
    const mine = props.board.findIndex((e) => e === -100);

    wrapper.find(`div.cell-container[value=${mine}]`).simulate('click');
    expect(wrapper.find('h1').text()).toEqual('Game End!');

    wrapper.find('div.cell-container').forEach((tile) => {
      expect(tile.hasClass('hidden')).toEqual(false);
    });
  });
});

describe('Test the game mechanics', () => {
  const getN = (index, n) => index - n;
  const getE = (index, n) => index + 1;
  const getS = (index, n) => index + n ;
  const getW = (index, n) => index - 1;
  const getNE = (index, n) => index - n + 1;
  const getNW = (index, n) => index - n - 1;
  const getSE = (index, n) => index + n + 1;
  const getSW = (index, n) => index + n - 1;
  
  const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
  const props = wrapper.props().store.getState().game;

  test('Clicking on a 0 at index 0', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a 0 at index 100', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a 0 at index at leftmost of board', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a 0 at index at rightmost of board', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a !0 at index 0', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a !0 at index 100', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a !0 at index at leftmost of board', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a !0 at index at rightmost of board', () => {
    expect(1).toBe(1);
  });

  test('Clicking on a mine reveals all tiles', () => {
    expect(1).toBe(1);
  });

  test('Game ends when all mines are avoided, reveals board', () => {
    expect(1).toBe(1);
  });
});