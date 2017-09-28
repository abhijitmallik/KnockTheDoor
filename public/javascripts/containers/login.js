import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleLogin} from '../actions/loginAction';
import {authenticateUser} from '../actions/adminLogin';
import '../../stylesheets/style.css';

class Login extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
		this.cancel = this.cancel.bind(this);
	}
	render(){
		return(
            <div className='admin-form'>
               <div className='form-field'>
                 <label className='form-label'>User Name</label>
                 <input type='text' className='form-input' ref = "userName"></input>
               </div>
               <div className='form-field'>
                 <label className='form-label'>Password</label>
                 <input type='password' className='form-input' ref = "password"></input>
               </div>
               <div className='form-field'>
                 <button className='submit-class' onClick={this.submit}>Submit</button>
                 <button className='submit-class' onClick={this.cancel}>Cancel</button>
               </div>
            </div>
		)
	}
	submit(){
        var userName = this.refs.userName.value;
        var password = this.refs.password.value;

        console.log("username",userName);
        console.log("password",password);
        var obj = {
           userName:userName,
           password:password
        };
        this.props.login(obj);
	}
	cancel(){
        this.props.hideLogIn(false);
	}
}
function mapDispatchAction(dispatch){
  return bindActionCreators({hideLogIn:toggleLogin,login:authenticateUser},dispatch);
}

export default connect(null,mapDispatchAction)(Login);