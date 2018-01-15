import React,{Component} from 'react';
import DatePicker from'react-dropdowns-datepicker';
import Content from '../../containers/content/content';
import './currentAffairsModal.css';

export default class CurrentAffairsModal extends Component{
	constructor(props){
       super(props); 
       this.state = {
            date: null,addPopUp:false
       };
	}
	dateChange(date){
       this.setState ({
            date: date
       }); 
	}
	addContent(){
		this.setState({addPopUp:true});
	}
  cancel(){
    this.setState({addPopUp:false});
  }
	render(){
		return(
          <div className='row-data'>
            <div className='date-picker'><DatePicker dateChange={ this.dateChange.bind(this) } /></div>
            <div className='add-publish'>
               <button type="button" onClick={this.addContent.bind(this)}> + Add</button>
               <span className="publish-class-title">Publish : </span><span className="publish"></span>
            </div>
            {this.state.addPopUp ? <Content closePopUp={this.cancel.bind(this)}/> : ""}
          </div>
           
		)
	}
}