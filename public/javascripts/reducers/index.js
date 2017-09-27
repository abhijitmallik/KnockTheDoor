import {combineReducers} from 'redux';
import {getEmployees} from './employeeReducer';
import {showLogin} from './loginReducer';

const rootReducer = combineReducers({
	employeeReducer:getEmployees,
	showLogin:showLogin
});

export default rootReducer;
