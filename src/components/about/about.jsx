import React from "react";
import { Basic, CaruselComponent } from "../../ui";
import { Head } from "../home";

function About() {
  return (
    <>
      <Basic check={false} name="About Us" title="About Us - Who We Are?">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <Head
              classNameDiv="text-left"
              title="Out history"
              text="how to to we are created this compony"
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              fugiat aliquam vel at aspernatur ipsa unde beatae sapiente
              architecto accusantium? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam asperiores et libero ullam, sunt
              perferendis.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              fugiat aliquam vel at aspernatur ipsa unde beatae sapiente
              architecto accusantium?
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 random_Image">
          {/* <CaruselComponent fileUrls={['https://unsplash.com/photos/two-people-sitting-on-a-bench-looking-out-at-the-ocean-BlK-4m4BWAw','https://unsplash.com/photos/two-people-sitting-on-a-bench-looking-out-at-the-ocean-BlK-4m4BWAw']}/> */}
          </div>
        </div>
      </Basic>
    </>
  );
}

export default About;
