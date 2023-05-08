const ProfileReducer = (state: any, action: any) => {
    const initialState: any = state ? state : {myProfile : undefined}
      switch (action.type) {
        case "createProfile":
          return {
            ...initialState,
            myProfile: action.payload
          };
        case "getProfile":
            return {
                ...initialState,
                myProfile: action.payload
            };
        case "logout":
            return initialState;
        default:
          return initialState;
      }
    };
  
    export default ProfileReducer;