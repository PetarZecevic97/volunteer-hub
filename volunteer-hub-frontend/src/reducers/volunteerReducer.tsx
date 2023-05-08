import { CREATE_VOLUNTEER, GET_VOLUNTEER } from "../types/volunteerTypes";

const VolunteerReducer =  (state: any, action: any) => {
    const initialState: any = state ? state : {volunteer : undefined, volunteerList: []}
      switch (action.type) {
        case CREATE_VOLUNTEER:
          return {
            ...initialState,
            volunteer: action.payload
          };
          case GET_VOLUNTEER:
            return {
              ...initialState,
              volunteer: action.payload
            };
        default:
          return initialState;
      }
    };

    export default VolunteerReducer;