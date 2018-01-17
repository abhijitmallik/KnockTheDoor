import React,{Component} from 'react';
import DatePicker from'react-dropdowns-datepicker';
import Content from '../../containers/content/content';
import {connect} from 'react-redux';
import {saveContent} from "../../actions/saveContent";
import {getContent} from "../../actions/saveContent";
import {bindActionCreators} from 'redux';
import './currentAffairsModal.css';

class CurrentAffairsModal extends Component{
	constructor(props){
       super(props); 
       this.state = {
            date: null,addPopUp:false,
            publishData:null
       };
	}
	dateChange(date){
       this.setState ({
            date: date
       }); 
	}
	addContent(){
		this.setState({addPopUp:true});
    this.props.hideTemplate(this.state.addPopUp);
	}
  cancel(){
    this.setState({addPopUp:false});
    this.props.hideTemplate(this.state.addPopUp);
  }
  save(data){
    data.date = this.state.date;
    this.setState({publishData:data});
    this.setState({addPopUp:false});
    this.props.hideTemplate(this.state.addPopUp);
  }
  publish(){
    let publishData = this.state.publishData;
    if(publishData != null){
          this.props.saveContent(publishData,(obj)=>{
            this.setState({publishData:null});
            this.props.getContent();
          });
    }
  
  }
	render(){
		return(
          <div className='row-data'>
            <div className='date-picker'><DatePicker dateChange={ this.dateChange.bind(this) } /></div>
            <div className='add-publish'>
               <button type="button" onClick={this.addContent.bind(this)}> + Add</button>
               <span className="publish-class-title">Publish : </span><span className="publish" onClick={this.publish.bind(this)}></span>
            </div>
            {this.state.addPopUp ? <Content closePopUp={this.cancel.bind(this)} save={this.save.bind(this)}/> : ""}
          </div>
           
		)
	}
}
function mapActionToClass(dispatch){
   return bindActionCreators(Object.assign({saveContent},{getContent}),dispatch);
} 
export default connect(null,mapActionToClass)(CurrentAffairsModal);