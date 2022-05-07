import { WebRequestsInterface } from "./webRequests-int";
import axios from 'axios'

export class WebRequestMock implements WebRequestsInterface {
    getAllOrganizations() {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations');
    }
    getOrganizationById(oraganizationId: string) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+oraganizationId);
    }
    createOrganization(organizationData: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string)+'organizations', organizationData);
    }
    updateOrganization(oraganizationId: string, organizationData: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string)+'organizations/'+oraganizationId, organizationData);
    }
    deleteOrganization(organizationId: string) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+organizationId);
    }
    getAllVolunteers() {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/volunteers');
    }
    getVolunteerById(volunteerId: string) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/volunteers/'+volunteerId);
    }
    getVolunteerBySkill(skills: any) {
        return axios.get((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations');
    }
    createVolunteer(volunteerData: any) {
        return axios.post((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations', volunteerData);
    }
    updateVolunteer(volunteerId: string, volunteerData: any) {
        return axios.put((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+volunteerId, volunteerData);
    }
    deleteVolunteer(volunteerId: string) {
        return axios.delete((process.env.REACT_APP_MOCK_SERVER_URL as string)+'/organizations/'+volunteerId);
    }
}