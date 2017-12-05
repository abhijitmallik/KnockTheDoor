import {combineReducers} from 'redux';
import {getEmployees} from './employeeReducer';
import {showLogin} from './loginReducer';
import {reducer as formReducer} from 'redux-form';
import {croppedImage} from './croppedImageReducer';
import {userLogIn} from './login';
import {adminUserLogin} from './adminUserLoginReducer';

const rootReducer = combineReducers({
	employeeReducer:getEmployees,
	showLogin:showLogin,
	form:formReducer,
	croppedImage:croppedImage,
	userLogIn:userLogIn,
	adminUserLogin:adminUserLogin
});

export default rootReducer;
