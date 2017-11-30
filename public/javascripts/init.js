import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Init from './containers/index';
import Employees from './containers/employees';
import userForm from './containers/signup';
import AdminLogin from './containers/adminLogin';
import SignIn from './containers/signin/signin';
import reducers from './reducers';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import '.././stylesheets/style.css';
import '.././stylesheets/cropper.css';



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
ReactDOM.render( 
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="main-container">
       <Route path="/" component={Init} />
       <Route path="/employee" component={Employees}/>
       <Route path="/signup" component={userForm}/>
       <Route path="/admin" component={AdminLogin}/>
       <Route path="/signin" component={SignIn}/>
      </div> 
    </BrowserRouter>
  </Provider>,document.getElementById('app'));