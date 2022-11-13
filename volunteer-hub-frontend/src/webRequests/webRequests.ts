import { WebRequestsInterface } from "./webRequests-int";
import axios from 'axios'

export class WebRequest implements WebRequestsInterface {
    getAllOrganizations() {
        return axios.get((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Organization/GetAllOrganizations');
    }
    getOrganizationById(id: number) {
        return axios.get((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Organization/GetOrganizationById/'+id);
    }
    createOrganization(data: any) {
        return axios.post((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Organization/CreateOrganization', data);
    }
    updateOrganization(data: any) {
        return axios.put((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Organization/UpdateOrganization', data);
    }
    deleteOrganization(data: any) {
        return axios.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Organization/DeleteOrganization', 
        {data: data});
    }
    getAllVolunteers() {
        return axios.get((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Volunteer');
    }
    getVolunteerById(id: string) {
        return axios.get((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Volunteer/'+id);
    }
    getVolunteerBySkill(skills: any) {
        return axios.get((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Volunteer/GetVolunteersBySKill/' + skills);
    }
    createVolunteer(data: any) {
        return axios.post((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Volunteer', data);
    }
    updateVolunteer(data: any) {
        return axios.put((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Volunteer/', data);
    }
    deleteVolunteer(id: string) {
        return axios.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string)+'/Volunteer/'+id);
    }
}