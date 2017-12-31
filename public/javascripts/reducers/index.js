import {combineReducers} from 'redux';
import {getEmployees} from './employeeReducer';
import {showLogin} from './loginReducer';
import {reducer as formReducer} from 'redux-form';
import {croppedImage} from './croppedImageReducer';
import {userLogIn} from './login';
import {editUser} from './login';
import {adminUserLogin} from './adminUserLoginReducer';
import {getContent} from './saveContent';

const rootReducer = combineReducers({
	employeeReducer:getEmployees,
	showLogin:showLogin,
	form:formReducer,
	croppedImage:croppedImage,
	userLogIn:userLogIn,
	adminUserLogin:adminUserLogin,
	editUser:editUser,
	getContent:getContent
});

export default rootReducer;
