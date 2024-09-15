import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardBody, CardTitle, CardText, CardSubtitle, ListGroup } from 'reactstrap'
import { list } from '../../data/Data'
export default function RecentCard() {
  var SU = "For Sale"
  // agar sotuv uchun va aranda uchun sozlarini o`zbekchaga tarjima qilish kerak bolsa su qiymati ozgartir
  return (

    <>
      <div className="row mtop">
        {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val
          return (
            <div className='col-sm-6 col-lg-4 mb-2'>
               <Card
              className='shadow-lg border-0 p-2 mb-2 ronded '
            >
              <img
                alt="Sample"
                src="https://picsum.photos/300/200"
                className='recent__img'
              />
              <CardBody>
                <div className="m-2 d-flex justify-content-between align-items-center">
                  <CardSubtitle
                    className="p-1 text-center w-25"
                    style={{
                      background: category == SU ? "var(--p)" : "rgba(255, 152, 0, 0.1)",
                      color: category == SU ? "var(--while)" : "rgb(255, 152, 0)", fontWeight: 600
                    }}
                  >
                    {val.category}
                  </CardSubtitle>
                  <div className="m-3"></div>
                  <i className="bi bi-heart-fill text-muted" style={{ fontSize: "20px" }}></i>
                </div>
                <CardTitle tag="h5" className='' style={{ fontWeight: 600, letterSpacing: "0px" }}>
                  {val.name}
                </CardTitle>
                <div className="d-flex justify-content-start align-items-center">
                <i class="bi bi-geo-alt-fill text-warning mb-1"></i>
                  <CardSubtitle
                    className="font-weight-light " style={{ color: "var(--p)",marginLeft:"5px"}}
                    tag="h6"
                  >
                    {val.location}
                  </CardSubtitle>
                </div>
                {/* <CardText>
                  Some quick example text to build on the card title and make up the bulk of the card‘s content.
                </CardText> */}
                <Button className='border-0 mt-3' style={{ background: "var(--logoColor)", color: "var(--black)", fontSize: "20px",fontWeight:600 }}>
                  {val.price}
                </Button>
              </CardBody>
            </Card>
            </div>
         
          )
        })}
      </div>
    </>
  )
}
