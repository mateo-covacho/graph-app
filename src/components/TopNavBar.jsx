import React from "react";
import { Link as LinkScrollReference } from "react-scroll";
import { Link } from "react-router-dom";

//_________________________________________________________

export const TopNavBar = (props) => {
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
      {props.isAdmin ? (
        <Link to="/dashboard">
          <div className="dashboard-nav-bar">
            {" "}
            <p>Dashboard</p>
          </div>{" "}
        </Link>
      ) : (
        <Link to="/admin_login">
          <div className="dashboard-nav-bar">
            {" "}
            <p>Dashboard</p>
          </div>{" "}
        </Link>
      )}
      <LinkScrollReference //about section 3
        activeClass="active"
        to="section-3"
        spy={true}
        smooth={true}
      >
        <div className="about-me-nav-bar">
          <p>About</p>
        </div>
      </LinkScrollReference>
      <LinkScrollReference // How to use section 3
        activeClass="active"
        to="section-2"
        spy={true}
        smooth={true}
      >
        <div className="how2use-nav-bar">
          <p>Usage</p>
        </div>
      </LinkScrollReference>
    </nav>
  );
};

export default TopNavBar;
