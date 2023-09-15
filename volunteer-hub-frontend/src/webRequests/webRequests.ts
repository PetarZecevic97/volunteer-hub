import { WebRequestsInterface } from "./webRequests-int";
import http from "../utility/Http";
import jwt from 'jwt-decode';
export class WebRequest implements WebRequestsInterface {
    signUpAsOrganization(organization: any): any {
        return http.post((process.env.REACT_APP_IDENTITY_SERVER_PATH as string) + '/RegisterOrganization', organization);
    }
    signUpAsVolunteer(volunteer: any): any {
        return http.post((process.env.REACT_APP_IDENTITY_SERVER_PATH as string) + '/RegisterVolunteer', volunteer);
    }
    logIn(userName: string, password: string): any {
        const logInfo = { userName, password };
        return http.post((process.env.REACT_APP_IDENTITY_SERVER_PATH as string) + '/Login', logInfo, { headers: { credentials: 'include' } })
            .then(res => {
                const token = res.data.accessToken;
                const user: any = jwt(token); // decode your token here
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('refreshToken', res.data.refreshToken);
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('id', user.id);
                sessionStorage.setItem('role', user.role);
                sessionStorage.setItem('exp', user.exp);
                return res;
            });
    }
    getAllOrganizations() {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organization', { headers });
    }
    getOrganizationById(id: string) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organization/' + id, { headers })
            .then(value => value.data);
    }
    createOrganization(data: any) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organization', data, { headers });
    }
    updateOrganization(data: any, id: string) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.put((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organization/' + id, data, { headers });
    }
    deleteOrganization(id: string) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/organization/' + id,
            { headers });
    }
    getAllVolunteers() {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer', { headers });
    }
    getVolunteerById(id: string) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer/' + id, { headers })
            .then(value => value.data);
    }
    getVolunteerBySkill(skills: any) {
        const data = { data: skills }
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        // TODO: EDIT SO THAT SKILLS IS A PARAM
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers/', { data, headers });
    }
    createVolunteer(data: any) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer', data, { headers });
    }
    updateVolunteer(data: any, id: any) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.put((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer/' + id, data, { headers });
    }
    deleteVolunteer(id: string) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteer/' + id, { headers });
    }


    getAllAds() {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/Ad', { headers });
    }
    getAdById(id: string) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/Ad/' + id, { headers })
            .then(value => value.data);
    }
    createAd(data: any) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/Ad', data, { headers });
    }
    updateAd(data: any, id: any) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.put((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/Ad/' + id, data, { headers });
    }
    deleteAd(id: string) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/Ad/' + id, { headers });
    }
    addVolunteer(adVolunteer: any) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) +
            '/Ad/' + adVolunteer.adId + '/' + adVolunteer.volunteerId, adVolunteer, { headers });
    }
    deleteAdVolunteer(id: any, volunteerId: any) {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` }
        return http.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/Ad/' + id + '/' + volunteerId, { headers });
    }
}