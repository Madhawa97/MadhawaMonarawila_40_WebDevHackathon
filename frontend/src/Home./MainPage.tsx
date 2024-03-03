import { Box, Typography, Tabs, Tab } from "@mui/material";
import React, { useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserDetails, selectAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserDetails()).then((res) => {
      if (auth) {
        navigate("/main");
      } else {
        navigate("/login");
      }
    });
  }, [dispatch]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Feed" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        HI
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography variant="h1">{auth?.fristName} {auth?.lastName}</Typography>
      </CustomTabPanel>
    </Box>
  );
}
