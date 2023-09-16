import http from "../utility/Http";
import { WebRequest } from "../webRequests/webRequests";

// Mock the http module
jest.mock("../utility/Http", () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Mock the jwt-decode module
jest.mock("jwt-decode", () => jest.fn());

describe("WebRequest", () => {
  let webRequest: WebRequest;

  beforeEach(() => {
    webRequest = new WebRequest();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should sign up as an organization", async () => {
    const organization = {}; // Provide organization data
    const response = {}; // Provide the expected response

    (http.post as jest.Mock).mockResolvedValue(response);

    const result = await webRequest.signUpAsOrganization(organization);

    expect(http.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_IDENTITY_SERVER_PATH}/RegisterOrganization`,
      organization
    );
    expect(result).toEqual(response);
  });

  // Write similar test cases for other methods
});
