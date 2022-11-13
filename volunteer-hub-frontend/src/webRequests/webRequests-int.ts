export interface WebRequestsInterface {
    getUser(email: string, password: string): any;
    createUser(email: string, password: string): any;
    getAllOrganizations(): any
    getOrganizationById(organizationId: number): any
    createOrganization(organizationData: any): any
    updateOrganization(organizationId: number, organizationData: any): any
    deleteOrganization(organizationId: number): any
    getAllVolunteers(): any
    getVolunteerById(volunteerId: string): any
    getVolunteerBySkill(skills: any): any
    createVolunteer(volunteerData: any): any
    updateVolunteer(volunteerId: string, volunteerData: any): any
    deleteVolunteer(volunteerId: string): any
}