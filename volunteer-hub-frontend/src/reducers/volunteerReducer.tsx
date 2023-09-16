import {
  CREATE_VOLUNTEER,
  GET_VOLUNTEER,
  UPDATE_VOLUNTEER,
  GET_VOLUNTEER_LIST,
  DELETE_VOLUNTEER,
} from "../types/volunteerTypes";

const VolunteerReducer = (state: any, action: any) => {
  const initialState: any = state
    ? state
    : { volunteer: undefined, volunteerList: [] };
  switch (action.type) {
    case CREATE_VOLUNTEER:
      return {
        ...initialState,
        volunteer: action.payload,
      };
    case UPDATE_VOLUNTEER:
      return {
        ...initialState,
        volunteer: action.payload,
      };
    case DELETE_VOLUNTEER:
      return {
        ...initialState,
        volunteer: {},
      };
    case GET_VOLUNTEER:
      return {
        ...initialState,
        volunteer: action.payload,
      };
    case GET_VOLUNTEER_LIST:
      return {
        ...initialState,
        volunteerList: action.payload.data,
      };
    default:
      return initialState;
  }
};

export default VolunteerReducer;
