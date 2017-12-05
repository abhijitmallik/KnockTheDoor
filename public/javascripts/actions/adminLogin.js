import axios from 'axios';

export function authenticateUser(user,callback){
   return function(dispatch){
       axios.post("/adminUser",user).then(function(res){
       	  console.log("=====res=====",res);
	      dispatch({type:"LOGIN-USER",payload:res.data.status});
	      callback(res.data.status);
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}