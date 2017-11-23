import React,{Component} from 'react';
import {connect} from 'react-redux';
import {allEmployees} from '../actions/employeeAction';
import { bindActionCreators } from 'redux';


class Employees  extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.fetchEmp();
	}
	render(){
		if(this.props.employees.employees.length > 0){
			const employeesList =  this.props.employees.employees[0].map(function(emp){
			return(
				  <div className="emp-row" key={emp._id}><span className="emp-name">{emp.firstname} {emp.lastname}</span><span className="emp-occupation">{emp.occupation}</span><span className="emp-phone">{emp.phone}</span><span className="emp-state">{emp.state}</span><span className="emp-city">{emp.city}</span></div>
				)
		    })
		    return(
	          <div>
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

function bindActionWithClass(dispatch){
   return bindActionCreators({fetchEmp:allEmployees},dispatch);
}

function mapPropesToState(state){
	return {employees:state.employeeReducer}
}

export default connect(mapPropesToState,bindActionWithClass)(Employees);


