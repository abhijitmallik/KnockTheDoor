import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {saveContent} from "../../actions/saveContent";
import {bindActionCreators} from 'redux';
import './contents.css';
import TextEditor from "../../components/textEditor/textEditor.js";
import { Redirect } from 'react-router-dom';

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
	render(){
		if(this.state.navigateToCurrentAffairs){
			return (<Redirect to="/current-affairs"/>);
		}
		return(
          <div className="content-div">
             <TextEditor/>
             <div className="save-button-div"><button className="content-button-save" onClick={this.save.bind(this)}>Save</button></div>
          </div>
		)
	}
} 
 
function mapActionToClass(dispatch){
   return bindActionCreators({saveContent},dispatch);
} 

export default connect(null,mapActionToClass)(Content);

