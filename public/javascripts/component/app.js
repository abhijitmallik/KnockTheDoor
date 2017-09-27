import React , {Component} from 'react';
import Employees from '../containers/employees';
import '../../stylesheets/style.css';
import Admin from '../containers/admin';
import Login from '../containers/login';
import {connect} from 'react-redux';

class App extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
          <div className='main-container'>
             <Admin />
             <Employees />
             <div>
                { this.props.login.showLogin ? <Login /> : null }
             </div>
          </div>
		)
	}
}

function mapPropesToState(state){
	return {login:state.showLogin}
}

export default connect(mapPropesToState)(App); 


