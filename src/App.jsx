import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Button from "@/Components/Button/Button";
import Spinner from "@/Components/Spinner/Spinner";

import Home from "@/Pages/Home/Home";
import AuthPage from "@/Pages/AuthPage/AuthPage";
import AppLayout from "@/Layout/AppLayout/AppLayout";

import { getCurrentUser } from "./apis";
import { themeEnum } from "./utils/constants";
import actionTypes from "./store/actionTypes";

function App() {
  const userDetails = useSelector((state) => state.root.user);
  const currentTheme = useSelector((state) => state.root.theme);
  const dispatch = useDispatch();

  const [isMobileView, setIsMobileView] = useState("");
  const [appLoaded, setAppLoaded] = useState(false);
  const [showTakingLongerMsg, setShowTakingLongerMsg] = useState(false);

  const handleUserDetection = async () => {
    const token = localStorage.getItem("v-c-token");
    console.log("token", token);
    if (!token) {
      setAppLoaded(true);
      return;
    }

    let res = await getCurrentUser();
    setAppLoaded(true);
    if (!res) {
      // localStorage.removeItem("v-c-token");
      return;
    }

    const user = res?.data;
    if (user) dispatch({ type: actionTypes.USER_LOGIN, user });
  };

  const handleResize = (event) => {
    const width = event.target.outerWidth;
    if (width < 768) setIsMobileView(true);
    else setIsMobileView(false);
  };

  const computeTheme = () => {
    const theme = localStorage.getItem("theme");

    dispatch({ type: actionTypes.SET_THEME, theme: theme || themeEnum.light });
  };

  useEffect(() => {
    const appThemeClasses = {
      [themeEnum.light]: "app-theme-light",
      [themeEnum.dark]: "app-theme-dark",
    };

    if (currentTheme === themeEnum.dark) {
      document.body.classList.remove(appThemeClasses[themeEnum.light]);
      document.body.classList.add(appThemeClasses[themeEnum.dark]);
    } else {
      document.body.classList.remove(appThemeClasses[themeEnum.dark]);
      document.body.classList.add(appThemeClasses[themeEnum.light]);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (typeof isMobileView !== "boolean") {
      setIsMobileView(window.outerWidth < 768);
      dispatch({
        type: actionTypes.SET_MOBILE_VIEW,
        isMobileView: window.outerWidth < 768,
      });
    } else
      dispatch({
        type: actionTypes.SET_MOBILE_VIEW,
        isMobileView,
      });
  }, [isMobileView]);

  useEffect(() => {
    handleUserDetection();
    computeTheme();
    handleResize({ target: window });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return appLoaded ? (
    <div className="main-app">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<AppLayout />}>
            {/* whole application private routes will be defined below */}

            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="/*"
            element={
              <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center max-sm:gap-3">
                <h1 className=" text-5xl max-sm:text-2xl">Page not found</h1>
                <p className=" text-lg text-center max-sm:text-sm">
                  You have reached application borders. There is nothing here{" "}
                  {":("}
                </p>
                <Button withArrow onClick={() => window.location.replace("/")}>
                  Home
                </Button>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  ) : (
    <div className="page-container">
      <Spinner />
    </div>
  );
}

export default App;
