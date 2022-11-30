export interface WebRequestsInterface {
    getUser(email: string, password: string, username: string): any;
    createUser(username: string, email: string, password: string): any;
    getAllOrganizations():any
    getOrganizationById(id: string): any
    createOrganization(data: any): any
    updateOrganization(data: any): any
    deleteOrganization(data: any): any
    getAllVolunteers():any
    getVolunteerById(id: string):any
    getVolunteerBySkill(skills: any): any
    createVolunteer(data: any): any
    updateVolunteer(data: any): any
    deleteVolunteer(id: string): any
}