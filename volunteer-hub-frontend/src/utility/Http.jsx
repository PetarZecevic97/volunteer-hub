import axios from "axios";
import jwt from "jwt-decode";

// Create an instance of Axios with a base URL and default headers.
const http = axios.create({
  baseURL: "http://localhost:4003",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Intercept responses from the server.
http.interceptors.response.use(
  // If the response is successful, just return it.
  (response) => {
    return response;
  },
  // If there is an error in the response, handle it here.
  async function (error) {
    // Store the original request configuration.
    const originalRequest = error.config;

    // Get the current timestamp in seconds.
    const currentTimestamp = Date.now() / 1000;

    // Check if the error status is 401 (Unauthorized) and expiry conditions are met
    if (
      error.response.status === 401 &&
      !originalRequest.url.includes("Refresh") &&
      sessionStorage.getItem("exp") &&
      sessionStorage.getItem("exp") < currentTimestamp
    ) {
      // Prepare the data needed for refreshing the token.
      const refreshInfo = {
        refreshToken: sessionStorage.getItem("refreshToken"),
        userName: sessionStorage.getItem("username"),
      };

      // Send a request to the identity server to refresh the access token.
      const res = await http.post(
        process.env.REACT_APP_IDENTITY_SERVER_PATH + "/Refresh",
        refreshInfo,
        { headers: { credentials: "include" } }
      );

      // Extract the new access token and decode it to get user information.
      const token = res.data.accessToken;
      const user = jwt(token);

      // Update the session storage with the new token and user information.
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", res.data.refreshToken);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("id", user.id);
      sessionStorage.setItem("role", user.role);
      sessionStorage.setItem("exp", user.exp);

      // Set the new authorization header for the original request.
      originalRequest.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("token");

      // Retry the original request with the new token.
      return http(originalRequest);
    } else if (
      originalRequest.url.includes("Refresh") &&
      sessionStorage.getItem("exp") < currentTimestamp
    ) {
      // If the original request was a refresh request and the token is expired, clear the session and redirect to sign-in.
      sessionStorage.clear();
      window.location = "/sign-in";
    }

    // Reject the error to continue propagating it.
    return Promise.reject(error);
  }
);

// Export the configured Axios instance for use in other parts of the application.
export default http;
