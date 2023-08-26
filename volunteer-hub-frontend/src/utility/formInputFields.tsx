// Metadata for input fields of any given form
// in the object which contains name:"meta"

export const inputFieldsforSignup = [
    {type:"text", name:"firstName", labelName: "First name", errorName: "firstName"},
    {type:"text", name:"lastName", labelName: "Last name", errorName: "lastName"},
    {type:"text", name:"username", labelName: "Username", errorName: "uname"},
    {type:"text", name:"email", labelName: "E-mail", errorName: "email"},
    {type:"text", name:"pass", labelName: "Password", errorName: "pass"},
    {type:"text", name:"role", labelName: "Role", errorName: "role"},
    {type:"text", name:"phone", labelName: "Phone number", errorName: "phone"},
];

export const inputFieldsforSignin = [
    {type:"text", name:"username", labelName: "Username", errorName: "uname"},
    {type:"text", name:"password", labelName: "Password", errorName: "password"},
    {type:"checkbox", name:"remember", labelName: "Remember me"},
    {type:"href", name:"sign-up", labelName: "Don't have an account? Sign Up"},
    // {type:"href", name:"forgotpassword", labelName: "Forgot password?"},
];

export const inputFieldsforCreateOrganizationForm = [
    {type:"text", name:"organizationName", labelName: "Organization name", errorName: "organizationName"},
    {type:"text", name:"summary", labelName: "Summary", errorName: "summary"},
];

export const inputFieldsforUpdateOrganizationForm = [
    {type:"text", name:"organizationName", labelName: "Organization name", errorName: "organizationName"},
    {type:"text", name:"summary", labelName: "Summary", errorName: "summary"},
];

export const inputFieldsforCreateAdForm = [
    {type:"text", name:"title", labelName: "Title", errorName: "title"},
    {type:"text", name:"summary", labelName: "Summary", errorName: "summary"},
    {type:"text", name:"location", labelName: "Location", errorName: "location"},
    {type:"text", name:"skills", labelName: "Skills necessary", errorName: "skills"},
];

export const inputFieldsforUpdateAdForm = [
    {type:"text", name:"title", labelName: "Title", errorName: "title"},
    {type:"text", name:"summary", labelName: "Summary", errorName: "summary"},
    {type:"text", name:"location", labelName: "Location: ", errorName: "location"},
    {type:"text", name:"skills", labelName: "Skills necessary: ", errorName: "skills"},
    {type:"text", name:"isOpen", labelName: "Status: ", errorName: "isOpen"},
];

export const inputFieldsforCreateVolunteerForm = [
    {type:"text", name:"firstName", labelName: "First name", errorName: "firstName"},
    {type:"text", name:"lastName", labelName: "Last name", errorName: "lastName"},
    {type:"text", name:"skills", labelName: "Skills", errorName: "skills"},
];

export const inputFieldsforUpdateVolunteerForm = [
    {type:"text", name:"firstName", labelName: "First name", errorName: "firstName"},
    {type:"text", name:"lastName", labelName: "Last name", errorName: "lastName"},
    {type:"text", name:"skills", labelName: "Skills", errorName: "skills"},
];