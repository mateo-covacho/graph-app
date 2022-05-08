import React from "react";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Landing_Page = () => {
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const particles_container = document.getElementsByClassName("section-1");
  return (
    <>
      <section className="section-1">
        <div className="intro glass">
          <img src="./media/icon.png" alt="graph icon" />
          <p>
            {" "}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            officiis in animi sunt velit harum, dignissimos voluptas atque est
            odio minus libero cupiditate a ad repellendus amet, praesentium
            commodi tempore.{" "}
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
