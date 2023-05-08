import { combineReducers } from 'redux';
import OrganizationReducer from './organizationReducer';
import VolunteerReducer from './volunteerReducer';

const rootReducers = combineReducers({
    organizations: OrganizationReducer,
    volunteers: VolunteerReducer,
});

export default rootReducers;