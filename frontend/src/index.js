import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';

import RequireAuth from './components/auth/require_auth';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';

import Theme from './components/theme';
import Welcome from './components/welcome';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// store contains redux state
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
import { AUTH_USER } from './actions/types';

// if token exists, update app state to signed in
if (token){
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  // <Provider store={createStoreWithMiddleware(reducers)}>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="theme" component={RequireAuth(Theme)} />
      </Route>
    </Router>
    {/* <App /> */}
  </Provider>
  , document.querySelector('.all-contents')
);
