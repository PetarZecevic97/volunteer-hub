import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import { CREATE_VOLUNTEER, GET_VOLUNTEER } from "../types/volunteerTypes";
const userService: WebRequestsInterface = getWebRequest();

export const createVolunteer =  (dataForCreate: any) => async (dispatch: any) => {
  const newVolunteer = await userService.createVolunteer(dataForCreate);
  return dispatch({
    type: CREATE_VOLUNTEER,
    payload: newVolunteer
  });
}

export const getVolunteer = (volunteerId: any) => async (dispatch: any) =>  {
  const volunteer = await userService.getVolunteerById(volunteerId);
  return dispatch({
    type: GET_VOLUNTEER,
    payload: volunteer
  });
};