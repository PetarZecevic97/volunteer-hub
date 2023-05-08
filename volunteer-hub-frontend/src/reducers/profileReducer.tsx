import {  CREATE_PROFILE,
          GET_PROFILE,
          LOG_OUT,
          UPDATE_PROFILE,
          DELETE_PROFILE } from "../types/profileTypes";

const ProfileReducer = (state: any, action: any) => {
    const initialState: any = state ? state : {myProfile : undefined};
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
        case UPDATE_PROFILE:
            return {
                ...initialState,
                myProfile: action.payload
            };
          case DELETE_PROFILE:
              return {
                  ...initialState,
                  myProfile: {}
                    };
        case LOG_OUT:
            return {};
        default:
          return initialState;
      }
    };
  
    export default ProfileReducer;