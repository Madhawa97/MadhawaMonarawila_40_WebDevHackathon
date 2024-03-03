import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Recipe, RecipeSum } from "../types";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";
import CreateRecipe from "./CreateRecipe";
import CreateComment from "./CreateComment";

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

  useEffect(() => {
    getRes();
  }, []);

  return (
    <>
      {auth && (
        <Box>
          <Login />
          <br />
          <Box pt={5}>
            <Register />
          </Box>
          <br />
        </Box>
      )}
      <Box pt={6}></Box>
      <Box maxWidth={"80vw"} sx={{ margin: "0 auto" }}>
        <Typography variant="h3">Recipe Listing</Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {recips.map((item: RecipeSum) => {
            return (
              <Card sx={{ minWidth: 275, border: "solid grey 1px" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    ={" "}
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
                  <Typography>Shared By : {item.user.userName!} </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View More</Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Box>
      <br />
      <Box pt={6}>
        <CreateRecipe />
      </Box>
      <Box pt={6}>
        <CreateComment />
      </Box>
    </>
  );
};
export default Home;
