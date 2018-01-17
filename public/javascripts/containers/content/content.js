import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import TextEditor from "../../components/textEditor/textEditor.js";
import { Redirect } from 'react-router-dom';
import UploadImage from '../uploadimage/uploadImage';
import './contents.css';

export default class Content extends Component{
	constructor(props){
		super(props);
		this.state={navigateToCurrentAffairs:false,croppedImage:null};
	}
	save(){
		let el = ReactDOM.findDOMNode(this);
		let textEditorTitleValue = el.querySelector('.popup-title').querySelector('textarea').value;
		let textEditorDescValue = el.querySelector('.popup-desc').querySelector('textarea').value;
		let source = this.refs.source.value;
        let obj = {title:textEditorTitleValue,desc:textEditorDescValue,img:this.state.croppedImage,source};
        this.props.save(obj);
	}
	onCroppedImgData(data){
         this.setState({croppedImage:data});
	}
	render(){
		if(this.state.navigateToCurrentAffairs){
			return (<Redirect to="/current-affairs"/>);
		}
		return(
          <div className="content-div">
             <div className="popup-title">
             <span className="addinfo-text">TITLE :</span> 
               <div className="title-section-texteditor"><TextEditor/></div>
               <div className="image-upload-section"><UploadImage message="Upload Image"  callbackImgCropped={this.onCroppedImgData.bind(this)} height="135" width="135"/></div>
             </div>
          
             <div className="popup-desc">
             <span className="addinfo-text">DESC :</span> 
               <TextEditor/>
             </div>
             <div className="popup-img-source">
               <span className="addinfo-text">SOURCE : </span><input type="text" ref='source'/>
             </div>
             <div className="cancel-button-div"><button className="content-button-save" onClick={this.save.bind(this)}>Save</button><button className="content-button-cancel" onClick={this.props.closePopUp}>Cancel</button></div>
          </div>
		)
	}
} 
 

