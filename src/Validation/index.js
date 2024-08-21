import * as yup from "yup"




export const Register_Validation = yup.object().shape({

    name: yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Letters and spaces only")
        .required("Please input your name"),

    email : yup.string()
        .email("Invalid email format")
        .required("Please fill out the email field"),

    employee : yup.string()
        .matches(/^[0-9-]*$/, "Only numbers and dashes are allowed")
        .required("Please enter your employee number"),
})
    


