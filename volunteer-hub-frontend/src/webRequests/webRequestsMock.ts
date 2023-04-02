import { WebRequestsInterface } from "./webRequests-int";
import axios from 'axios'

export class WebRequestMock implements WebRequestsInterface {

    signUpAsOrganization(organization: any): any {
        return 'OK';
     }
     signUpAsVolunteer(volunteer: any): any {
        return 'OK';
     }
    logIn(userName: string, password: string): any {
        const params: any = {};
        if (userName !== "") {
            params.username = userName;
        }
        if (password !== "") {
            params.password = password;
        }

        const tmp = axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string) + '/users',
            { params }
        );
        return tmp.then(v => v.data.id).catch(e => undefined);
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