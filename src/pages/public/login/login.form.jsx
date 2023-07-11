import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import InitializeFormik from "./login.dal";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const formik = InitializeFormik();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group d-flex flex-row flex-wrap gap-3 justify-content-center">
        {formik.errors.response &&
          <div className="card bg-danger">
            <div className="card-body">
                <h5 className="m-0 text-white">Invalid Credentials</h5>
            </div>
          </div>
        }
        <TextField
          type="text"
          id="username"
          variant="outlined"
          label="Username"
          placeholder="Username"
          autoComplete="username"
          fullWidth
          {...formik.getFieldProps("username")}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          id="password"
          variant="outlined"
          label="Password"
          placeholder="Password"
          fullWidth
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <LoadingButton
          loading={formik.isSubmitting}
          variant="contained"
          color="primary"
          size="large"
          className="fw-bold p-2"
          fullWidth
          centerRipple
          type="submit"
        >
          Login
        </LoadingButton>
      </div>
    </form>
  );
};