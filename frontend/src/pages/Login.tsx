import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useAppDispatch } from "../app/hooks";
import { loginUser } from "../features/auth/authSlice";
import { Link, Redirect } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      userName: yup.string().required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      let data = {
        userName: values.userName,
        password: values.password,
      };
      const loginReq = await dispatch(loginUser(data));
      if (loginReq.meta.requestStatus === 'fulfilled'){
        console.log("Logged in successfully")
        setError(false);
      } else {
        setError(true);
      }
    },
  });

  return (
    <Box maxWidth={"80vw"} sx={{margin: "0 auto"}}>
      <Typography variant="h3" py={"10vh"}>Sign In</Typography>
      <form onSubmit={handleSubmit}>
        <Typography>Username:</Typography>
        <TextField
          aria-label="userName"
          size="small"
          fullWidth
          name="userName"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.userName && Boolean(errors.userName)}
          helperText={touched.userName && errors.userName}
        />
        <Typography>Password:</Typography>
        <TextField
          aria-label="password"
          size="small"
          fullWidth
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        {error ? <Typography color={"red"}>An Error occured, Try again</Typography> : null}
        <Button sx={{marginTop: 5}}  fullWidth color="primary" variant="contained" type="submit" disabled={isSubmitting}>
          {" "}
          Login{" "}
        </Button>
        <Link to="/registerview">
        <Button sx={{marginTop: 5}}  fullWidth color="primary" variant="contained" disabled={isSubmitting}>
          {" "}
          Register{" "}
        </Button>
        </Link>
      </form>
    </Box>
  );
}
