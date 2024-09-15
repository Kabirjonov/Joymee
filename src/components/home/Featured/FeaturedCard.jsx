import React from 'react'
import Card from 'react-bootstrap/Card';
import h1 from '../../images/h1.png'
import { featured } from '../../data/Data';
import { Row, Col } from 'reactstrap'
export default function FeaturedCard() {
  return (
    <>
      <section className="featured">
        <div className="row mtop">
          {featured.map((item, index) => (
            <div className="col">
              <div key={index} className="box">
                <img src={require(`../../images/${item.cover}`)} alt="" />
                <h4>{item.name}</h4>
                <label>{item.total}</label>
              </div>
            </div>

          ))}

        </div>
      </section>



      {/* {featured.map((item, index) => (
          <div className="d-flex">
            <Card key={index} style={{ width: '15rem' }}>
              <Card.Img  variant="top" src={require(`../../images/${item.cover}`)} /> 
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.total}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))} */}

    </>
  )
}
