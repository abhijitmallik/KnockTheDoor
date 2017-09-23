import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './component/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
ReactDOM.render( 
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App  />
  </Provider>,document.getElementById('app'));