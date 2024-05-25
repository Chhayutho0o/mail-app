import * as Yup from "yup";

const authValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  // username: Yup.string()
  //   .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be more than 8 characters")
    .required("Password is required"),
});
export default authValidation;
