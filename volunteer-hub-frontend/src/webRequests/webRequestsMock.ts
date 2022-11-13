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
    getOrganizationById(id: number) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+id);
    }
    createOrganization(data: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string)+'organizations', data);
    }
    updateOrganization(data: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string)+'organizations/'+data.id, data);
    }
    deleteOrganization(data: any) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+data.id);
    }
    getAllVolunteers() {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/volunteers');
    }
    getVolunteerById(id: string) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/volunteers/'+id);
    }
    getVolunteerBySkill(skills: any) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations');
    }
    createVolunteer(data: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations', data);
    }
    updateVolunteer(data: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+data.id, data);
    }
    deleteVolunteer(id: string) {
        return axios.delete((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+id);
    }
}