const ProfileReducer = (state: any, action: any) => {
    const initialState: any = state ? state : {myProfile : undefined}
    console.log('Ljeks profile reducer ', action);
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
            return {};
        default:
          return initialState;
      }
    };
  
    export default ProfileReducer;