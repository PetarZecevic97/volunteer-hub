import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import { CREATE_PROFILE, GET_PROFILE, LOG_OUT } from "../types/profileTyper";

const userService: WebRequestsInterface = getWebRequest();

export const createProfile =  (dataForCreate: any, role: any) => async (dispatch: any) => {
  const newProfile = role === "Organization" ? await userService.createOrganization(dataForCreate) : await userService.createVolunteer(dataForCreate);
  return dispatch({
    type: CREATE_PROFILE,
    payload: newProfile
  });
}

export const getProfileData = (id: any, role: any) => async (dispatch: any) =>  {
  const profileData = role === "Organization" ? await userService.getOrganizationById(id) : await userService.getVolunteerById(id);
  return dispatch({
    type: GET_PROFILE,
    payload: profileData
  });
};

export const logOutOfProfile = () => async (dispatch: any) =>  {
  return dispatch({
    type: LOG_OUT,
  });
};