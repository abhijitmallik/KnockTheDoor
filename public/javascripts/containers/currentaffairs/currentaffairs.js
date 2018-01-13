import React,{Component} from 'react';
import './currentaffairs.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import {connect} from 'react-redux';
import {getContent} from "../../actions/saveContent";
import {bindActionCreators} from 'redux';
import CurrentAffairsModal from '../../components/currentAffairsModal/currentAffairsModal.js';

class CurrentAffairs extends Component{
	constructor(props){
	   super(props);	
      this.state = {desc:""};
	}
  componentDidMount(){
      this.props.getContent((obj)=>{
           this.setState({desc:obj});
      });
  } 
	render(){
    return(
       <div>
         <CurrentAffairsModal/>
       </div>
    )
    
    /*let data = this.state.desc;
    if(data.length > 0){
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
    }*/
	
	}
}

function getActionToClass(dispatch){
  return bindActionCreators({getContent},dispatch);
}

export default connect(null,getActionToClass)(CurrentAffairs);