import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";

const userService: WebRequestsInterface = getWebRequest();

export const createVolunteerAction =  (dataForCreate: any) => async (dispatch: any) => {
  const newVolunteer = await userService.createOrganization(dataForCreate);
  dispatch({
    type: "createVolunteer",
    payload: newVolunteer
  });
}

export const getVolunteerAction = (volunteerId: any) => async (dispatch: any) =>  {
  const volunteer = await userService.getVolunteerById(volunteerId);
  dispatch({
    type: "getVolunteer",
    payload: volunteer
  });
};