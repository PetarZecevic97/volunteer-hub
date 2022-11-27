import { WebRequestsInterface } from "./webRequests-int";
import http from "../utility/Http";
export class WebRequest implements WebRequestsInterface {
    getUser(email: string, password: string) {

        var params = new URLSearchParams();
        params.append("email", email);
        params.append("password", password);
        var request = {
            params: params
        };

        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/users/', request);
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
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers');
    }
    getVolunteerById(id: string) {
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers/' + id);
    }
    getVolunteerBySkill(skills: any) {
        // TODO: EDIT SO THAT SKILLS IS A PARAM
        return http.get((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers/', skills);
    }
    createVolunteer(data: any) {
        return http.post((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers', data);
    }
    updateVolunteer(data: any) {
        return http.put((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers/', data);
    }
    deleteVolunteer(id: string) {
        return http.delete((process.env.REACT_APP_BACKEND_BASE_PATH as string) + '/volunteers/' + id);
    }
}