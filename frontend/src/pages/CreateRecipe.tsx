import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useAppDispatch } from "../app/hooks";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateRecipe() {
  const [error, setError] = useState(false);
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
      name: "",
      ingredients: "",
      instructions: "",
      timeToCookInMins: 0,
      rating: 0,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Required"),
      ingredients: yup.string().required("Required"),
      instructions: yup.string().required("Required"),
      timeToCookInMins: yup.number().required("Required"),
      rating: yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      //   let data = {
      //     name: values.name,
      //     ingredients: values.ingredients,
      //     instructions: values.instructions,
      //     timeToCookInMins: values.timeToCookInMins,
      //     rating: values.rating,
      //   };
      //   const recipReq = await dispatch(createRecipe(data));
      //   if (recipReq.meta.requestStatus === 'fulfilled'){
      //     console.log("Recipe created successfully")
      //     setError(false);
      //   } else {
      //     setError(true);
      //   }
      axios
        .post(
          "http://localhost:3010/api/user/createRecipe",
          {
            name: values.name,
            ingredients: values.ingredients,
            instructions: values.instructions,
            timeToCookInMins: values.timeToCookInMins,
            rating: values.rating,
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
    <Box>
      <form onSubmit={handleSubmit}>
        <Typography>Recipe name :</Typography>
        <TextField
          aria-label="name"
          size="small"
          fullWidth
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <Typography>Ingredients :</Typography>
        <TextField
          aria-label="ingredients"
          size="small"
          fullWidth
          name="ingredients"
          value={values.ingredients}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.ingredients && Boolean(errors.ingredients)}
          helperText={touched.ingredients && errors.ingredients}
        />
        <Typography>Instructions :</Typography>
        <TextField
          aria-label="instructions"
          size="small"
          fullWidth
          name="instructions"
          value={values.instructions}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.instructions && Boolean(errors.instructions)}
          helperText={touched.instructions && errors.instructions}
        />
        <Typography>Time To Cook (In Mins) :</Typography>
        <TextField
          aria-label="timeToCookInMins"
          size="small"
          fullWidth
          name="timeToCookInMins"
          value={values.timeToCookInMins}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.timeToCookInMins && Boolean(errors.timeToCookInMins)}
          helperText={touched.timeToCookInMins && errors.timeToCookInMins}
        />
        <Typography>Rating :</Typography>
        <TextField
          aria-label="rating"
          size="small"
          fullWidth
          name="rating"
          value={values.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.rating && Boolean(errors.rating)}
          helperText={touched.rating && errors.rating}
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
          Create Recipe
        </Button>
      </form>
    </Box>
  );
}
