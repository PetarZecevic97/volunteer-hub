const VolunteerReducer =  (state: any, action: any) => {
    const initialState: any = state ? state : {volunteer : undefined, volunteerList: []}
      switch (action.type) {
        case "createVolunteer":
          return {
            ...initialState,
            volunteer: action.payload
          };
          case "getVolunteer":
            return {
              ...initialState,
              volunteer: action.payload
            };
        default:
          return initialState;
      }
    };

    export default VolunteerReducer;