import axios from 'axios';

export function authenticateUser(user,callback){
   return function(dispatch){
       axios.post("/adminUser",user,{ headers: {
            'Content-Type': 'application/json',
        }}).then(function(res){
       	  console.log("=====res=====",res);
	      dispatch({type:"LOGIN-USER",payload:res.data});
	      callback(res.data.status);
	   }).catch(function(err){
          console.log("=========err=====",err);
	   })
   }
}

export function logOutAdmin(callback){
  debugger;
  console.log("logout admin");
  return function(dispatch){
    axios.post("/adminLogout").then((res)=>{
      console.log("logout admin",res);
      callback(res);
    })
  }
}