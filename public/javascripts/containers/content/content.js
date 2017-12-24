import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {saveContent} from "../../actions/saveContent";
import {bindActionCreators} from 'redux';
import './contents.css';
import TextEditor from "../../components/textEditor/textEditor.js";

class Content extends Component{
	constructor(props){
		super(props);
	}
	saveContent(){
		var el = ReactDOM.findDOMNode(this);
		var textEditorValue = el.querySelector('textarea').value;
		this.props.saveContent(textEditorValue);
	}
	render(){
		return(
          <div className="content-div">
             <TextEditor/>
             <button className="content-button-save" onClick={this.saveContent.bind(this)}>Save</button>
          </div>
		)
	}
} 
 
function mapActionToClass(dispatch){
   return bindActionCreators({saveContent},dispatch);
} 

export default connect(null,mapActionToClass)(Content);

