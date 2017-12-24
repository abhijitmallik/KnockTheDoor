export function getContent(state=null,action){
	switch(action.type){
		case "CONTENT":
		 state = action.payload;
		 break;
	}
	return state;
}