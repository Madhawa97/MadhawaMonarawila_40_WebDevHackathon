import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUserDetails, selectAuth } from "./features/auth/authSlice";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import New from "./pages/New";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const getAllPosts = async()=> {
  }

  const nav = () => {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    dispatch(getUserDetails())
    getAllPosts()
    if (auth){
      nav();
    }
  }, [dispatch]);

  return (
    <Router>
      <Switch>
          <Route exact path="/" ><Home /></Route>
          <Route exact path="/loginview" ><Login /></Route>
          <Route exact path="/registerview" ><Register /></Route>
          <Route exact path="/createrecipe" ><CreateRecipe /></Route>
      </Switch>
    </Router>
  );
}

export default App;
