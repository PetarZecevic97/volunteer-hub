import { combineReducers } from 'redux';
import OrganizationReducer from './organizationReducer';
import VolunteerReducer from './volunteerReducer';
import ProfileReducer from './profileReducer';
import AdsReducer from './adReducer';

const rootReducers = combineReducers({
    organizations: OrganizationReducer,
    volunteers: VolunteerReducer,
    ads: AdsReducer,
    profileData: ProfileReducer,
});

export default rootReducers;