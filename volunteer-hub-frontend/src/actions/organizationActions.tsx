import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import { CREATE_ORGANIZATION, GET_ORGANIZATION } from "../types/organizationTypes";

const userService: WebRequestsInterface = getWebRequest();

export const createOrganization = (dataForCreate: any) => async (dispatch: any) => {
  const newOrg = await userService.createOrganization(dataForCreate);
  return dispatch({
    type: CREATE_ORGANIZATION,
    payload: newOrg
  });
}

export const getOrganization = (organizationId: any) => async (dispatch: any) =>{
  const org = await userService.getOrganizationById(organizationId);
  return dispatch({
    type: GET_ORGANIZATION,
    payload: org
  });
};