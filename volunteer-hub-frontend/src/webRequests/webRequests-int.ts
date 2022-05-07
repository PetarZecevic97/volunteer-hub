export interface WebRequestsInterface {
    getAllOrganizations():any
    getOrganizationById(oraganizationId: string): any
    createOrganization(organizationData: any): any
    updateOrganization(oraganizationId: string, organizationData: any): any
    deleteOrganization(organizationId: string): any
    getAllVolunteers():any
    getVolunteerById(volunteerId: string):any
    getVolunteerBySkill(skills: any): any
    createVolunteer(volunteerData: any): any
    updateVolunteer(volunteerId: string, volunteerData: any): any
    deleteVolunteer(volunteerId: string): any
}