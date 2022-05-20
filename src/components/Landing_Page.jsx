import React from "react";
import { useState } from "react";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Landing_Page = () => {
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};

  const particles_container = document.getElementsByClassName("section-1");
  const [showNodes, setShowNodes] = useState("square");
  return (
    <>
      <section className='section-1'>
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
        <div className='intro glass'>
          <img
            onClick={() => {
              setShowNodes(showNodes ? "" : "circle");
            }}
            src='./media/icon.png'
            alt='graph icon'
          />
          <h1>Network explorer</h1>
          <p> An App to allow users to visualize data representable in network graph form datasets such as social media relational data (Friendships, follows, etc...) and data such as blockchain activity for investigational and reserch purposes. </p>
        </div>
      </section>

      <section className='section-2'>
        <h1>How to use </h1>

        <div className='how-2-use glass'>
          When you enter the dash board the first step is to import data. You can either do this manualy bu manualy ploting out the network or use one oth the built in features to import blockchain / instagram data. Once you have the data you can :
          <ul>
            <br />
            <li>Use graph traversal algorithms to identify connections between individuals or nodes.</li>
            <br />
            <li>Import data from platforms in a user-friendly way</li>
            <br />
            <li>Saving and creating projects to maintain the state of your project Monetization with ads</li>
          </ul>
        </div>
      </section>

      <section className='section-3'>
        <h1>About me and this project</h1>
        <div className='glass'>
          <p>Hello I am Mateo Covacho Berrocal, I am a self taught developer based in Spain. I have been publicy developing this project since may 2022. </p>
          <p>My intentions with this prject are to show my abilities as a Software Engineer in many areas such as: Front-end development, traversal algorithms, developer operations and self organization.</p>
          <p>You can see more details about me, the development process of this project and the technologies I used in my social media (Twitter, Medium, Github) witch I used to document the development process </p>
        </div>
      </section>
    </>
  );
};

export default Landing_Page;
