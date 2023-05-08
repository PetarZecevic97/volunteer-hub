import { CREATE_ORGANIZATION, GET_ORGANIZATION } from "../types/organizationTypes";

const OrganizationReducer = (state: any, action: any) => {
  const initialState: any = state ? state : {organization : undefined, organizationList: []}
    switch (action.type) {
      case CREATE_ORGANIZATION:
        return {
          ...initialState,
          organization: action.payload
        };
        case GET_ORGANIZATION:
          return {
            ...initialState,
            organization: action.payload
          };
      default:
        return initialState;
    }
  };

  export default OrganizationReducer;