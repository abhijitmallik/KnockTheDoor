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
              {this.state.showPost ? <div className="next-previous-button">
                   <span className="previous-button previous-post"/>
                      <div className="dropdown dropdown-post">
                        <button className="dropbtn">Page</button>
                        <div className="dropdown-content">
                          <div>0</div>
                          <div>1</div>
                          <div>2</div>
                          <div>3</div>
                          <div>4</div>
                          <div>5</div>
                          <div>6</div>
                          <div>7</div>
                          <div>8</div>
                          <div>9</div>
                          <div>10</div>
                          <div>11</div>
                          <div>12</div>
                          <div>13</div>
                          <div>14</div>
                          <div>15</div>
                          <div>16</div>
                          <div>17</div>
                          <div>18</div>
                          <div>19</div>
                          <div>20</div>
                        </div>
                      </div>
                   <span className="next-button next-post"/>
              </div> : ""}
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