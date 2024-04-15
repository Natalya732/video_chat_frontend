import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Button from "@/Components/Button/Button";
import Home from "@/Pages/Home/Home";
import AuthPage from "@/Pages/AuthPage/AuthPage";

function App() {
  return (
    <div className="main-app">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
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
  );
}

export default App;
