import React, {Component} from 'react';
import './uploadimage.css';
import PopUp from "../popup/popup.js";
 
export default class UploadImage extends Component{
	constructor(props){
		super(props);
		this.state = {callPopUp:false};
	}
	upload(){
		this.setState({callPopUp:true});
	}

	togglePopup(){
		this.setState({callPopUp:false});
	}

	render(){
		const {message} = this.props;
		let popup = "";
		let template="<h1>Upload Image</h1>";
        popup = <PopUp template={template} closePopup={this.togglePopup.bind(this)}/>;
		return(
			<div>
	           <div className="upload-container default-img"><span className="upload-msg" onClick={this.upload.bind(this)}>{message}</span></div>
	           {this.state.callPopUp ? <span id="uploadphoto-id">{popup}</span> : null}
           </div>
		);
        
	}
} 
