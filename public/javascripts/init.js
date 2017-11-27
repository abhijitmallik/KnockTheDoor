import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './component/app';
import Employees from './containers/employees';
import userForm from './containers/userform';
import Login from './containers/login';
import reducers from './reducers';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import '.././stylesheets/style.css';
import '.././stylesheets/cropper.css';



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
ReactDOM.render( 
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="main-container">
       <Route path="/" component={App} />
       <Route path="/employee" component={Employees}/>
       <Route path="/login" component={Login}/>
       <Route path="/employeeForm" component={userForm}/>
      </div> 
    </BrowserRouter>
  </Provider>,document.getElementById('app'));