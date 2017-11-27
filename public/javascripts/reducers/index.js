import {combineReducers} from 'redux';
import {getEmployees} from './employeeReducer';
import {showLogin} from './loginReducer';
import {reducer as formReducer} from 'redux-form';
import {croppedImage} from './croppedImageReducer';

const rootReducer = combineReducers({
	employeeReducer:getEmployees,
	showLogin:showLogin,
	form:formReducer,
	croppedImage:croppedImage
});

export default rootReducer;
