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
      this.clear = this.clear.bind(this);
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
    	debugger;
        let image = await this.refs.crop.cropImage()
        this.setState({
            previewUrl: window.URL.createObjectURL(image)
        })
        this.props.getCroppedURL(this.state.previewUrl);
    }
 
    clear() {
        this.refs.file.value = null
        this.setState({
            previewUrl: null,
            image: null
        })
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
				    <div dangerouslySetInnerHTML={{ __html: template }}/>
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
 
                        <button onClick={this.crop}>Crop</button>
                        <button onClick={this.clear}>Clear</button>
                    </div>
 
                }
 
                {
                    this.state.previewUrl &&
 
                    <img src={this.state.previewUrl} />
                }
				      
				       
				      <button className="popup-button" onClick={this.props.closePopup}>close me</button>
				    </div>
				  </div> );
	}
}
function bindActionToComponent(dispatch){
   return bindActionCreators({getCroppedURL},dispatch);
}

export default connect(null,bindActionToComponent)(PopUp);

