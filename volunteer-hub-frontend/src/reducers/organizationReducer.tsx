const OrganizationReducer = (state: any, action: any) => {
  const initialState: any = state ? state : {organization : undefined, organizationList: []}
    switch (action.type) {
      case "createOrganization":
        return {
          ...initialState,
          organization: action.payload
        };
        case "getOrgaization":
          return {
            ...initialState,
            organization: action.payload
          };
      default:
        return initialState;
    }
  };

  export default OrganizationReducer;