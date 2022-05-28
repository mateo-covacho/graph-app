import "./App.css";
import "./components/css/Landing_Page.css";

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//----------------------------------------------------------------------------------------------------
// Components

import Landing_Page from "./components/Landing_Page";
import TopNavBar from "./components/TopNavBar";
import Dashboard from "./dashboard/Dashboard";
import Admin_login from "./components/Admin_login";

//----------------------------------------------------------------------------------------------------

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopNavBar />
              <Landing_Page />
            </>
          }
        />
        <Route
          path="/admin_login"
          element={
            <>
              <Admin_login />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
