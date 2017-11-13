import React,{Component} from 'react';
import '../../stylesheets/style.css';
import { Link } from 'react-router-dom';



export default class Admin extends Component{
	constructor(props){
		super(props);
	}
	render(){
       return(
       	    <div className='login-div'>
       	       <div className="link-button"><Link className='login-button' to="/login">Admin</Link></div>
       	       <div className="link-button"><Link className='login-button' to="/employee">Employees</Link></div>
       	       <div className="link-button"><Link className='login-button' to="/plumbers">Plumber</Link></div>
       	       <div className="link-button"><Link className='login-button' to="/electricians">Electricians</Link></div>
       	    </div>)
	}
} 
