import http from "../utility/Http";
import jwt from "jwt-decode";
import { WebRequest } from "../webRequests/webRequests";

// Mock the axios module
jest.mock("../utility/Http");

// Mock jwt-decode
jest.mock("jwt-decode", () => {
  return jest.fn((token) => {
    // Replace this with your desired decoded token
    return { id: 1, role: "volunteer" };
  });
});

describe("WebRequest Class", () => {
  let webRequest;

  beforeEach(() => {
    webRequest = new WebRequest();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log in", async () => {
    const userName = "testUser";
    const password = "testPassword";
    const mockResponse = {
      data: {
        accessToken: "mockToken",
        refreshToken: "mockRefreshToken",
      },
    };
    (http.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await webRequest.logIn(userName, password);

    expect(http.post).toHaveBeenCalledWith(
      "/Login",
      { userName, password },
      { headers: { credentials: "include" } }
    );
    expect(sessionStorage.setItem).toHaveBeenCalledWith("token", "mockToken");
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "refreshToken",
      "mockRefreshToken"
    );
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify({ id: 1, role: "volunteer" })
    );
    expect(sessionStorage.setItem).toHaveBeenCalledWith("id", 1);
    expect(sessionStorage.setItem).toHaveBeenCalledWith("role", "volunteer");
    expect(response).toEqual(mockResponse);
  });

  it("should sign up as an organization", async () => {
      const organization = {
        name: "OrgName",
        // Add other organization data as needed
      };
      const mockResponse = {
        // Define the expected response for sign-up
      };
      (http.post as jest.Mock).mockResolvedValue(mockResponse);
  
      const response = await webRequest.signUpAsOrganization(organization);
  
      expect(http.post).toHaveBeenCalledWith("/RegisterOrganization", organization);
      // Add assertions for the expected response and any other relevant expectations
    });
  
    it("should sign up as a volunteer", async () => {
      const volunteer = {
        firstName: "John",
        lastName: "Doe",
        // Add other volunteer data as needed
      };
      const mockResponse = {
        // Define the expected response for sign-up
      };
      (http.post as jest.Mock).mockResolvedValue(mockResponse);
  
      const response = await webRequest.signUpAsVolunteer(volunteer);
  
      expect(http.post).toHaveBeenCalledWith("/RegisterVolunteer", volunteer);
      // Add assertions for the expected response and any other relevant expectations
    });
});
