import axios from 'axios';
export function saveContent(desc,callback){
	return function(dispatch){
      axios.post("/saveContent",desc).then(function(){
      	callback();
      }).catch(function(err){
        console.log("=========error====",err);
      });
	}
}
export function getContent(callback){
	return function(dispatch){
		axios.get("/getContents").then(function(res){
			console.log("res in action contents===",res);
		   callback(res.data);
		}).catch(function(err){
           console.log("========get contents error====",err);
		});
	}
}