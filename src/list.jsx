import React from 'react';
import ReactDOM from 'react-dom';
import ListApp from '@src/ListApp';
import { Provider } from 'react-redux';
import reduxStore from '@src/redux';

ReactDOM.render(
  <Provider store={reduxStore}>
    <ListApp />
  </Provider>,
  document.getElementById('list'),
);
