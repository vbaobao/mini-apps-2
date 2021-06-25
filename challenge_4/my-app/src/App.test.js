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

  test('Clicking on the Restart Game button will restart the game', () => {
    const props = wrapper.props().store.getState().game;
    const mine = props.board.findIndex((e) => e === -100);

    wrapper.find(`div.cell-container[value=${mine}]`).simulate('click');
    wrapper.find('div.cell-container').forEach((tile) => {
      expect(tile.hasClass('hidden')).toEqual(false);
    });

    wrapper.find('button').simulate('click');
    wrapper.find('div.cell-container').forEach((tile) => {
      expect(tile.hasClass('hidden')).toEqual(true);
    });
  });
});

describe('Test the game mechanics', () => {
  const getN = (index) => index - 10;
  const getE = (index) => index + 1;
  const getS = (index) => index + 10 ;
  const getW = (index) => index - 1;
  const getNE = (index) => index - 10 + 1;
  const getNW = (index) => index - 10 - 1;
  const getSE = (index) => index + 10 + 1;
  const getSW = (index) => index + 10 - 1;

  test('Clicking on a 0 at index 0 does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 0;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] !== 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getE(index), getS(index), getSE(index)];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(1);
    });
  });

  test('Clicking on a 0 at index 100 does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 99;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] !== 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getN(index), getW(index), getNW(index)];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(1);
    });
  });

  test('Clicking on a 0 at index at leftmost of board does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 10;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] !== 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getN(index), getE(index), getNE(index), getSE(index, getS(index))];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(1);
    });
  });

  test('Clicking on a 0 at index at rightmost of board does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 19;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] !== 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getN(index), getW(index), getNW(index), getSW(index, getS(index))];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(1);
    });
  });

  test('Clicking on a !0 at index 0 does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 0;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] === -100 || props.board[index] === 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getE(index), getS(index), getSE(index)];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(0);
    });
  });

  test('Clicking on a !0 at index 100 does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 99;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] === -100 || props.board[index] === 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getN(index), getW(index), getNW(index)];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(0);
    });
  });

  test('Clicking on a !0 at index at leftmost of board does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 10;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] === -100 || props.board[index] === 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getN(index), getE(index), getNE(index), getSE(index, getS(index))];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(0);
    });
  });

  test('Clicking on a !0 at index at rightmost of board does not reveal out of bounds', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    const index = 19;
    let props = wrapper.props().store.getState().game;

    while (props.board[index] === -100 || props.board[index] === 0) {
      wrapper.find('button').simulate('click');
      props = wrapper.props().store.getState().game;
    }

    const checkTiles = [getN(index), getW(index), getNW(index), getSW(index, getS(index))];
    wrapper.find(`.cell-container[value=${index}]`).simulate('click');
    checkTiles.forEach((adjTile) => {
      expect(wrapper.props().store.getState().game.revealed[adjTile]).toBe(0);
    });
  });

  test('Clicking on a mine reveals all tiles and game state is false', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    let props = wrapper.props().store.getState().game;
    const mine = props.board.findIndex((e) => e === -100);

    wrapper.find(`div.cell-container[value=${mine}]`).simulate('click');
    props = wrapper.props().store.getState().game;

    expect(props.status).toEqual(false);
    props.revealed.forEach((tile) => {
      expect(tile).toEqual(1);
    });
  });

  test('Game ends when all mines are avoided, reveals board', () => {
    const wrapper = mount(<Provider store={configureStore()}><App /></Provider>);
    let props = wrapper.props().store.getState().game;

    props.board.forEach((tile, index) => {
      if (props.board[index] !== -100 && wrapper.props().store.getState().game.revealed[index] !== 1) {
        wrapper.find(`.cell-container[value=${index}]`).simulate('click');
      }
    });

    expect(wrapper.props().store.getState().game.status).toEqual(false);
    wrapper.props().store.getState().game.revealed.forEach((tile) => {
      expect(tile).toEqual(1);
    });
  });
});