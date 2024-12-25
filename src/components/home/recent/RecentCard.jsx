import  React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import { CardBody, CardTitle, CardText, CardSubtitle, ListGroup, UncontrolledCarousel, Toast } from 'reactstrap'
import {Link} from 'react-router-dom'
import { list } from '../../data/Data'// bu faqat xozirchalik 
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MdAttachMoney } from "react-icons/md";
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { useSpring, animated } from '@react-spring/web'


export default function RecentCard({houses}) {
  const [liked,setLiked]=useState(false)
  if(!houses||houses.fileUrls){
    return <div>Loading</div>// bu yerda lezy loading ishlatish kerak
  }
  console.log(houses)
  const handleLike=async(id)=>{
    if(!liked){
      // await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/${id}`)
      setLiked(!liked)
    }
  }

  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))

  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    })
  }

  // agar sotuv uchun va aranda uchun sozlarini o`zbekchaga tarjima qilish kerak bolsa su qiymati ozgartir
  return (
    <>
      {houses.length === 0 ? (
        <>
          <h3 className="heading_h1 text-center mt-5" style={{ textTransform: "initial" }}>Xech qanday elon mavjud emas!</h3>
        </>
      ) : (
        <div className="row mtop">
          {houses.map((house) => (
            <>
              <div className='col-sm-6 col-lg-4 mb-2 '>
                <Card className='shadow-lg border-0 p-2 mb-2 ronded' data-aos="flip-down" style={{...springs}}
                >
                  <UncontrolledCarousel
                    // items={[
                    //   {
                    //     altText: 'Slide 1',
                    //     key: 1,
                    //     src: 'https://picsum.photos/id/123/1200/600'
                    //   },
                    //   {
                    //     altText: 'Slide 2',
                    //     key: 2,
                    //     src: 'https://picsum.photos/id/456/1200/600'
                    //   },
                    //   {
                    //     altText: 'Slide 3',
                    //     key: 3,
                    //     src: 'https://picsum.photos/id/678/1200/600'
                    //   }
                    // ]}// bu yerda odiy rasm ishlatishni orniga backendan kelgan url ishlatish kerak
                      items={house.fileUrls.map((item,id) => ({
                          altText: `Slide ${id+1}`,
                          key: id,
                          src: item
                   }))}
                  />

                  <CardBody>
                    <div className="m-2 d-flex justify-content-between align-items-center">
                      <CardSubtitle
                        className="p-1 text-center w-25"
                        style={house.type === "rent" ? { background: "var(--p)", color: "var(--while)" } : { background: "rgba(255, 152, 0, 0.1)", color: "rgb(255, 152, 0)", fontWeight: 600 }}
                      >
                        For {house.type}
                      </CardSubtitle>
                      {/* <div className="d-grid">
                      <i  className={`bi bi-heart-fill text-muted ${liked?'text-danger':'text-muted'}`} onClick={()=>handleLike(house._id)} style={{color:'red', fontSize: "20px",cursor:'pointer' }}></i>
                      {house.Islike}
                      </div> */}
                    </div>
                    {/* <CardTitle tag="h5" className='' style={{ fontWeight: 600, letterSpacing: "0px" }}>
                        {val.name}
                      </CardTitle> */}
                    <div className="d-flex justify-content-start align-items-center">
                      <i class="bi bi-geo-alt-fill text-warning mb-1"></i>
                      <CardSubtitle
                        className="font-weight-light " style={{ color: "var(--p)", marginLeft: "5px"}}
                        tag="a"
                        rel="noopener noreferrer" 
                        target="_blank" 
                        href={`https://yandex.com/maps/?ll=${house.coordinates[1]},${house.coordinates[0]}&z=18&pt=${house.coordinates[1]},${house.coordinates[0]}`}
                      >
                        {house.viloyat + " " + house.shaxar + " " + house.tuman}
                      </CardSubtitle>
                    </div>
                    <CardText>
                      {house.comment}
                      {/* Some quick example text to build on the card title and make up the bulk of the card‘s content. */}
                    </CardText>
                    <div className="d-flex justify-content-between align-items-center">
                    <button className='btn btn-warning  ' >
                      {house.price}<MdAttachMoney />
                    </button>
                    <Link to={`/One`} state={{id:house._id}} className='btn btn-outline-dark ' >
                      Koproq korish
                    </Link>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </>
          ))}
        </div>
      )}
    </>

  )

}
