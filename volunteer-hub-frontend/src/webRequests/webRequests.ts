import { WebRequestsInterface } from "./webRequests-int";
import http from "../utility/Http";
import jwt from 'jwt-decode'
export class WebRequest implements WebRequestsInterface {
    signUpAsOrganization(organization: any): any {
       return http.post((process.env.REACT_APP_IDENTITY_SERVER_PATH as string) + '/RegisterOrganization', organization);
    }
    signUpAsVolunteer(volunteer: any): any {
       const request = http.post((process.env.REACT_APP_IDENTITY_SERVER_PATH as string) + '/RegisterVolunteer', volunteer);
       request.then(v => v.data.accessToken);
    }
    logIn(userName: string, password: string): any {
        const logInfo = {userName, password};
       return http.post((process.env.REACT_APP_IDENTITY_SERVER_PATH as string) + '/Login', logInfo, {headers: {credentials: 'include'}})
                    .then(res => {
                                    const token = res.data.accessToken;
                                    const user : any = jwt(token); // decode your token here
                                    sessionStorage.setItem('token', token);
                                    sessionStorage.setItem('user', JSON.stringify(user));
                                    sessionStorage.setItem('id', user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                                    sessionStorage.setItem('role', user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
                                });
    }
    getUser(id: string) {
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/users/' + id);
    }
    createUser(email: string, password: string) {
        var user = {
            username: email.split('@')[0],
            password: password,
            email: email,
            isAdmin: false,
            role: "volunteer",
        }

        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/users/', user);
    }
    getAllOrganizations() {
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organizations/');
    }
    getOrganizationById(id: string) {
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organizations/' + id);
    }
    createOrganization(data: any) {
        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organizations/', data);
    }
    updateOrganization(data: any) {
        return http.put((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organizations/', data);
    }
    deleteOrganization(data: any) {
        return http.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organizations/',
            { data: data });
    }
    getAllVolunteers() {
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer');
    }
    getVolunteerById(id: string) {
        const token = sessionStorage.getItem('token');
        const headers = {Authorization: `Bearer ${token}`}
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer/' + id, {headers});
    }
    getVolunteerBySkill(skills: any) {
        // TODO: EDIT SO THAT SKILLS IS A PARAM
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers/', skills);
    }
    createVolunteer(data: any) {
        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer', data);
    }
    updateVolunteer(data: any) {
        return http.put((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer/', data);
    }
    deleteVolunteer(id: string) {
        return http.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer/' + id);
    }
}