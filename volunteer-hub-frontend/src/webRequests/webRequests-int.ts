export interface WebRequestsInterface {
    signUpAsOrganization(firstName: string, lastName: string, userName: string, password: string, email: string, phoneNumber: string): any,
    signUpAsVolunteer(firstName: string, lastName: string, userName: string, password: string, email: string, phoneNumber: string): any,
    logIn(userName: string, password: string): any,
    getUser(id: any): any;
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