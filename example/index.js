import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { setStore } from '../src';
import Dumb from './components/Dumb';

setStore(store);

const App = () => (
  <div>
    <Dumb name="Peter" />
  </div>
);

render(<App />, document.getElementById('root'));
