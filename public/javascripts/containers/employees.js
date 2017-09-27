import React,{Component} from 'react';
import {connect} from 'react-redux';
import {allEmployees} from '../actions/employeeAction';
import { bindActionCreators } from 'redux';
import '../../stylesheets/style.css';


class Employees  extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.fetchEmp();
	}
	render(){
		if(this.props.employees.employees.length > 0){
			const employeesList =  this.props.employees.employees.map(function(emp){
			return(
				  <div key={emp[0]._id}><span className="emp-name">{emp[0].title}</span><span className="emp-occupation">{emp[0].occupation}</span></div>
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


