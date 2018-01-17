import axios from 'axios';
export function saveContent(publishData,callback){
	return function(dispatch){
      axios.post("/saveContent",publishData).then(function(obj){
      	callback(obj);
      }).catch(function(err){
        console.log("=========error====",err);
      });
	}
}
export function getContent(callback){
	return function(dispatch){
		axios.get("/getContents").then(function(res){
			dispatch({
				type:'PUBLISH_CONTENTS',
				payload:res.data
			});
		}).catch(function(err){
           console.log("========get contents error====",err);
		});
	}
}