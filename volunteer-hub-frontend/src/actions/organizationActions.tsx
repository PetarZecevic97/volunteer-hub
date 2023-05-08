import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";

const userService: WebRequestsInterface = getWebRequest();

export const createOrganization = (dataForCreate: any) => async (dispatch: any) => {
  const newOrg = await userService.createOrganization(dataForCreate);
  return dispatch({
    type: "createOrganization",
    payload: newOrg
  });
}

export const getOrganization = (organizationId: any) => async (dispatch: any) =>{
  const org = await userService.getOrganizationById(organizationId);
  return dispatch({
    type: "getOrgaization",
    payload: org
  });
};