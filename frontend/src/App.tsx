import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUserDetails, selectAuth } from "./features/auth/authSlice";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const getAllPosts = async()=> {
  }
  useEffect(() => {
    dispatch(getUserDetails())
    getAllPosts()
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}>
          <Route  path="login" element={<Login />} />
          <Route  path="new" element={<New />} />
          <Route  path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
