export const userRegistrationFormControls = [
    {
    name: "userName",
    label : "User Name",
    placeholder : "Enter User Name",
    componentType : "input",
    type : "text",
    },
    {
    name: "email",
    label : "Email",
    placeholder : "Enter Email",
    componentType : "input",
    type : "email",
    },
    {
    name: "password",
    label : "Password",
    placeholder : "Enter Password",
    componentType : "input",
    type : "password",
    }
]
export const initialSignUpFormData = {
    userName : "",
    email : "",
    password : ""
}

export const userLoginFormControls = [
    {
    name: "email",
    label : "Email",
    placeholder : "Enter Email",
    componentType : "input",
    type : "email",
    },
    {
    name: "password",
    label : "Password",
    placeholder : "Enter Password",
    componentType : "input",
    type : "password",
    }
]

export const initialSignInFormData = {
    email : "",
    password : ""
}