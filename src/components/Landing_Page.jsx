import React from "react";
import { useState } from "react";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Landing_Page = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};

  const particles_container = document.getElementsByClassName("section-1");
  const [showNodes, setShowNodes] = useState("square");
  return (
    <>
      <section className="section-1">
        <Particles
          className="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          container={{
            id: "section-1",
          }}
          options={{
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              shape: {
                type: showNodes,
              },
              opacity: {
                value: 0.5,
                random: false,
              },
              size: {
                value: 10,
                random: true,
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.7,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "grab",
                  parallax: {
                    enable: true,
                    smooth: 10,
                    force: 60,
                  },
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 200,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 0.8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            background: {
              color: "#5894f1",
              image: "public/media/mask_background.jpg",
              position: "50% 50%",
              repeat: "no-repeat",
              size: "cover",
            },
          }}
        />
        <div className="intro glass">
          <img
            onClick={() => {
              setShowNodes(showNodes ? "" : "circle");
            }}
            src="./media/icon.png"
            alt="graph icon"
          />
          <h1>Network explorer</h1>
          <p>
            {" "}
            An App to allow users to visualize data representable in network
            graph form datasets such as social media relational data
            (Friendships, follows, etc...) and data such as blockchain activity
            for investigational and reserch purposes.{" "}
          </p>
        </div>
      </section>

      <section className="section-2">
        <h1>How to use </h1>

        <div className="how-2-use glass">
          When you enter the dash board the first step is to import data. You
          can either do this manualy bu manualy ploting out the network or use
          one oth the built in features to import blockchain / instagram data.
          Once you have the data you can :
          <ul>
            <br />
            <li>
              Use graph traversal algorithms to identify connections between
              individuals or nodes.
            </li>
            <br />
            <li>Import data from platforms in a user-friendly way</li>
            <br />
            <li>
              Saving and creating projects to maintain the state of your project
              Monetization with ads
            </li>
          </ul>
        </div>
      </section>

      <section className="section-3">
        <h1>About me and this project</h1>
        <div className="about-section">
          <p>
            Hello I am Mateo Covacho Berrocal, I am a self-taught developer
            based in Spain. I have been publicly developing this project since
            May 2022.{" "}
          </p>
          <p>
            My intentions with this project are to show my abilities as a
            Software Engineer in many areas such as Front-end development,
            traversal algorithms, developer operations and self-organization.
          </p>
          <p>
            You can see more details about me, the development process of this
            project and the technologies I used in my social media (Twitter,
            Medium, Github) which I used to document the development process{" "}
          </p>
        </div>
      </section>
      <div className="icons-bar">
        <a href="https://twitter.com/home" target="_blank">
          <div className="twitter">
            <svg
              width="50"
              height="201"
              viewBox="0 0 247 201"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M220.95 50.29C221.1 52.46 221.1 54.63 221.1 56.82C221.1 123.55 170.3 200.51 77.41 200.51V200.47C49.97 200.51 23.1 192.65 0 177.83C3.99 178.31 8 178.55 12.02 178.56C34.76 178.58 56.85 170.95 74.74 156.9C53.13 156.49 34.18 142.4 27.56 121.83C35.13 123.29 42.93 122.99 50.36 120.96C26.8 116.2 9.85 95.5 9.85 71.46C9.85 71.24 9.85 71.03 9.85 70.82C16.87 74.73 24.73 76.9 32.77 77.14C10.58 62.31 3.74 32.79 17.14 9.71C42.78 41.26 80.61 60.44 121.22 62.47C117.15 44.93 122.71 26.55 135.83 14.22C156.17 -4.9 188.16 -3.92 207.28 16.41C218.59 14.18 229.43 10.03 239.35 4.15C235.58 15.84 227.69 25.77 217.15 32.08C227.16 30.9 236.94 28.22 246.15 24.13C239.37 34.29 230.83 43.14 220.95 50.29Z"
                fill="black"
              />
            </svg>
          </div>
        </a>
        <a href="https://github.com/mateo-covacho/graph-app" target="_blank">
          <div className="github">
            <img src="../../media/GitHub-Mark-120px-plus.png" alt="" />
          </div>
        </a>
        <a
          href="https://medium.com/@mateocobacho/the-start-of-my-largest-software-engineering-project-use-cases-thesis-technologies-and-cc7b0a3bb682"
          target="_blank"
        >
          <div className="medium">
            <svg viewBox="0 0 1043.63 592.71" class="aa bb">
              <g data-name="Layer 2">
                <g data-name="Layer 1">
                  <path
                    d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0
                  296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0
                  154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279
                  147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76
                  249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9
                  51.76 249.94"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </a>
      </div>
    </>
  );
};

export default Landing_Page;
