export const inputFieldsforSignup = [
    {name:"firstName", labelName: "First name", errorName: "firstName"},
    {name:"lastName", labelName: "Last name", errorName: "lastName"},
    {name:"username", labelName: "Username", errorName: "uname"},
    {name:"email", labelName: "E-mail", errorName: "email"},
    {name:"pass", labelName: "Password", errorName: "pass"},
    {name:"role", labelName: "Role", errorName: "role"},
    {name:"phone", labelName: "Phone number", errorName: "phone"},
];

export const inputFieldsforSignin = [
    {name:"username", labelName: "Username", errorName: "uname"},
    {name:"pass", labelName: "Password", errorName: "pass"},
];

export const inputFieldsforCreateOrganizationForm = [
    {name:"organizationName", labelName: "Organization name", errorName: "organizationName"},
    {name:"summary", labelName: "Summary", errorName: "summary"},
];

export const inputFieldsforUpdateOrganizationForm = [
    {name:"organizationName", labelName: "Organization name", errorName: "organizationName"},
    {name:"summary", labelName: "Summary", errorName: "summary"},
];

export const inputFieldsforCreateAdForm = [
    {name:"title", labelName: "Title", errorName: "title"},
    {name:"summary", labelName: "Summary", errorName: "summary"},
    {name:"location", labelName: "Location", errorName: "location"},
    {name:"skills", labelName: "Skills necessary", errorName: "skills"},
    {name:"isEmergency", labelName: "Is this an emergency?", errorName: "isEmergency"},
];

export const inputFieldsforUpdateAdForm = [
    {name:"title", labelName: "Title", errorName: "title"},
    {name:"summary", labelName: "Summary", errorName: "summary"},
    {name:"location", labelName: "Location: ", errorName: "location"},
    {name:"skills", labelName: "Skills necessary: ", errorName: "skills"},
    {name:"isOpen", labelName: "Status: ", errorName: "isOpen"},
];

export const inputFieldsforCreateVolunteerForm = [
    {name:"firstName", labelName: "First name", errorName: "firstName"},
    {name:"lastName", labelName: "Last name", errorName: "lastName"},
    {name:"skills", labelName: "Skills", errorName: "skills"},
];

export const inputFieldsforUpdateVolunteerForm = [
    {name:"firstName", labelName: "First name", errorName: "firstName"},
    {name:"lastName", labelName: "Last name", errorName: "lastName"},
    {name:"skills", labelName: "Skills", errorName: "skills"},
];