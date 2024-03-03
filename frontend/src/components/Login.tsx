import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useAppDispatch } from "../app/hooks";
import { loginUser } from "../features/auth/authSlice";

export default function Login() {
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
      dispatch(loginUser(data));
    },
  });

  return (
    <Box>
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
        <Button fullWidth color="primary" variant="contained" type="submit" disabled={isSubmitting}>
          {" "}
          Submit{" "}
        </Button>
      </form>
    </Box>
  );
}
