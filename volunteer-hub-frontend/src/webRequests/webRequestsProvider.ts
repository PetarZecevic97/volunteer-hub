import { WebRequest } from "./webRequests";
import { WebRequestsInterface } from "./webRequests-int";
import { WebRequestMock } from "./webRequestsMock";

const webRequest = process.env.REACT_APP_MOCK_BACKEND === "true" ? new WebRequestMock() : new WebRequest()

export const getWebRequest = (): WebRequestsInterface => {
    return webRequest;
}

export default getWebRequest;
