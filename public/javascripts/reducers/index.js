import {combineReducer} from 'redux';
import EmployeesReducer from './employeeReducer';

const rootReducer = combineReducer({
	employeeReducer:EmployeesReducer
});

export default rootReducer;
