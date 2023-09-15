import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import {
  CREATE_VOLUNTEER,
  GET_VOLUNTEER,
  GET_VOLUNTEER_LIST,
  UPDATE_VOLUNTEER,
  DELETE_VOLUNTEER,
} from "../types/volunteerTypes";
const userService: WebRequestsInterface = getWebRequest();

export const createVolunteer =
  (dataForCreate: any) => async (dispatch: any) => {
    const newVolunteer = await userService.createVolunteer(dataForCreate);
    return dispatch({
      type: CREATE_VOLUNTEER,
      payload: newVolunteer,
    });
  };

export const updateVolunteer =
  (volunteerId: any, dataForCreate: any) => async (dispatch: any) => {
    const volunteer = await userService.updateVolunteer(
      dataForCreate,
      volunteerId
    );
    return dispatch({
      type: UPDATE_VOLUNTEER,
      payload: volunteer,
    });
  };

export const deleteVolunteer = (volunteerId: any) => async (dispatch: any) => {
  const volunteer = await userService.deleteVolunteer(volunteerId);
  return dispatch({
    type: DELETE_VOLUNTEER,
    payload: volunteer,
  });
};

export const getVolunteer = (volunteerId: any) => async (dispatch: any) => {
  const volunteer = await userService.getVolunteerById(volunteerId);
  return dispatch({
    type: GET_VOLUNTEER,
    payload: volunteer,
  });
};

export const getVolunteerList = () => async (dispatch: any) => {
  const volunteerList = await userService.getAllVolunteers();
  return dispatch({
    type: GET_VOLUNTEER_LIST,
    payload: volunteerList,
  });
};
