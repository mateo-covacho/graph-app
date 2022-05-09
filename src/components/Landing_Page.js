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
  const [showNodes, setShowNodes] = useState("circle");
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
            retina_detect: true,
            background: {
              color: "#0d47a1",
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
          <p>
            {" "}
            This is {" "}
          </p>
        </div>
      </section>

      <section className="section-2">
        <h1>Section 2</h1>
      </section>
      <section className="section-3">
        <h1>Section 3</h1>
      </section>
    </>
  );
};

export default Landing_Page;
