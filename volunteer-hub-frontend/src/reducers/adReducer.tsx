import {  CREATE_AD, 
    UPDATE_AD,
    DELETE_AD,
    GET_AD, 
    GET_AD_LIST,
    ADD_AD_VOLUNTERE,
    DELETE_AD_VOLUNTERE,
    NULLIFY } from "../types/adTypes";

const AdReducer = (state: any, action: any) => {
const initialState: any = state ? state : {ad : undefined, adList: []}
switch (action.type) {
case CREATE_AD:
  return {
    ...initialState,
    ad: action.payload.data
  };
  case UPDATE_AD:
    return {
      ...initialState,
      ad: action.payload.datsa
    };
    case ADD_AD_VOLUNTERE:
      return {
        ...initialState,
        ad: action.payload.data
      };
      case DELETE_AD_VOLUNTERE:
        return {
          ...initialState,
          ad: action.payload.data
        };
    case DELETE_AD:
      return {
        ...initialState,
        ad: {}
      };
  case GET_AD:
    return {
      ...initialState,
      ad: action.payload
    };
    case GET_AD_LIST:
      return {
        ...initialState,
        adList: action.payload
      };
      case NULLIFY:
        return {
          ...initialState,
          ad: undefined
        };
default:
  return initialState;
}
};

export default AdReducer;