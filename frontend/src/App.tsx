import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUserDetails, selectAuth } from "./features/auth/authSlice";
import Auth from "./components/Auth";
import { Box } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  useEffect(() => {
    console.log("Running useEffect");
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <div className="App">
      {auth ? (
        auth?.role === "user" ? (
          <>
            <h1>{auth.fristName}</h1>
            <p>I'm a admin </p>
            <h2>{auth.email}</h2>
          </>
        ) : null
      ) : (
        <Box
          sx={{
            height: "100vh",
            maxWidth: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Auth />
        </Box>
      )}
    </div>
  );
}

export default App;
