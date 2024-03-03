import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { resolve } from "dns";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Recipe } from "../types";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";
import CreateRecipe from "./CreateRecipe";

const Home: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const [recips, setRecips] = useState([]);
  const getRes = async () => {
    axios
      .get("http://localhost:3010/api/user/getRecipies?kind=all", {
        withCredentials: true,
      })
      .then(async (resp) => {
        setRecips(resp.data.recipies);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };
  const navigate = useNavigate();
  const handleOnClick = () => navigate("login");

  useEffect(() => {
    getRes();
  }, []);

  return (
    <>
      {auth && (
        <Box maxWidth={400}>
          <Typography variant="h3">Sign In</Typography>
          <Login />
          <br />
          <Box pt={5}>
            <Typography variant="h3">Register</Typography>
            <Register />
          </Box>
          <br />
        </Box>
      )}
      <Box pt={6}></Box>
      <Typography variant="h3">Recipe Listing</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {recips.map((item: Recipe) => {
          return (
            <Card sx={{ minWidth: 275, border: "solid grey 1px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h3" component="div">
                  {item.name}
                </Typography>
                <Typography sx={{}} color="text.secondary" variant="h6">
                  Ingredients:
                </Typography>
                <Typography variant="body2">{item.ingredients}</Typography>
                <Typography variant="h6">Instruction</Typography>
                <Typography variant="body2">{item.instructions}</Typography>
                <Typography>Time : {item.timeToCookInMins} mins</Typography>
                <Typography>Rating : {item.rating} starts</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View More</Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <br />
      <Box pt={6}>
        <Typography variant="h3">Create New Recipe</Typography>
        <CreateRecipe />
      </Box>
    </>
  );
};
export default Home;
