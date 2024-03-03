import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

export default function CreateComment() {
  const [error, setError] = useState(false);
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
      content: "",
      recipe: "",
    },
    validationSchema: yup.object().shape({
      content: yup.string().required("Required"),
      recipe: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      axios
        .post(
          "http://localhost:3010/api/user/createComment",
          {
            name: values.content,
            ingredients: values.recipe,
          },
          {
            withCredentials: true,
          }
        )
        .then(async (resp) => {
          setError(false);
          window.location.reload();
        })
        .catch((error: Error) => {
          setError(true);
          console.error(error);
        });
    },
  });

  return (
      <Box maxWidth={"80vw"} sx={{margin: "0 auto"}}>
      <Typography variant="h3" py={"10vh"}>Comment</Typography>
      <form onSubmit={handleSubmit}>
        <Typography>Recipe :</Typography>
        <TextField
          aria-label="recipe"
          size="small"
          fullWidth
          name="recipe"
          value={values.recipe}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.recipe && Boolean(errors.recipe)}
          helperText={touched.recipe && errors.recipe}
        />
        <Typography>Comment :</Typography>
        <TextField
          aria-label="content"
          size="small"
          fullWidth
          name="content"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
        />
        {error ? (
          <Typography color={"red"}>An Error occured, Try again</Typography>
        ) : null}
        <Button
          sx={{ marginTop: 5 }}
          fullWidth
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          Post Comment
        </Button>
      </form>
    </Box>
  );
}
