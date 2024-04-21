import "./App.css";


import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//----------------------------------------------------------------------------------------------------
// Components

import Landing_Page from "./components/Landing_Page";
import TopNavBar from "./components/TopNavBar";
import Dashboard from "./dashboard/Dashboard";
import Admin_login from "./components/Admin_login";

//----------------------------------------------------------------------------------------------------


function App() {
  const [adminVerified, setAdminVerified] = useState(false);

  const home = useRef(null);
  const features = useRef(null);
  const aboutMe = useRef(null);
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <TopNavBar homeRef={home} featuresRef={features} aboutMeRef={aboutMe} />
              <Landing_Page homeRef={home} featuresRef={features} aboutMeRef={aboutMe} />
            </>
          }
        />
        <Route
          path='/admin_login'
          element={
            <Admin_login
              isAdminFuncion={(bool) => {
                setAdminVerified(bool);
              }}
            />
          }
        />
          <Route path='/dashboard' element={<Dashboard isAdmin={adminVerified} />} />
      </Routes>
    </Router>
  );
}

export default App;
