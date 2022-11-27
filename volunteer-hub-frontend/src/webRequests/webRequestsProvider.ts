import { WebRequest } from "./webRequests";
import { WebRequestsInterface } from "./webRequests-int";
import { WebRequestMock } from "./webRequestsMock";

const webRequest = process.env.REACT_APP_MOCK_BACKEND ? new WebRequestMock() : new WebRequest()

export const getWebRequest = () : WebRequestsInterface => {
    console.log(webRequest);
    return webRequest;
}

export default getWebRequest;
