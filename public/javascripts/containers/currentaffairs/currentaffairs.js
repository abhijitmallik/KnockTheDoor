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
      this.state = {desc:"",showPost:true};
	}
  componentDidMount(){
    this.props.getContent();
  } 
  hidePost(bool){
     this.setState({showPost:bool});
  }
	render(){
    let data = this.props.contents;
    if(data && data.length > 0){
      let template = data.map((obj)=>{
          return(
            <div className="post-data-row" key={obj._id}>
             <span className="title" dangerouslySetInnerHTML={{__html:obj.title}}></span>
             <div className="img-desc-div">
               <span className="description" dangerouslySetInnerHTML={{__html:obj.desc}} ></span>
               <span className="post-image"><img src={obj.img}/></span>
             </div>
             <span className="source">{obj.source}</span>
             <span className="post-date">{obj.date}</span>
            </div> 
          ) 

          
      });
      return(
          <div>
            <CurrentAffairsModal hideTemplate={this.hidePost.bind(this)}/>
              <div className='post-data'>
                {this.state.showPost ? template : ""}
              </div>
          </div>
      )
    }else{
      return(<div><CurrentAffairsModal/><div>No Data</div></div>);
    }
	
	}
}

function getActionToClass(dispatch){
  return bindActionCreators({getContent},dispatch);
}

function getResultToClass(state){
  return ({contents:state.getContent});
}

export default connect(getResultToClass,getActionToClass)(CurrentAffairs);