import React,{Component} from 'react';
import '../../stylesheets/style.css';

export default class Login extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
		this.cancel = this.cancel.bind(this);
	}
	render(){
		return(
            <div className='admin-form'>
               <div className='form-field'>
                 <label className='form-label'>User Name</label>
                 <input type='text' className='form-input'></input>
               </div>
               <div className='form-field'>
                 <label className='form-label'>Password</label>
                 <input type='password' className='form-input'></input>
               </div>
               <div className='form-field'>
                 <button className='submit-class' onClick={this.submit}>Submit</button>
                 <button className='submit-class' onClick={this.cancel}>Cancel</button>
               </div>
            </div>
		)
	}
	submit(){
        alert("Submit");
	}
	cancel(){
        alert("Cancel");
	}
}