import React from "react";
import { Blog, Footer } from "../home";
import { Back } from "../../ui";
function BlogComponent() {
  return (
    <>
      <Back title="Blog Grid - Our Blogs" name="Blog" />
      <Blog />
      <Footer />
    </>
  );
}

export default BlogComponent;
