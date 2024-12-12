import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { CardBody, CardTitle, CardText, CardSubtitle, ListGroup, UncontrolledCarousel } from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

import { list } from '../../data/Data'// bu faqat xozirchalik 
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MdAttachMoney } from "react-icons/md";


export default function RecentCard() {
  const [houses, setHouses] = useState([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/blog')
        setHouses(response.data)
        console.log(response.data)
      } catch (err) {
      }
    }
    fetch()
  }, [])
  var SU = "For Sale"
  // agar sotuv uchun va aranda uchun sozlarini o`zbekchaga tarjima qilish kerak bolsa su qiymati ozgartir
  return (
    <>
      {houses.length === 0 ? (
        <>
          <h3 className="heading_h1 text-center mb-2" style={{ textTransform: "initial" }}>Xech qanday elon mavjud emas!</h3>
        </>
      ) : (
        <div className="row mtop">
          {houses.map((house) => (
            <>
              <div className='col-sm-6 col-lg-4 mb-2 '>
                <Card className='shadow-lg border-0 p-2 mb-2 ronded '
                >
                  <UncontrolledCarousel
                    items={[
                      {
                        altText: 'Slide 1',
                        key: 1,
                        src: 'https://picsum.photos/id/123/1200/600'
                      },
                      {
                        altText: 'Slide 2',
                        key: 2,
                        src: 'https://picsum.photos/id/456/1200/600'
                      },
                      {
                        altText: 'Slide 3',
                        key: 3,
                        src: 'https://picsum.photos/id/678/1200/600'
                      }
                    ]}
                  />

                  <CardBody>
                    <div className="m-2 d-flex justify-content-between align-items-center">
                      <CardSubtitle
                        className="p-1 text-center w-25"
                        style={house.type === "rent" ? { background: "var(--p)", color: "var(--while)" } : { background: "rgba(255, 152, 0, 0.1)", color: "rgb(255, 152, 0)", fontWeight: 600 }}
                      >
                        For {house.type}
                      </CardSubtitle>
                      <div className="m-3"></div>
                      <i className="bi bi-heart-fill text-muted" style={{ fontSize: "20px" }}></i>
                    </div>
                    {/* <CardTitle tag="h5" className='' style={{ fontWeight: 600, letterSpacing: "0px" }}>
                        {val.name}
                      </CardTitle> */}
                    <div className="d-flex justify-content-start align-items-center">
                      <i class="bi bi-geo-alt-fill text-warning mb-1"></i>
                      <CardSubtitle
                        className="font-weight-light " style={{ color: "var(--p)", marginLeft: "5px" }}
                        tag="h6"
                      >
                        {house.viloyat + " " + house.shaxar + " " + house.tuman}/
                        {/* bu yerga xam locationi bosganda yandex locationga olib otish kerak */}
                      </CardSubtitle>
                    </div>
                    <CardText>
                      {/* {house.comment} hozircha xunuk koringani uchun ochirib qoydim*/}
                      Some quick example text to build on the card title and make up the bulk of the card‘s content.
                    </CardText>
                    <div className="d-flex justify-content-between align-items-center">
                    <button className='btn btn-warning  ' >
                      {house.price}<MdAttachMoney />
                    </button>
                    <Link to={"/Onehouse"} className='btn btn-outline-dark ' >
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
