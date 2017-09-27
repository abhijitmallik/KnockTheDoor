import React,{Component} from 'react';
import '../../stylesheets/style.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleLogin } from '../actions/loginAction';


class Admin extends Component{
	constructor(props){
		super(props);
		this.login = this.login.bind(this);
	}
	render(){
       return(
       	    <div className='login-div'>
                <button  className='login-button'  onClick={this.login}>LogIn</button>
       	     </div>)
	}
	login(){
		 this.props.showLogin(true);
	}
} 
function bindActionWithClass(dispatch){
   return bindActionCreators({showLogin:toggleLogin},dispatch)
}

export default connect(null,bindActionWithClass)(Admin);