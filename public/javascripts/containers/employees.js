import React,{Component} from 'react';
import {connect} from 'react-redux';
import {allEmployees} from '../actions/employeeAction';
import {removeEmployee} from '../actions/employeeAction';
import { bindActionCreators } from 'redux';
import Checkbox from '../components/checkbox';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class Employees  extends Component{
	constructor(props){
		super(props);
		this.deleteEmployee = this.deleteEmployee.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.state = {showDialog: false,id:"",userName:""};
	}
	componentDidMount(){
		this.props.fetchEmp();
	}
	selectedUser(bol,id){
       
	}
	onOk(){
		var obj = {id:this.state.id};
		this.props.removeEmployee(obj,(status)=>{
           this.setState({showDialog:false});
           this.setState({id:""});
    	   this.setState({userName:""});
    	   this.props.fetchEmp();
		});
        
	}
    onCancel(){
    	this.setState({id:""});
    	this.setState({userName:""});
        this.setState({showDialog:false});
    } 
	deleteEmployee(userId,userName){
		this.setState({userName:userName});
		this.setState({id:userId});
		this.setState({showDialog:true});
	}
	render(){
		if(this.state.showDialog){
			let msg = "Are you sure to delete "+this.state.userName +"?";
		   return(
	           <ReactConfirmAlert
	            title="Confirm to Delete"
	            message={msg}
	            confirmLabel="Yes"
	            cancelLabel="Cancel"
	            onConfirm={() => this.onOk()}
	            onCancel={() => this.onCancel()}
	          />
          )
		}else{
			if(this.props.employees.employees.length > 0){
				const employeesList =  this.props.employees.employees[0].map(function(emp){
					emp.dateOfJoin = new Date(emp.dateOfJoin);
					let dt = emp.dateOfJoin.getDate() + ":" +emp.dateOfJoin.getMonth()+":"+emp.dateOfJoin.getFullYear();
					let checkBox = <Checkbox id={emp._id} userSelected={(bol)=>{this.selectedUser(bol,emp._id)}}/>;
					let titleMsg = "Delete "+emp.firstname;
				return(
					  <div className="emp-row" key={emp._id}>
					   {checkBox} <span className="emp-name">{emp.firstname} {emp.lastname}</span><span className="emp-occupation">{emp.occupation}</span><span className="emp-city">{emp.city}</span><span className="emp-state">{emp.state}</span><span className="emp-doj">{dt}</span><img className="emp-image"  src={emp.croppedImage}/><span className="delete-icon" title={titleMsg} onClick={(e)=>{this.deleteEmployee(emp._id,emp.firstname)}}></span>
					  </div>
					)
			    },this)
			    return(
		          <div className="employee-parent-div">
		           {employeesList}
		          </div>
				)
			}else{
				return(
	              <div>No Employees available in your rigion</div>
				)
			}
	    }
		
	}
} 

function bindActionWithClass(dispatch){
   return bindActionCreators(Object.assign({removeEmployee,fetchEmp:allEmployees}),dispatch);
}

function mapPropesToState(state){
	return {employees:state.employeeReducer}
}

export default connect(mapPropesToState,bindActionWithClass)(Employees);


