import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import {  CREATE_AD,
          GET_AD,
          UPDATE_AD,
          DELETE_AD,
          GET_AD_LIST,
          ADD_AD_VOLUNTERE,
          DELETE_AD_VOLUNTERE, 
          NULLIFY } from "../types/adTypes";

const userService: WebRequestsInterface = getWebRequest();

export const createAd = (dataForCreate: any) => async (dispatch: any) => {
  const newAd = await userService.createAd(dataForCreate);
  return dispatch({
    type: CREATE_AD,
    payload: newAd
  });
}

export const updateAd = (dataForCreate: any, id: any) => async (dispatch: any) => {
  const newAd = await userService.updateAd(dataForCreate, id);
  return dispatch({
    type: UPDATE_AD,
    payload: newAd
  });
}

export const deleteAd = (AdId: any) => async (dispatch: any) => {
  const ad = await userService.deleteAd(AdId);
  return dispatch({
    type: DELETE_AD,
    payload: ad
  });
};

export const getAd = (AdId: any) => async (dispatch: any) => {
  const ad = await userService.getAdById(AdId);
  return dispatch({
    type: GET_AD,
    payload: ad
  });
};

export const getAdList = () => async (dispatch: any) => {
  const ad = await userService.getAllAds();
  return dispatch({
    type: GET_AD_LIST,
    payload: ad
  });
};

export const createAdVolunteer = (dataForCreate: any) => async (dispatch: any) => {
    const newAd = await userService.addVolunteer(dataForCreate);
    return dispatch({
      type: ADD_AD_VOLUNTERE,
      payload: newAd
    });
  }

  export const deleteAdVolunteer = (adId: any, volunteerId: any) => async (dispatch: any) => {
    const ad = await userService.deleteAdVolunteer(adId, volunteerId);
    return dispatch({
      type: DELETE_AD_VOLUNTERE,
      payload: ad
    });
  };

  export const nullifyCurrentAd = () => async (dispatch: any) => {
    return dispatch({
      type: NULLIFY
    });
  }