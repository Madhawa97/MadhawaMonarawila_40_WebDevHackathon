import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useAppDispatch } from "../app/hooks";
import { registerUser } from "../features/auth/authSlice";
import { Redirect } from "react-router-dom";

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
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      userName: yup.string().required("Required"),
      email: yup.string().email("Please enter valid email").required("Required"),
      password: yup.string().required("Required").min(6, "Must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      let data = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        password: values.password,
      };
      const registerReq = await dispatch(registerUser(data));

      if (registerReq.meta.requestStatus === 'fulfilled'){
        console.log("Registered successfully")
        setError(false);
      } else {
        setError(true);
      }

    },
  });

  return (
    <Box maxWidth={"80vw"} sx={{margin: "0 auto"}}>
      <Typography variant="h3" py={"10vh"}>Register</Typography>
      <form onSubmit={handleSubmit}>
      <Typography>First Name :</Typography>
        <TextField
          aria-label="firstName"
          size="small"
          fullWidth
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <Typography>Last Name :</Typography>
        <TextField
          aria-label="lastName"
          size="small"
          fullWidth
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <Typography>Username :</Typography>
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
        
        <Typography>Email :</Typography>
        <TextField
          aria-label="email"
          size="small"
          fullWidth
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <Typography>Password :</Typography>
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
          Register{" "}
        </Button>
      </form>
    </Box>
  );
}
