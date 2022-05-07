import { WebRequestsInterface } from "./webRequests-int";
import { WebRequestMock } from "./webRequestsMock";

const webRequest = new WebRequestMock()

const getWebRequest = () : WebRequestsInterface => {
    return webRequest;
}
