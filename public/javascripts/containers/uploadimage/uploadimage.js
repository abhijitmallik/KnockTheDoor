import React, {Component} from 'react';
import './uploadimage.css';
import PopUp from "../popup/popup.js";
import { connect } from 'react-redux';
 
class UploadImage extends Component{
	constructor(){
		super();
		this.state = {callPopUp:false};
	}

	togglePopup(){
		if(this.state.callPopUp){
			this.setState({callPopUp:false});
		}else{
			this.setState({callPopUp:true});
		}
		
	}

	render(){
		const {message} = this.props;
		let popup = "";
		let template=`<span class='header-class'>Upload Image</span>
                      <div class='message-class'>Please select image with dimension more than 500 x 500</div> 
                      <div class='browse-image-area'><span class='browse-area'><span class='upload-img upload-span'></span><div class='browse-message'>Browse</div></span><span class='file-choose'> 
                      <input className='fileInput'  type="file"/>
                      </span>
                      </div>`
        popup = <PopUp template={template} closePopup={this.togglePopup.bind(this)}/>;
		return(
			<div>
	           <div className="upload-container default-img"><span className="upload-msg" onClick={this.togglePopup.bind(this)}>{message}</span><div class="cropped-image-div">{this.props.croppedImage ? <img src={this.props.croppedImage.url}/>:null}</div></div>
	           {this.state.callPopUp ? <span id="uploadphoto-id">{popup}</span> : null}
	           
           </div>
		);
        
	}
} 
function bindPropertiesToForm(state){
	if(state.croppedImage){
		console.log("form reducer received4444",state.croppedImage.cropped);
	}
  console.log("form reducer received12121",state.croppedImage);
  return({croppedImage:state.croppedImage.cropped});
} 

export default connect(bindPropertiesToForm)(UploadImage);
