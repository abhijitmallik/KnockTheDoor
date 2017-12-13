import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Field, reduxForm, change } from 'redux-form';
import _ from 'lodash';
import {addEmployee} from '../actions/employeeAction';
import {editEmployee} from '../actions/employeeAction';
import { connect } from 'react-redux';
import UploadImage from './uploadimage/uploadImage';
import { Redirect } from 'react-router-dom';
import Init from './index'; 


const FIELDS = {
  firstname:{
     type:'input',
     label:'First Name',
     key:1,
     name:'firstname',
     dbName:'firstname'
  },
  lastname:{
     type:'input',
     label:'Last Name',
     key:2,
     name:'lastname',
     dbName:'lastname'
  },
  password:{
     type:'password',
     label:'Password',
     key:3,
     name:'password',
     dbName:'password'
  },
  reenterpassword:{
     type:'password',
     label:'Re-password',
     key:4,
     name:'reenterpassword',
     dbName:'reenterpassword'
  },
  age:{
     type:'Number',
     label:'Age',
     key:5,
     name:'age',
     dbName:'age'
  },
  occupation:{
     type:'input',
     label:'Occupation',
     key:6,
     name:'occupation',
     dbName:'occupation'
  },
  city:{
     type:'input',
     label:'City',
     key:7,
     name:'city',
     dbName:'city'
  },
  state:{
     type:'input',
     label:'State',
     key:8,
     name:'state',
     dbName:'state'
  },
  pin:{
     type:'input',
     label:'Pin',
     key:9,
     name:'pin',
     dbName:'pin'
  },
  phone:{
     type:'input',
     label:'Phone',
     key:10,
     name:'phone',
     dbName:'phone'
  },
  email:{
     type:'email',
     label:'Email',
     key:11,
     name:'email',
     dbName:'email'
  },
  dateOfJoin:{
     type:'date',
     label:'Date Of Join',
     key:12,
     name:'dateOfJoin',
     dbName:'dateOfJoin'
  },
  uploadPhoto:{
     type:'blob',
     label:'Upload Image',
     key:13,
     name:'uploadPhoto',
     dbName:'croppedImage'
  }
}

class PostNew extends Component {
  constructor(){
    super();
    this.renderField = this.renderField.bind(this);
    this.onCroppedImgData = this.onCroppedImgData.bind(this);
    this.valueChange = this.valueChange.bind(this);
    var stateData = [];
    var constructState='{"croppedData":"undefined","header":"Registration Form","createdEditUser":false';
    _.each(FIELDS,(type,field)=>{
       let dbState = type.dbName;
       constructState = constructState+',"'+dbState+'":""';
    });
    constructState = constructState + '}';
    this.state = JSON.parse(constructState);
  }
  componentWillMount(){
    if(this.props.header){
      this.setState({header:this.props.header});
    }
    if(this.props.userData){
      _.each(FIELDS,(type,field)=>{
         let dbState = type.dbName;
         this.setState({[dbState]:this.props.userData[dbState]});
      });
    }
  }
  callAttribute(field){
    return <Field label={field.label} key={field.key} type={field.type}  name={field.name} dbname={field.dbName} component={this.renderField} />
  }
  onCroppedImgData(data)
  {
    this.setState({croppedData:data});
  }
  valueChange(e,dbName){
    this.setState({[dbName]:e.currentTarget.value});
    this.props.dispatch(change('PostNewForm', [dbName], e.currentTarget.value));
    
  }
  renderField(field){
    const {meta:{touched,error}} = field;
    const {label,type,key,name,dbname} = field;
    
    if(label === "Upload Image"){
      let src;
      if(this.props.userData){
        src = this.props.userData[dbname];
      }
       return(
          <div className="upload-image">
              <UploadImage message="Upload Image" callbackImgCropped={this.onCroppedImgData} profileImg={src}/>
          </div>
       )
    }else{
      let val;
      let placeholder = 'Please enter your '+label;
      if(this.props.userData){
         
         val = this.state[dbname];
         if(dbname === "dateOfJoin"){
          val = "";
         }
      }
      console.log("=====this.state[dbname]===",this.state[dbname]);
      return(
        <div className="field-div">
          <div >
             <span className="label-name">{label}</span>
             <input className="form-input" key={key} type={type} {...field.input}  ref={name} value={this.state[dbname]} onChange={(e) => {this.valueChange(e,dbname)}} placeholder={placeholder}/>
             <span className="error-msg">{touched ? error : ' '}</span>
          </div>
        </div>
      );
    }
     
  }
  onSubmit(obj){
    if(this.state.croppedData){
      obj.croppedImage = this.state.croppedData;
    }
    if(this.props.userData){
      obj.id = this.props.userData.id;
      console.log("edit operation");
      this.props.editEmployee(obj,(data) => {
         this.setState({createdEditUser:data.status});
         this.props.reset();
      });
    }else{
      if(this.state.croppedData){
        obj.croppedImage = this.state.croppedData;
      }
      this.props.addEmployee(obj,(data) => {
        this.setState({createdEditUser:true});
        this.props.reset();     
      });
    }
    
  }
  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    if(this.state.createdEditUser){
      return( <Redirect to="/signin" /> );
    }else{
      return(
        <div className="form-div">
          <div className="form-header">{this.state.header}</div>
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
}

function validate(values){
   const errors = {};
   _.each(FIELDS,(type,field)=>{
     if(!values[field] && type.type != "blob" && type.label !="Date Of Join"){
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
      }else if(type.name == "reenterpassword" && values[field]!==values['password']){
          errors[field] = 'Password mismatched.Please reenter password.';
      }
  });
   return errors;
}

export default reduxForm({
  validate,
  fields : _.keys(FIELDS),
  form:'PostNewForm'
})(connect(null,{addEmployee,editEmployee})(PostNew));

