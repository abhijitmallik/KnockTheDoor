import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import '../../stylesheets/style.css';
import {addEmployee} from '../actions/employeeAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const FIELDS = {
  firstname:{
     type:'input',
     label:'First Name',
     key:1,
     name:'firstname'
  },
  lastname:{
     type:'input',
     label:'Last Name',
     key:2,
     name:'lastname'
  },
  age:{
     type:'input',
     label:'Age',
     key:3,
     name:'age'
  },
  occupation:{
     type:'input',
     label:'Occupation',
     key:4,
     name:'occupation'
  },
  city:{
     type:'input',
     label:'City',
     key:5,
     name:'city'
  },
  state:{
     type:'input',
     label:'State',
     key:6,
     name:'state'
  },
  pin:{
     type:'input',
     label:'Pin',
     key:7,
     name:'pin'
  },
  email:{
     type:'email',
     label:'Email',
     key:8,
     name:'email'
  },
  dateOfJoin:{
     type:'date',
     label:'Date Of Join',
     key:9,
     name:'dateOfJoin'
  }
}

const submitForm = (obj)=>{
  //addEmployee
  this.props.addEmployee(obj,(data) => {
      console.log("employee inserted",data);     
  });
}

const renderField = ({
  input,
  label,
  type,
  key,
  meta: { touched, error, warning }
}) => (
  <div className="field-div">
    <div >
      <span className="label-name">{label}</span>
      <input {...input} placeholder={label} type={type} key={key} className="form-input"/>
     
      {touched &&
        ((error && <span className="error-msg">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const userForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="form-div">
      <div className="form-header">Registration Form</div>
      <form className="employee-form" onSubmit={handleSubmit(submitForm)}>
      {_.map(FIELDS,function(field){
           return <Field name={field.name} type={field.type} key={field.key} component={renderField} label={field.label} />
      })}
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
  )
}

const validate = values =>{
  const errors = {};
  _.each(FIELDS,(type,field)=>{
     if(!values[field]){
      if(type.type == "email"){
        errors[field] = `Enter an ${field}`;
      }else{
        errors[field] = `Enter a ${field}`;
      }
      
     }
     else if(type.type == "email" && values[field]){
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])) {
          errors[field] = 'Invalid email address'
        }
      }
  });
  return errors
}

const mapStateToProps = (state) => ({
    // ...
});

const mapDispatchToProps = (dispatch)  => ({
    return bindActionCreators({addEmployee},dispatch);
});

userForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(userForm);


export default reduxForm({
    form:'userForm',
    fields : _.keys(FIELDS),
    validate
})(userForm);