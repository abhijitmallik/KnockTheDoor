import React,{Component} from 'react';
import {connect} from 'react-redux';
import {allEmployees} from '../actions/employeeAction';
import { bindActionCreators } from 'redux';
import Checkbox from '../components/checkbox';


class Employees  extends Component{
	constructor(props){
		super(props);
		//this.userSelected = this.userSelected.bind(this);
	}
	componentDidMount(){
		this.props.fetchEmp();
	}
	selectedUser(bol,id){
       
	}
	render(){
		if(this.props.employees.employees.length > 0){
			const employeesList =  this.props.employees.employees[0].map(function(emp){
				emp.dateOfJoin = new Date(emp.dateOfJoin);
				let dt = emp.dateOfJoin.getDate() + ":" +emp.dateOfJoin.getMonth()+":"+emp.dateOfJoin.getFullYear();
				var checkBox = <Checkbox id={emp._id} userSelected={(bol)=>{this.selectedUser(bol,emp._id)}}/>;
			return(
				  <div className="emp-row" key={emp._id}>
				   {checkBox} <span className="emp-name">{emp.firstname} {emp.lastname}</span><span className="emp-occupation">{emp.occupation}</span><span className="emp-city">{emp.city}</span><span className="emp-state">{emp.state}</span><span className="emp-doj">{dt}</span><img className="emp-image"  src={emp.croppedImage}/>
				  </div>
				)
		    },this)
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


