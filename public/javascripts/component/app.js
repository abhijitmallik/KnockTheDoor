import React , {Component} from 'react';
import Employees from '../containers/employees';
import '../../stylesheets/style.css';
import Admin from '../containers/admin';
import Login from '../containers/login';
import {connect} from 'react-redux';

export default class App extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
          <div>
             <Admin />
          </div>
		)
	}
}




