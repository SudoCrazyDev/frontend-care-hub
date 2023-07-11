import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlice";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function InitializeFormik() {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    Axios.post('login', values)
    .then(res => {
      dispatch(setUser(res.data));
    })
    .catch(err => {
      if(err.response.status === 404){
        formik.setFieldError('response', 'Invalid Credentials')
      }
    })
    .finally(() => {
      formik.setSubmitting(false);
    })
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return formik;
}

export default InitializeFormik;