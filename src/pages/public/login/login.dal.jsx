import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function InitializeFormik() {
  const handleSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("SUBMITTED");
    },
  });

  return formik;
}

export default InitializeFormik;