import React, { useRef } from "react";
import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./css/Landing_Page.css";
//--------------------------------------------------------------------------------
import { GiMeshNetwork } from "react-icons/gi";
import { BiImport } from "react-icons/bi";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { DiAptana } from "react-icons/di";
import { FaGithub, FaTwitter, FaMedium } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import { Row, Col, ToggleButton } from "react-bootstrap";
import { useReducer } from "react";

//--------------------------------------------------------------------------------

const Landing_Page = (props) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};

  const particles_container = document.getElementsByClassName("section-1");
  const [showNodes, setShowNodes] = useState("circle");
  return (
    <>
      <section className='section-1 ' ref={props.homeRef}>
        <Particles
          className='tsparticles'
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
                value: 70,
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
                value: 5,
                random: false,
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
              color: "#27292d",
              image: "public/media/mask_background.jpg",
              position: "50% 50%",
              repeat: "no-repeat",
              size: "cover",
            },
          }}
        />
        <div className='intro glass'>
          <img
            onClick={() => {
              setShowNodes(showNodes ? "" : "circle");
            }}
            src='./media/icon.png'
            alt='graph icon'
          />
          <h1>Network explorer </h1>
          <p>
            An App to allow users to visualize data represented in network graph form datasets such as social media relational data (Friendships,
            follows, etc...) and data such as blockchain transactions for investigational and research purposes.
          </p>
        </div>
      </section>

      <footer id='footer'>
        <div className='footer-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3 col-md-6 footer-links'>
                <h4>My links</h4>
                <ul>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='https://www.mateocovacho.com/'>
                      Web portfolio
                    </a>
                  </li>
                  <li>
                    <i className='bx bx-chevron-right' />
                    <a target={"_blank"} href='https://www.linkedin.com/in/mateo-covacho-berrocal-35a039224/'>
                      Linkedin
                    </a>
                  </li>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='https://twitter.com/covacho_dev'>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='http://link.medium.com/KB6fzkFRTpb'>
                      Medium
                    </a>
                  </li>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='https://github.com/mateo-covacho'>
                      Github
                    </a>
                  </li>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='https://stackoverflow.com/users/18017427/mateo-covacho'>
                      StackOverflow
                    </a>
                  </li>
                </ul>
              </div>
              <div className='col-lg-3 col-md-6 footer-links'>
                <h4>Graph explorer</h4>
                <ul>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='https://network-graph-explorer.vercel.app/dashboard'>
                      Graph app
                    </a>
                  </li>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='https://leak-shield.vercel.app/'>
                      Leak shield
                    </a>
                  </li>
                  <li>
                    <i className='bx bx-chevron-right' />{" "}
                    <a target={"_blank"} href='https://mateos-task-tracker.on.fleek.co/'>
                      Task tracker app
                    </a>
                  </li>
                </ul>
              </div>
              <div className='col-lg-3 col-md-6 footer-contact'>
                <h4>Contact Me</h4>
                <p>
                  <br /> Madrid, Spain <br />
                  <br /> <strong>Phone:</strong> +34 695 406 930
                  <br /> <strong>Email:</strong> mateocovacho@gmail.com
                  <br />
                </p>
              </div>
              <div className='col-lg-3 col-md-6 footer-info'>
                <h3>About Me</h3>
                <p>
                  Mateo Covacho, a Spanish Software Engineer and tech enthusiast with a passion for problem-solving and learning new things in the
                  industry.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='credits'>Designed by Mateo Covacho</div>
        </div>
      </footer>
      {/* 
      <section className='section-2 p-5' ref={props.featuresRef}>
        <h1 className=''>Features </h1>
        <Row>
          <Col className='text-center mb-5' style={{ height: "20vh" }}>
            <h2>Import data</h2>
            <div>
              <BiImport size={"80px"} />
            </div>
          </Col>

          <Col className='text-center mb-5' style={{ height: "20vh" }}>
            <h2>Physics engine</h2>
            <div>
              <DiAptana size={"80px"} />
            </div>
          </Col>
          <Col className='text-center mb-5' style={{ height: "20vh" }}>
            <h2>
              Add & remove
              <br />
              nodes
            </h2>
            <div>
              <GiMeshNetwork size={"80px"} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className='text-center mb-5' style={{ height: "20vh" }}>
            <h2>Pathfindig algorithms</h2>
            <div>
              <AiOutlineNodeIndex size={"80px"} />
            </div>
          </Col>
          <Col className='text-center mb-5' style={{ height: "20vh" }}>
            <h2>Blockchain data scraper</h2>
            <div>
              <GiMagnifyingGlass size={"80px"} />
            </div>
          </Col>
        </Row>
      </section>

      <section className='section-3' ref={props.aboutMeRef}>
        <h1>About me and this project</h1>
        <div className='about-section'>
          <p>
            Hello, I am Mateo Covacho Berrocal, I am a self-taught developer based in Spain. I have been publicly developing this project since May
            2022.
          </p>
          <p>
            My intentions with this project are to show my abilities as a Software Engineer in many areas such as Front-end development, traversal
            algorithms, developer operations and self-organization.
          </p>
          <p>
            You can see more details about me, the development process of this project and the technologies I used in my social media (Twitter,
            Medium, Github) which I used to document the development process
          </p>
        </div>
      </section>

      <div className='icons-bar'>
        <a href='https://twitter.com/covacho_dev' target='_blank'>
          <div className='twitter'>
            <FaTwitter color='black' size={"20px"} />
          </div>
        </a>

        <a href='https://github.com/mateo-covacho/graph-app' target='_blank'>
          <div className='github'>
            <FaGithub color='black' size={"20px"} />
          </div>
        </a>

        <a href='http://link.medium.com/KB6fzkFRTpb' target='_blank'>
          <div className='medium'>
            <FaMedium color='black' size={"20px"} />
          </div>
        </a>
      </div> */}
    </>
  );
};

export default Landing_Page;
