const VolunteerReducer =  (state: any, action: any) => {
    const initialState: any = state ? state : {myVolunteer : undefined}
      switch (action.type) {
        case "createVolunteer":
          return {
            ...initialState,
            myVolunteer: action.payload
          };
          case "getVolunteer":
            return {
              ...initialState,
              myVolunteer: action.payload
            };
        default:
          return initialState;
      }
    };

    export default VolunteerReducer;