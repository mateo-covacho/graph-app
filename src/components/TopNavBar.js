import React from "react";
import { Link as LinkScrollReference } from "react-scroll";
export const TopNavBar = () => {
  return (
    <nav className="topNavBar ">
      <LinkScrollReference // Home button
        activeClass="active"
        to="section-1"
        spy={true}
        smooth={true}
      >
        <div className="home-nav-bar">
          <p>Home</p>
        </div>
      </LinkScrollReference>
      <div className="dashboard-nav-bar">
        {" "}
        <p>Dashboard</p>
      </div>{" "}
      <LinkScrollReference //about section 3
        activeClass="active"
        to="section-3"
        spy={true}
        smooth={true}
      >
        <div className="about-me-nav-bar">
          <p>About</p>
        </div>
      </LinkScrollReference>{" "}
      <LinkScrollReference // How to use section 3
        activeClass="active"
        to="section-2"
        spy={true}
        smooth={true}
      >
        <div className="features-nav-bar">
          <p>How to use</p>
        </div>
      </LinkScrollReference>
    </nav>
  );
};
