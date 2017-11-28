import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './popup.css';
import Cropper from 'react-crop';
import "babel-core/register";
import "babel-polyfill";
import {getCroppedURL} from '../../actions/croppedImage.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class PopUp extends Component
{
	constructor(){
      super();
      this.browseFile = this.browseFile.bind(this);
      this.onChange = this.onChange.bind(this);
      this.crop = this.crop.bind(this);
       this.state = {
            image: null,
            previewImage: null
        };
	}
	componentDidMount(){
	    var el = ReactDOM.findDOMNode(this);
	    el.querySelector('.browse-area').addEventListener('click', this.browseFile);
	    el.querySelector('input').addEventListener('change', this.onChange);
	}
	componentWillUnmount(){
	    var el = ReactDOM.findDOMNode(this);
	    el.querySelector('.browse-area').removeEventListener('click', this.browseFile);
	    el.querySelector('input').removeEventListener('change', this.onChange);
	}
	browseFile(){
		var el = ReactDOM.findDOMNode(this);
	    el.querySelector('input').click();
	}

    async crop() {
        let image = await this.refs.crop.cropImage()
        this.setState({
            previewUrl: window.URL.createObjectURL(image)
        })
        console.log("===image===",image);
        this.props.getCroppedURL({url:this.state.previewUrl,imageBlob:image});
    }
 
    imageLoaded(img) {
        if (img.naturalWidth && img.naturalWidth < 262 &&
            img.naturalHeight && img.naturalHeight < 147) {
            this.crop()
        }
    }
	onChange(evt) {
        this.setState({
            image: evt.target.files[0]
        })
    }
	render(){
		const template = this.props.template;
         return(  <div className='popup'>
				    <div className='popup_inner'>
				    <span className='header-class'>Upload Image</span>
                    <div className='message-class'>Please select image with dimension more than 500 x 500</div> 
                    <div className='browse-image-area'><span className='browse-area'><span className='upload-img upload-span'></span><div className='browse-message'>Browse</div></span> 
                    <span className='file-choose'> <input className='fileInput'  type="file"/></span>
				      {
                  
                    this.state.image &&
 
                    <div className='cropper-class-div'>
                        <Cropper
                            ref='crop'
                            image={this.state.image}
                            width={100}
                            height={80}
                            onImageLoaded={this.imageLoaded}
                        />
                    </div>
 
                }
                    </div>
                    <button className="crop-button" onClick={this.crop}>Crop</button>
				    <button className="popup-button" onClick={this.props.closePopup}>close me</button>
				    </div>
				  </div> );
	}
}
function bindActionToComponent(dispatch){
   return bindActionCreators({getCroppedURL},dispatch);
}

export default connect(null,bindActionToComponent)(PopUp);

