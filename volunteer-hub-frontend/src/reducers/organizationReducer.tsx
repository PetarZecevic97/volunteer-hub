import {
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  GET_ORGANIZATION,
  GET_ORGANIZATION_LIST,
} from "../types/organizationTypes";

const OrganizationReducer = (state: any, action: any) => {
  const initialState: any = state
    ? state
    : { organization: undefined, organizationList: [] };
  switch (action.type) {
    case CREATE_ORGANIZATION:
      return {
        ...initialState,
        organization: action.payload,
      };
    case UPDATE_ORGANIZATION:
      return {
        ...initialState,
        organization: action.payload,
      };
    case DELETE_ORGANIZATION:
      return {
        ...initialState,
        organization: {},
      };
    case GET_ORGANIZATION:
      return {
        ...initialState,
        organization: action.payload,
      };
    case GET_ORGANIZATION_LIST:
      return {
        ...initialState,
        organizationList: action.payload.data,
      };
    default:
      return initialState;
  }
};

export default OrganizationReducer;
