import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { types } from 'mobx-state-tree';
import { Dumb as DumbComponent } from '../example/components/Dumb';
import { Store as DumbStore } from '../example/store';
import wrap, { setStore } from '../src';

beforeEach(() => {
  setStore(null); // Reset the store to its default value.
});

test("Wrapped component throws if setStore wasn't used", () => {
  spyOn(console, 'error'); // Avoid priting error on screen.
  const WrappedDumb = wrap(() => {})(DumbComponent);
  expect(() => render(<WrappedDumb />)).toThrow(
    'Please, use setStore before your ReactDOM.render call'
  );
});

test('setStore should work with only one store', () => {
  const store = { name: 'Peter' };
  setStore(store);
  const WrappedDumb = wrap(({ name }) => ({ name }))(DumbComponent);
  const { getByTestId } = render(<WrappedDumb />);
  expect(getByTestId('name')).toHaveTextContent('Peter');
});

test('setStore should work with more than one store', () => {
  const userStore = { name: 'Peter' };
  const uiStore = {};
  setStore({ user: userStore, ui: uiStore });
  const WrappedDumb = wrap(({ user }) => ({ name: user.name }))(DumbComponent);
  const { getByTestId } = render(<WrappedDumb />);
  expect(getByTestId('name')).toHaveTextContent('Peter');
});

test('Component should be rerendred when an observable changes', () => {
  const store = DumbStore.create();
  setStore(store);
  const WrappedDumb = wrap(({ index, addIndex }) => ({ index, addIndex }))(
    DumbComponent
  );
  const { getByTestId } = render(<WrappedDumb />);
  expect(getByTestId('index')).toHaveTextContent('1');
  fireEvent.click(getByTestId('addIndex'));
  expect(getByTestId('index')).toHaveTextContent('2');
});

test('wrap should pass ownProps', () => {
  setStore({});
  const WrappedDumb = wrap(() => ({}))(DumbComponent);
  const { getByTestId } = render(<WrappedDumb name="John" />);
  expect(getByTestId('name')).toHaveTextContent('John');
});
