import React from "react";
import { Link as LinkScrollReference } from "react-scroll";
import { Link } from "react-router-dom";

//_________________________________________________________

export const TopNavBar = (props) => {
  return (
    <nav className='topNavBar '>
      <div
        className='home-nav-bar'
        onClick={() => {
          props.homeRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <p>Home</p>
      </div>
      <Link to='/dashboard'>
        <div className='dashboard-nav-bar'>
          {" "}
          <p>Dashboard</p>
        </div>{" "}
      </Link>

      <div
        className='about-me-nav-bar'
        onClick={() => {
          props.featuresRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <p>About</p>
      </div>

      <div
        className='how2use-nav-bar'
        onClick={() => {
          props.aboutMeRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <p>Usage</p>
      </div>
      <a href='https://mateo-covacho.vercel.app/' target='_Blank'>
        <div className='how2use-nav-bar'>
          <p>More projects</p>
        </div>
      </a>
    </nav>
  );
};

export default TopNavBar;
