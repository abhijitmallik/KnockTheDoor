import axios from 'axios';

export function authenticateUser(user,callback){
   return function(dispatch){
       axios.post("/adminUser",user).then(function(res){
	      dispatch({type:"LOGIN-USER",payload:res.data});
	      callback(res.data);
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}