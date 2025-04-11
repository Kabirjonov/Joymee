import React from 'react'
import { UncontrolledCarousel } from "reactstrap";
function CaruselComponent({fileUrls,height='200px'}) {
    return (
      <>
        <UncontrolledCarousel
        items={fileUrls.map((fileUrl,index)=>({src:fileUrl, 
          altText: `Slide ${index + 1}`,
          key: index + 1}))}
          className="caruselImages"
          style={{height:height}}
      />
      </>
      
    )
}

export default CaruselComponent
