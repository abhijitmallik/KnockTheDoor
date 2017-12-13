export function croppedImage(state={cropped:undefined},action){
   switch(action.type){
   	case 'CROPPED-IMAGE':
   	  state = {cropped:action.payload};
   	  console.log("=====reducer cropped===",state);
   	  break;
   }
   return state;
}