import axios from 'axios'
import jwt from 'jwt-decode';

const http = axios.create({
  baseURL: "http://localhost:4003",
  headers: {
     Accept: "application/json",
     "Content-Type": "application/json"
  }
});

http.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;

  const currentTimestamp = Date.now()/1000;

  if (error.response.status === 401 && !originalRequest.url.includes('Refresh') && sessionStorage.getItem("exp") && sessionStorage.getItem("exp") < currentTimestamp) {
    const refreshInfo = { refreshToken: sessionStorage.getItem('refreshToken'), userName: sessionStorage.getItem('username')};
    const res = await http.post((process.env.REACT_APP_IDENTITY_SERVER_PATH) + '/Refresh', refreshInfo, {headers: {credentials: 'include'}});
    const token = res.data.accessToken;
    const user = jwt(token);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('refreshToken', res.data.refreshToken);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('id', user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    sessionStorage.setItem('role', user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    originalRequest.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
    return http(originalRequest);
  } else if(originalRequest.url.includes('Refresh') && sessionStorage.getItem("exp") < currentTimestamp) {
    sessionStorage.clear();
    window.location = '/sign-in';
  }
  return Promise.reject(error);
});

export default http;