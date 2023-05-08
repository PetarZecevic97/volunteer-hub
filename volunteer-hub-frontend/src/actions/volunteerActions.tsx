import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";

const userService: WebRequestsInterface = getWebRequest();

export const createVolunteer =  (dataForCreate: any) => async (dispatch: any) => {
  const newVolunteer = await userService.createVolunteer(dataForCreate);
  return dispatch({
    type: "createVolunteer",
    payload: newVolunteer
  });
}

export const getVolunteer = (volunteerId: any) => async (dispatch: any) =>  {
  const volunteer = await userService.getVolunteerById(volunteerId);
  return dispatch({
    type: "getVolunteer",
    payload: volunteer
  });
};