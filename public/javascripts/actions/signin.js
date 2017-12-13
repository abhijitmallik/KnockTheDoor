import axios from 'axios';
export function signin(user,callback){
    return function(dispatch){
        axios.post("/userLogin",user).then(function(res){
        	if(res.data){
                callback(res.data);
                 console.log("call here call here");
        		    dispatch({type:"LOGGEDIN",payload:{status:res.data.status,userData:res.data}});
        	}
	    }).catch(function(err){
          console.log("=========err=====",err);
	    })
    }
}
