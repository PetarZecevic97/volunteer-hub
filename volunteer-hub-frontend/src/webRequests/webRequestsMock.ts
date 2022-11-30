import { WebRequestsInterface } from "./webRequests-int";
import axios from 'axios'
import IUser from "../Entities/User";

export class WebRequestMock implements WebRequestsInterface {

    async getUser(_email: string, _password: string, _username: string) {
        const params: any = {};
        if (_username !== "") {
            params.username = _username;
        }
        if (_password !== "") {
            params.password = _password;
        }
        if (_email !== "") {
            params.email = _email;
        }

        const tmp = await axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/users',
            { params }
        );
        return tmp;
    }
    async createUser(_username: string, _email: string, _password: string) {
        const data = { username: _username, email: _email, password: _password }
        return await axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/users', data);
    }
    async getAllOrganizations() {
        return await axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations');
    }
    getOrganizationById(id: string) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + id);
    }
    createOrganization(data: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string) + 'organizations', data);
    }
    updateOrganization(data: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string) + 'organizations/' + data.id, data);
    }
    deleteOrganization(data: any) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + data.id);
    }
    getAllVolunteers() {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/volunteers');
    }
    getVolunteerById(id: string) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/volunteers/' + id);
    }
    getVolunteerBySkill(skills: any) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations');
    }
    createVolunteer(data: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations', data);
    }
    updateVolunteer(data: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + data.id, data);
    }
    deleteVolunteer(id: string) {
        return axios.delete((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/organizations/' + id);
    }
}