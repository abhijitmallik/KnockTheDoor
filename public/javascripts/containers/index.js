import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socket from '../socket.js';
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
	}
	handleWindowClose(ev){
		ev.preventDefault();
		socket.emit("signout",{id:this.props.loggedInUser.id,online:false});
        return ev.returnValue = 'Are you sure you want to close?';
	}
	signOut(){
		socket.emit("signout",{id:this.props.loggedInUser.id,online:false});
		this.setState({logout:true});
		this.props.show = false;
	}
	render(){
			return(
		       <div className='login-div'>
		         {this.props.show   ? <div className="link-button"><Link className='login-button' to="/profile">Profile</Link></div> : ""}
		         {(this.props.show || this.props.adminLogin.status)  ? <div className="link-button"><Link className='login-button' to="/employee">Users</Link></div> : ""}
		         <div className="user-profile-button-group">
		             {!this.props.adminLogin.status ? <div className="link-button"><Link className='login-button' to="/admin">Admin</Link></div> : ""}
		             {!this.props.show ? <div className="link-button"><Link className='login-button' to="/signup">Sign Up</Link></div> : ""}
		             {!this.props.show ? <div className="link-button"><Link className='login-button' to="/signin">Sign in</Link></div> : ""}
			         {(this.props.show || this.props.adminLogin.status)  ? <div className="link-button"><Link className='login-button' to="/" onClick={this.signOut.bind(this)}>Sign out</Link></div>:""}
		         </div>
		       </div>
           )
	}
}
 function mapPropsToComponent(state){
 	return({show:state.userLogIn.enable,adminLogin:state.adminUserLogin,editUserLogin:state.editUser.enable,loggedInUser:state.userLogIn.userData});
 } 

 export default  connect(mapPropsToComponent)(Init);
