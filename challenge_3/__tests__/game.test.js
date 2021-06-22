import React from 'react';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Name', () => {
  test('name', () => {
    expect(1).toBe(1);
  });
});
