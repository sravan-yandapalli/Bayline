import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  emailId: Yup.string().email("Invalid email").required("EmailId Is Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Password Is Required"),
});
