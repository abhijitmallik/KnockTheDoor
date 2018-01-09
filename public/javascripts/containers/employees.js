import React,{Component} from 'react';
import {connect} from 'react-redux';
import {allEmployees} from '../actions/employeeAction';
import {removeEmployee} from '../actions/employeeAction';
import { bindActionCreators } from 'redux';
import Checkbox from '../components/checkbox';
import WhiteBoardComponent from '../components/whiteBoardComponent/whiteBoardComponent';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import socket from '../socket.js';


class Employees  extends Component{
	constructor(props){
		super(props);
		this.deleteEmployee = this.deleteEmployee.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.shareWhiteBoard = this.shareWhiteBoard.bind(this);
		this.state = {showDialog: false,id:"",userName:"",showWhiteBoard:false,invitedMemberIds:undefined,user:{id:"",canAcceptSession:false},userOnline:[]};
	}
	componentWillMount(){
		
	}
	componentDidMount(){
		this.props.fetchEmp();
		socket.on('onlineStatus',(users)=>{
			this.setState({'userOnline':users.onlineUsers});
		});
		socket.on('acceptWhiteBoardSharing',(user)=>{
			this.setState({'user':user});
		});
	}
	selectedUser(bol,id){
       
	}
	shareWhiteBoard(id){
		this.setState({invitedMemberIds:id})
        this.setState({showWhiteBoard:true});
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
	closeWhiteBoard(){
		socket.emit("shareWhiteBoard",{id:this.state.invitedMemberIds,show:false});
		this.setState({showWhiteBoard:false});
		
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
			if(this.state.showWhiteBoard){
				console.log("======v====this.props.adminUserLogin==",this.props.adminUserLogin);
               return(<WhiteBoardComponent closeCanvasPopup={this.closeWhiteBoard.bind(this)} adminInfo={this.props.adminUserLogin} invitedIds={this.state.invitedMemberIds} userInfo = {this.state.user} />)
			}
			if(this.props.employees.employees.length > 0){
				const employeesList =  this.props.employees.employees[0].map(function(emp){
					emp.dateOfJoin = new Date(emp.dateOfJoin);
					let onlineStatus = false;
					if(this.state.userOnline.indexOf(emp._id) > -1){
						onlineStatus = true;
					}
					let canAcceptSession = false;
					if(this.props.adminUserLogin.status || (emp._id == this.props.userLoggedin.id && emp._id == this.state.user.id && this.state.user.canAcceptSession)){
                       canAcceptSession = true;
					}
					console.log("=====emp=====",emp);
					let dt = emp.dateOfJoin.getDate() + ":" +emp.dateOfJoin.getMonth()+":"+emp.dateOfJoin.getFullYear();
					let checkBox = <Checkbox id={emp._id} userSelected={(bol)=>{this.selectedUser(bol,emp._id)}}/>;
					let titleMsg = "Delete "+emp.firstname;
				return(
					  <div className="emp-row" key={emp._id}>
					   {checkBox} {onlineStatus ?<span className="emp-name active-emp">{emp.firstname} {emp.lastname}</span> : <span className="emp-name">{emp.firstname} {emp.lastname}</span>}<span className="emp-occupation">{emp.occupation}</span><span className="emp-city">{emp.city}</span><span className="emp-state">{emp.state}</span><span className="emp-doj">{dt}</span><img className="emp-image"  src={emp.croppedImage}/>{this.props.adminUserLogin.status ? <span className="white-board" title="Start white board sharing" onClick={()=>{this.shareWhiteBoard(emp._id);socket.emit("shareWhiteBoard",{id:emp._id,show:true,adminId:this.props.adminUserLogin.id})}}></span> :""}{this.props.adminUserLogin.status ? <span className="delete-icon" title={titleMsg} onClick={(e)=>{this.deleteEmployee(emp._id,emp.firstname)}}></span> : ""}{(canAcceptSession && !this.props.adminUserLogin.status) ? <span className="accept-session white-board" title="Join Session" onClick={()=>{this.shareWhiteBoard(emp._id)}}></span> :""}
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
	return {employees:state.employeeReducer,adminUserLogin:state.adminUserLogin,userLoggedin:state.userLogIn.userData}
}

export default connect(mapPropesToState,bindActionWithClass)(Employees);


