import {combineReducers} from 'redux';
import {getEmployees} from './employeeReducer';

const rootReducer = combineReducers({
	employeeReducer:getEmployees
});

export default rootReducer;
