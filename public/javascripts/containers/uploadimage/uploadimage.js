import React, {Component} from 'react';
import './uploadimage.css';
import PopUp from "../popup/popup.js";
let height = 100;
let width = 80;  
export default class UploadImage extends Component{
	constructor(props){
		super(props);
		this.state = {callPopUp:false,imgURL:undefined};
		if(this.props.height){
			height = this.props.height;
			width = this.props.width;
		}
		
	}
	componentWillMount(){
		if(this.props.profileImg){
			this.setState({imgURL:this.props.profileImg});
		}
	}

	togglePopup(){
		if(this.state.callPopUp){
			this.setState({callPopUp:false});
		}else{
			this.setState({callPopUp:true});
		}
		
	}
	getImageData(img){
	   this.setState({imgURL:img,callPopUp:false});
	}
	handleImageLoaded(e){
		let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        if(this.props.height && this.props.width){
        	canvas.width = this.props.width;
        	canvas.height = this.props.height;
        }else{
        	canvas.width = e.target.width;
            canvas.height = e.target.height;
        }
        ctx.drawImage(e.target, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        this.props.callbackImgCropped(dataURL);
        event.stopPropagation();
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
        popup = <PopUp template={template} croppedImage={this.getImageData.bind(this)} closePopup={this.togglePopup.bind(this)} height={height} width={width}/>;
		return(
			<div>
	           <div className="upload-container default-img"><span className="upload-msg" onClick={this.togglePopup.bind(this)}>{message}</span><div class="cropped-image-div">{this.state.imgURL ? <img src={this.state.imgURL}  onLoad={this.handleImageLoaded.bind(this)}/>:null}</div></div>
	           {this.state.callPopUp ? <span id="uploadphoto-id">{popup}</span> : null}
	           
           </div>
		);
        
	}
} 
