import { CREATE_PROFILE, GET_PROFILE, LOG_OUT } from "../types/profileTyper";

const ProfileReducer = (state: any, action: any) => {
    const initialState: any = state ? state : {myProfile : undefined}
    console.log('Ljeks profile reducer ', action);
      switch (action.type) {
        case CREATE_PROFILE:
          return {
            ...initialState,
            myProfile: action.payload
          };
        case GET_PROFILE:
            return {
                ...initialState,
                myProfile: action.payload
            };
        case LOG_OUT:
            return {};
        default:
          return initialState;
      }
    };
  
    export default ProfileReducer;