import { combineReducers } from 'redux';
import organizationReducer from './organizationReducer';
import volunteerReducer from './volunteerReducer';

export default combineReducers({
    organizations: organizationReducer,
    volunteers: volunteerReducer,
});