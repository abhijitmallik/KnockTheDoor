import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {signin} from '../../actions/signin';
import './signin.css';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import socket from '../../socket.js';

const FIELDS = {
  username:{
     type:'input',
     label:'User Name',
     key:1,
     name:'username'
  },
  password:{
     type:'password',
     label:'Password',
     key:2,
     name:'password'
  },
};

class SignIn extends Component{
	constructor(props){
      super(props);
      this.state = {redirectToUser:false};
	}
	onSubmit(obj){
		this.props.signin(obj,(user) => {  
			this.setState({redirectToUser:user.status});
            socket.emit("signin",{id:user.id,name:user.firstname});
	    });
     
	}
	renderField(field){
	    const {meta:{touched,error}} = field;
	    const {label,type,key} = field;
	      return(
	        <div className="field-div">
	          <div >
	             <span className="label-name">{label}</span>
	             <input className="form-input" key={key} type={type} {...field.input}/>
	             <span className="error-msg">{touched ? error : ' '}</span>
	          </div>
	        </div>
	      );
    }
    callAttribute(field){
      return <Field label={field.label} key={field.key} type={field.type}  name={field.name} component={this.renderField}/>
    }
	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		if(this.state.redirectToUser){
           return (<Redirect to="/employee"/>);
		}else{
			return(
				<div className="sign-in">
	              <form className="user-login-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	                <div className="form-header">Sign In</div>
			        {_.map(FIELDS,this.callAttribute.bind(this))}
			        <div className="form-button">
			          <button type="submit" disabled={submitting}>
			            Submit
			          </button>
			          <button type="button" disabled={pristine || submitting} onClick={reset}>
			            Clear Values
			          </button>
			        </div>
			        </form>
				</div>
			);
		}
		
	}
}
function validate(values){
   const errors = {};
   _.each(FIELDS,(type,field)=>{
     if(!values[field]){
      errors[field] = `Enter a ${field}`;
     }
   });
   return errors;
}

export default reduxForm({
  validate,
  fields : _.keys(FIELDS),
  form:'signInForm'
})(connect(null,{signin})(SignIn));