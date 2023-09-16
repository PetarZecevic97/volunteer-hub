import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import {
  CREATE_PROFILE,
  GET_PROFILE,
  LOG_OUT,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "../types/profileTypes";

const userService: WebRequestsInterface = getWebRequest();

export const createProfile =
  (dataForCreate: any, role: any) => async (dispatch: any) => {
    const newProfile =
      role === "Organization"
        ? await userService.createOrganization(dataForCreate)
        : await userService.createVolunteer(dataForCreate);
    return dispatch({
      type: CREATE_PROFILE,
      payload: newProfile,
    });
  };

export const getProfileData = (id: any, role: any) => async (dispatch: any) => {
  const profileData =
    role === "Organization"
      ? await userService.getOrganizationById(id)
      : await userService.getVolunteerById(id);
  return dispatch({
    type: GET_PROFILE,
    payload: profileData,
  });
};

export const deleteProfileData =
  (id: any, role: any) => async (dispatch: any) => {
    const profileData =
      role === "Organization"
        ? await userService.deleteOrganization(id)
        : await userService.deleteVolunteer(id);
    return dispatch({
      type: DELETE_PROFILE,
      payload: profileData,
    });
  };

export const updateProfileData =
  (id: any, dataForUpdate: any, role: any) => async (dispatch: any) => {
    const profileData =
      role === "Organization"
        ? await userService.updateOrganization(id, dataForUpdate)
        : await userService.updateVolunteer(id, dataForUpdate);
    return dispatch({
      type: UPDATE_PROFILE,
      payload: profileData,
    });
  };

export const logOutOfProfile = () => async (dispatch: any) => {
  return dispatch({
    type: LOG_OUT,
  });
};
