export function getCroppedURL(obj){
	console.log("=====action cropped===",obj);
	 return({
	 	type:'CROPPED-IMAGE',
	 	payload:obj
	 })
}