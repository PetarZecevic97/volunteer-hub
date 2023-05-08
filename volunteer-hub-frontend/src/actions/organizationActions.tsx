import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import {  CREATE_ORGANIZATION,
          GET_ORGANIZATION,
          UPDATE_ORGANIZATION,
          DELETE_ORGANIZATION,
          GET_ORGANIZATION_LIST } from "../types/organizationTypes";

const userService: WebRequestsInterface = getWebRequest();

export const createOrganization = (dataForCreate: any) => async (dispatch: any) => {
  const newOrg = await userService.createOrganization(dataForCreate);
  return dispatch({
    type: CREATE_ORGANIZATION,
    payload: newOrg
  });
}

export const updateOrganization = (dataForCreate: any, id: any) => async (dispatch: any) => {
  const newOrg = await userService.updateOrganization(dataForCreate, id);
  return dispatch({
    type: UPDATE_ORGANIZATION,
    payload: newOrg
  });
}

export const deleteOrganization = (organizationId: any) => async (dispatch: any) =>{
  const org = await userService.deleteOrganization(organizationId);
  return dispatch({
    type: DELETE_ORGANIZATION,
    payload: org
  });
};

export const getOrganization = (organizationId: any) => async (dispatch: any) =>{
  const org = await userService.getOrganizationById(organizationId);
  return dispatch({
    type: GET_ORGANIZATION,
    payload: org
  });
};

export const getOrganizationList = () => async (dispatch: any) =>{
  const org = await userService.getAllOrganizations();
  return dispatch({
    type: GET_ORGANIZATION_LIST,
    payload: org
  });
};