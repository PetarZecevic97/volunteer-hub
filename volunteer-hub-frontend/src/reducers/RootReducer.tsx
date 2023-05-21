import { combineReducers } from 'redux';
import OrganizationReducer from './organizationReducer';
import VolunteerReducer from './volunteerReducer';
import ProfileReducer from './profileReducer';

const rootReducers = combineReducers({
    organizations: OrganizationReducer,
    volunteers: VolunteerReducer,
    profileData: ProfileReducer,
});

export default rootReducers;