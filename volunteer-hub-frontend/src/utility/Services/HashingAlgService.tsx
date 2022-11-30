import { createHash } from "crypto";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";

const HashingAlgService = {
  getHash: (_password: string) => {
    return createHash("sha256")
      .update(_password)
      .digest("hex");
  },
  isLoginValid: async (_passwordAttempt: string, _username: string) => {
    const userService: WebRequestsInterface = getWebRequest();
    const userData = await userService.getUser("", "", _username);
    
    const actualHash = userData.data[0].password;
    const expectedHash = HashingAlgService.getHash(_passwordAttempt);

    return actualHash === expectedHash;
  },
};

export default HashingAlgService;
