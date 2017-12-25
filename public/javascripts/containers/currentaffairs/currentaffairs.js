import React,{Component} from 'react';
import './currentaffairs.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import {connect} from 'react-redux';
import {getContent} from "../../actions/saveContent";
import {bindActionCreators} from 'redux';

class CurrentAffairs extends Component{
	constructor(props){
	   super(props);	
      this.state = {desc:""};
      //this.callDesc = this.callDesc.bind(this);
	}
  componentDidMount(){
      this.props.getContent((obj)=>{
            console.log("========current affairs===",obj); 
           this.setState({desc:obj});
           console.log("====this.state.desc===",this.state.desc);
      });
  } 
	render(){
    let data = this.state.desc;
    if(data.length > 0){
      console.log("this.state.desc",data);
      let template = data.map((obj)=>{
          return <span className="description" dangerouslySetInnerHTML={{__html:obj.desc}} key={obj._id}></span>
      });
      return(
          <div className="currentaffairs-containt">
            <div className="label">Current Affairs</div>
             {template}
          </div>
      )
    }else{
      return(<div>No Data</div>);
    }
	
	}
}

function getActionToClass(dispatch){
  return bindActionCreators({getContent},dispatch);
}

export default connect(null,getActionToClass)(CurrentAffairs);