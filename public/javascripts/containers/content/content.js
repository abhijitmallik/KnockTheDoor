import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {saveContent} from "../../actions/saveContent";
import {bindActionCreators} from 'redux';
import TextEditor from "../../components/textEditor/textEditor.js";
import { Redirect } from 'react-router-dom';
import UploadImage from '../uploadimage/uploadImage';
import './contents.css';

class Content extends Component{
	constructor(props){
		super(props);
		this.state={navigateToCurrentAffairs:false};
	}
	save(){
		let el = ReactDOM.findDOMNode(this);
		let textEditorValue = el.querySelector('textarea').value;
        let obj = {id:"",desc:textEditorValue}
		this.props.saveContent(obj,()=>{
			this.setState({navigateToCurrentAffairs:true});
		});
	}
	onCroppedImgData(){

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
               <span className="addinfo-text">SOURCE : </span><input type="text"/>
             </div>
             <div className="cancel-button-div"><button className="content-button-cancel" onClick={this.props.closePopUp}>Cancel</button></div>
          </div>
		)
	}
} 
 
function mapActionToClass(dispatch){
   return bindActionCreators({saveContent},dispatch);
} 

export default connect(null,mapActionToClass)(Content);

