export function getContent(state=null,action){
	switch(action.type){
		case "PUBLISH_CONTENTS":
		 state = action.payload;
		 break;
	}
	return state;
}