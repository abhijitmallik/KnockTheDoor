import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleLogin} from '../actions/loginAction';
import {authenticateUser} from '../actions/adminLogin';
import { Redirect } from 'react-router-dom';


class AdminLogin extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
		this.cancel = this.cancel.bind(this);
    this.state = {redirectToNewPage: false};
	}
  //Another above two methods that only get called when initializing a component are componentWillMount and componentDidMount.
  componentWillMount(){
    
  }
  //As soon as the render method has been executed the componentDidMount function is called. 
  componentDidMount(){
    this.submit();
  }
	render(){
    if (this.state.redirectToNewPage == true) {
        return (<Redirect to="/employee"/>)
     }else{
      return(
            <div className='admin-form'>
               <div className='admin-header'>Admin LogIn</div>
               <div className='form-field'>
                 <label className='form-label'>User Name</label>
                 <input type='text' className='form-input' ref = "userName"></input>
               </div>
               <div className='form-field'>
                 <label className='form-label'>Password</label>
                 <input type='password' className='form-input' ref = "password"></input>
               </div>
               <div className='form-field button-groups'>
                 <button className='submit-class ok-button' onClick={this.submit.bind(this)}>Submit</button>
                 <button className='submit-class' onClick={this.cancel.bind(this)}>Cancel</button>
               </div>
            </div>
      )
    }
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
        this.props.login(obj,(status) => {
          if(status){
            this.setState({ redirectToNewPage: true });
          }
        });
	}
	cancel(){
        this.props.hideLogIn(false);
	}
}
function mapDispatchAction(dispatch){
  return bindActionCreators({hideLogIn:toggleLogin,login:authenticateUser},dispatch);
}

export default connect(null,mapDispatchAction)(AdminLogin);