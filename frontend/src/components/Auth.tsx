import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useAppDispatch } from "../app/hooks";
import { loginUser } from "../features/auth/authSlice";

export default function Auth() {
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
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Not a valid email").required("Required"),
      password: yup.string().required("Required"),
    }), // form will be vaildated and display errors
    onSubmit: async (values) => {
      let data = {
        userName: values.email,
        password: values.password,
      };
      dispatch(loginUser(data));
    },
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Typography>email</Typography>
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
        <Typography>password</Typography>
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
        <Button type="submit" disabled={isSubmitting}>
          {" "}
          Submit{" "}
        </Button>
      </form>
    </Box>
  );
}
