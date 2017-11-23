import React, {Component} from 'react';
import './uploadimage.css';
import $ from 'jquery';
import PopUp from "../popup/popup.js";
 
export default class UploadImage extends Component{
	constructor(props){
		super(props);
		this.state = {callPopUp:false};

	}
	upload(){
		this.setState({callPopUp:true});
	}
	render(){
		const {message} = this.props;
		let popup = "";
		if(this.state.callPopUp){
			let template="<h1>Upload Image</h1>";
           popup = <PopUp template={template}/>;
		}
		return(
			<div>
	           <div className="upload-container default-img"><span className="upload-msg" onClick={this.upload.bind(this)}>{message}</span></div>
	           {popup}
           </div>
		);
	}
} 