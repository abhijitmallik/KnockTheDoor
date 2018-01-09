import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import socket from '../socket.js';
import {logOutAdmin} from '../actions/adminLogin';
import {bindActionCreators} from 'redux';
class Init extends Component{
	constructor(props){
		super(props);
		this.state={logout:false};
	}
	componentWillMount(){
		window.removeEventListener('beforeunload', this.handleWindowClose);
        if(this.state.logout){
        	this.props.show = false;
        }
	}
	componentDidMount(){
		window.addEventListener('beforeunload', this.handleWindowClose);
		//*********For User sign in page showing by default********//
		var el = ReactDOM.findDOMNode(this);
	    el.querySelector('.signin-class').click();
	    ////////////////////////////////////////////
	}
	handleWindowClose(ev){
		ev.preventDefault();
		socket.emit("signout",{id:this.props.loggedInUser.id,online:false});
        return ev.returnValue = 'Are you sure you want to close?';
	}
	signOut(){
		if(this.props.loggedInUser){
			socket.emit("signout",{id:this.props.loggedInUser.id,online:false});
		}
		this.props.logout(()=>{
			this.setState({logout:true});
		    this.props.show = false;
		}).bind(this);
		
	}
	render(){
			return(
		       <div className='login-div'>
		        <div className='current-affairs-div'>
		         <div className="dropdown">
				  <button className="dropbtn">Menu</button>
				  <div className="dropdown-content">
				    <div className="gk-div-current-affairs"><Link to="/current-affairs">Current Affairs</Link></div>
				    <div className="gk-div-current-affairs"><Link to="/signup">Daily GK</Link></div>
				    <div className="gk-div-current-affairs"><Link to="/signup">Daily Quiz</Link></div>
				  </div>
				</div>
			    </div>
		         {this.props.show   ? <div className="link-button"><Link className='login-button' to="/profile">Profile</Link></div> : ""}
		         {(this.props.show || this.props.adminLogin.status)  ? <div className="link-button"><Link className='login-button' to="/employee">Users</Link></div> : ""}
		         <div className="user-profile-button-group">
		             {!this.props.adminLogin.status ? <div className="link-button"><Link className='login-button' to="/admin">Admin</Link></div> : ""}
		             {!this.props.show ? <div className="link-button"><Link className='login-button' to="/content">Insert Data</Link></div> :""}
		             {!this.props.show ? <div className="link-button"><Link className='login-button' to="/signup">Sign Up</Link></div> : ""}
		             {!this.props.show ? <div className="link-button"><Link className='login-button signin-class' to="/signin">Sign in</Link></div> : ""}
			         {(this.props.show || this.props.adminLogin.status)  ? <div className="link-button"><Link className='login-button' to="/" onClick={this.signOut.bind(this)}>Sign out</Link></div>:""}
		         </div>
		       </div>
           )
	}
}
 function mapPropsToComponent(state){
 	return({show:state.userLogIn.enable,adminLogin:state.adminUserLogin,editUserLogin:state.editUser.enable,loggedInUser:state.userLogIn.userData});
 } 
 function mapDispatchAction(dispatch){
  return bindActionCreators({logout:logOutAdmin},dispatch);
}

 export default  connect(mapPropsToComponent,mapDispatchAction)(Init);
