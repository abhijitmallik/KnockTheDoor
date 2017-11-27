import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import {addEmployee} from '../actions/employeeAction';
import { connect } from 'react-redux';
import UploadImage from './uploadimage/uploadImage';




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
     type:'Number',
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
  phone:{
     type:'input',
     label:'Phone',
     key:10,
     name:'phone'
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
  },
  uploadPhoto:{
     type:'blob',
     label:'Upload Image',
     key:11,
     name:'uploadPhoto'
  }
}

class PostNew extends Component {
  constructor(){
    super();
    this.renderField = this.renderField.bind(this);
  }
  callAttribute(field){
    return <Field label={field.label} key={field.key} type={field.type}  name={field.name} component={this.renderField}/>
  }

  renderField(field){
    const {meta:{touched,error}} = field;
    const {label,type,key} = field;
    if(label === "Upload Image"){
       return(
          <div className="upload-image">
              <UploadImage message="Upload Image"/>
          </div>
       )
    }else{
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
     
  }
  onSubmit(obj){
    this.props.addEmployee(obj,(data) => {
      this.props.reset();     
  });
  }
  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return(
      <div className="form-div">
        <div className="form-header">Registration Form</div>
        <form className="employee-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

function validate(values){
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
   return errors;
}


export default reduxForm({
  validate,
  fields : _.keys(FIELDS),
  form:'PostNewForm'
})(connect(null,{addEmployee})(PostNew));

