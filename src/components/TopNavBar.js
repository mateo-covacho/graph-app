import React from "react";
import { Link as LinkScrollReference } from "react-scroll";
export const TopNavBar = () => {
  return (
    <nav className="topNavBar ">
      <div className="home-nav-bar">
        {" "}
        <p>
          {" "}
          <LinkScrollReference
            activeClass="active"
            to="section-1"
            spy={true}
            smooth={true}
          >
            Home
          </LinkScrollReference>{" "}
        </p>
      </div>
      <div className="dashboard-nav-bar">
        {" "}
          <p>Dashboard</p>
      </div>
      <div className="about-me-nav-bar">
        {" "}
        <LinkScrollReference
          activeClass="active"
          to="section-3"
          spy={true}
          smooth={true}
          >
        <p>About</p>
          </LinkScrollReference>{" "}
      </div>
      <div className="features-nav-bar">
        <LinkScrollReference
          activeClass="active"
          to="section-2"
          spy={true}
          smooth={true}
        >
          <p>How to use</p>
        </LinkScrollReference>
      </div>
    </nav>
  );
};
