import axios from 'axios';

export function allEmployees(){
   return function(dispatch){
       axios.get("/employees").then(function(res){
        console.log("====res.data get all emps=====",res.data);
	      dispatch({type:"GET_ALL_EMPLOYEES",payload:res.data});
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}

export function addEmployee(user,callback){
	 return function(dispatch){
       axios.post("/employee",user).then(function(res){
	      dispatch({type:"ADD-USER",payload:res.data});
	      callback(res.data);
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}

export function editEmployee(user,callback){
    return function(dispatch){
       axios.put("/editemployee",user).then(function(res){
       	console.log("======edit response====");
	      dispatch({type:"EDIT-USER",payload:res.data});
	      callback(res.data);
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}
export function removeEmployee(user,callback){
    return function(dispatch){
       axios.put("/deleteemployee",user).then(function(res){
	      callback(res.data);
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}