export interface WebRequestsInterface {
    signUpAsOrganization(data: any): any,
    signUpAsVolunteer(data: any): any,
    logIn(userName: string, password: string): any,

    getAllOrganizations(): any
    getOrganizationById(id: string): any
    createOrganization(data: any): any
    updateOrganization(data: any, id: string): any
    deleteOrganization(id: string): any

    getAllVolunteers(): any
    getVolunteerById(id: string): any
    getVolunteerBySkill(skills: any): any
    createVolunteer(data: any): any
    updateVolunteer(data: any, id: string): any
    deleteVolunteer(id: string): any

    getAllAds(): any
    getAdById(id: string): any
    createAd(data: any): any
    updateAd(data: any, id: string): any
    deleteAd(id: string): any
    addVolunteer(adVolunteer: any): any
    deleteAdVolunteer(id: any, volunteerId): any
}