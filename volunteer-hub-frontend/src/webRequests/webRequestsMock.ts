import { WebRequestsInterface } from "./webRequests-int";
import axios from 'axios'

export class WebRequestMock implements WebRequestsInterface {

    async getUser(email: string, password: string) {
        const params = {"email": email, "password": password };
        return await axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/users', 
        { params }
        );
    }
    async createUser(email: string, password: string) {
        const data = { email: email, password: password }
        return await axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/users', data);
    }
    async getAllOrganizations() {
        return await axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations');
    }
    getOrganizationById(organizationId: number) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + String(organizationId));
    }
    createOrganization(organizationData: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string) + 'organizations', organizationData);
    }
    updateOrganization(organizationId: number, organizationData: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string) + 'organizations/' + String(organizationId), organizationData);
    }
    deleteOrganization(organizationId: number) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + String(organizationId));
    }
    getAllVolunteers() {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/volunteers');
    }
    getVolunteerById(volunteerId: string) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/volunteers/' + volunteerId);
    }
    getVolunteerBySkill(skills: any) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations');
    }
    createVolunteer(volunteerData: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations', volunteerData);
    }
    updateVolunteer(volunteerId: string, volunteerData: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + volunteerId, volunteerData);
    }
    deleteVolunteer(volunteerId: string) {
        return axios.delete((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + volunteerId);
    }
}