import React from "react";
import Head from "../hero/head";

import SlideAgents from "./slideAgents";

function Agents() {

  return (
    <div className="text-center py-5">
      <div className="container d-flex mx-auto flex-column">
          <Head
            title="Our Agents"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. "
          />
        <SlideAgents/>
      </div>
    </div>
  );
}

export default Agents;
