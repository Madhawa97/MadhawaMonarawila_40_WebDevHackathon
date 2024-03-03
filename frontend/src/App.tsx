import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUserDetails, selectAuth } from "./features/auth/authSlice";
import AuthPage from "./pages/AuthPage";
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
        >
          <AuthPage />
        </Box>
      )}
    </div>
  );
}

export default App;
