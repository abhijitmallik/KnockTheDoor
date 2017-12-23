import React,{Component} from 'react';
import "./textEditor.css";
import Editor from 'react-html-editor';
import EditorStyles from 'react-html-editor';

export default class TextEditor extends Component{
	constructor(props){
		super(props);
	}
	onChange(){
     
	}
	render(){
		return(
			<div>
			   <Editor classObject={EditorStyles}/>
			</div>
		)
	}
}