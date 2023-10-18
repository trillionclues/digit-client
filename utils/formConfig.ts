import { FormConfigProps } from "@/types/FormConfigProps";
export const formConfig: Record<string, FormConfigProps> = {
  // login
  login: {
    title: "Sign In to your SOFANA",
    description: "Enter your details to sign in to your account",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Email",
        required: true,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        required: true,
      },
    ],
    initialData: {
      email: "",
      password: "",
    },
    type: "login",
  },

  // signup
  signup: {
    title: "Sign Up for SOFANA",
    description: "Create your account by filling in the details below",
    fields: [
      {
        name: "firstname",
        label: "First Name",
        type: "text",
        placeholder: "First Name",
        required: true,
      },
      {
        name: "lastname",
        label: "Last Name",
        type: "text",
        placeholder: "Last Name",
        required: true,
      },
      {
        name: "mobile",
        label: "Mobile",
        type: "text",
        placeholder: "Mobile",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Email",
        required: true,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        required: true,
      },
    ],
    initialData: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
    },
    type: "signup",
  },

  // recover password
  recover: {
    title: "Recover Your Password",
    description: "Enter your details to recover your password",
    fields: [
      {
        name: "firstname",
        label: "First Name",
        type: "text",
        placeholder: "First Name",
        required: true,
      },
      {
        name: "lastname",
        label: "Last Name",
        type: "text",
        placeholder: "Last Name",
        required: true,
      },
      {
        name: "mobile",
        label: "Mobile",
        type: "text",
        placeholder: "Mobile",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Email",
        required: true,
      },
      {
        name: "password",
        label: "New Password",
        type: "password",
        placeholder: "New Password",
        required: true,
      },
    ],
    initialData: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
    },
    type: "recover",
  },
};
