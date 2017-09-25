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