import React,{Component} from 'react';
import './profile.css';
import {connect} from 'react-redux';
import UploadImage from '../uploadimage/uploadImage';
import PostNew from '../signup.js';

class Profile extends Component{
	constructor(props){
       super(props);
       this.state={isEdit:false};
	}
	profileEdit(){
		this.setState({isEdit:true});
	}
	onCroppedImgData(data)
    {
       
    }
	render(){
		let user = this.props.user;
		return(
			<div className="parent-profile-div"> 
		    	{this.state.isEdit ? <PostNew userData={user} header="Edit Form"/>:<div className="profile-class">
										    	    <div className="userinfo-header">{user.firstname} {user.lastname}<span className="edit-icon profile-edit" title="Edit Profile" onClick={this.profileEdit.bind(this)}></span></div>
										    	    <div className="user-info-div">
											    	    <div className="user-name"><span className="userform-field-label">First Name</span><span className="userform-field-value">{user.firstname}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">Last Name</span><span className="userform-field-value">{user.lastname}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">Age</span><span className="userform-field-value">{user.age}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">Occupation</span><span className="userform-field-value">{user.occupation}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">City</span><span className="userform-field-value">{user.city}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">State</span><span className="userform-field-value">{user.state}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">Phone</span><span className="userform-field-value">{user.phone}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">Pin</span><span className="userform-field-value">{user.pin}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">email</span><span className="userform-field-value">{user.email}</span></div>
											    	    <div className="user-name"><span className="userform-field-label">Date Of Join</span><span className="userform-field-value">{user.dateOfJoin}</span></div>
										    	    </div>
										    	    <div className="profile-image">
										    	       <UploadImage message="Upload Image" profileImg={user.croppedImage} callbackImgCropped={this.onCroppedImgData.bind(this)}/>
										    	    </div>
										    	</div>}
		    	
		     </div>	
			);
	}
}

function mapPropsToComponent(state){
	return({user:state.userLogIn.userData});
}

export default connect(mapPropsToComponent)(Profile);
