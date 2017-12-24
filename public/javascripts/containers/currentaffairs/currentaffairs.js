import React,{Component} from 'react';
import './currentaffairs.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import {connect} from 'react-redux';

class CurrentAffairs extends Component{
	constructor(props){
	   super(props);	
      this.state = {desc:""};
	}
    componentDidMount(){
    	if(this.props.getContent){
    	  let html = this.props.getContent;
    	  console.log("111111111",html);
    	  let contentBlock = htmlToDraft(html);
    	  console.log("222222222",contentBlock);
    	  let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    	  console.log("3333333333",contentState);
          let editorState = EditorState.createWithContent(contentState);
          console.log("========editorState======",editorState);
          //this.setState({desc:editorState});
          this.setState({desc:this.props.getContent})
    	}
    } 
	render(){
		return(
          <div className="currentaffairs-containt">
             <div className="label">Current Affairs</div>
             <span className="description" dangerouslySetInnerHTML={{__html:this.state.desc}}>
             </span>
          </div>
		)
	}
}

function setPropsToClass(state){
	return ({getContent:state.getContent});
}

export default connect(setPropsToClass)(CurrentAffairs);