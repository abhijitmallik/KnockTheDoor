import axios from 'axios';

export function allEmployees(){
   return function(dispatch){
       axios.get("/employees").then(function(res){
	      dispatch({type:"GET_BOOKS",payload:res.data});
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
	      dispatch({type:"EDIT-USER",payload:res.data});
	      callback(res.data);
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}