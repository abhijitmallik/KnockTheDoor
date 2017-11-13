import {combineReducers} from 'redux';
import {getEmployees} from './employeeReducer';
import {showLogin} from './loginReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
	employeeReducer:getEmployees,
	showLogin:showLogin,
	form:formReducer
});

export default rootReducer;
