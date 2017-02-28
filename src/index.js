import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';  
import { Router, browserHistory, hashHistory } from 'react-router';  
import reduxThunk from 'redux-thunk';  
import cookie from 'react-cookie';  
import routes from './routes';  
import reducers from './reducers/index';  
import { AUTH_USER } from './actions/types';

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);  
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');

if (token) {  
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(  
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.querySelector('.wrapper'));