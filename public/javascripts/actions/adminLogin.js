import axios from 'axios';

export function authenticateUser(user){
   return function(dispatch){
       axios.post("/adminUser",user).then(function(res){
	      dispatch({type:"LOGIN-USER",payload:res.data});
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}