const OrganizationReducer = (state: any, action: any) => {
  const initialState: any = state ? state : {myOrganization : undefined}
    switch (action.type) {
      case "createOrganization":
        return {
          ...initialState,
          myOrganization: action.payload
        };
        case "getOrgaization":
          return {
            ...initialState,
            myOrganization: action.payload
          };
      default:
        return initialState;
    }
  };

  export default OrganizationReducer;