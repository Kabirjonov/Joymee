import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import './hero.css'
import Heading from '../../common/Heading'
export default function Hero() {
  return (
    <>
      <section className='hero' style={{height:'100vh'}}>
        <div className='container'>
          <Heading title="search your next home" subtitle="Lorem ipsum dolor sit amet laudantium optio quae repudiandae accusamus. Hic?"/>
          <form action='' className='d-flex hero__form'>
            <Row className='hero__form-row'>
              <Col className='hero__form-box'>
                <span className="hero__form-span">City/Street</span>
                <input className='hero__form-input' type='text' placeholder='Location' />
              </Col>
              <Col className='hero__form-box for-after-border'>
                <span className="hero__form-span">Property type</span>
                <input className='hero__form-input' type='text' placeholder='Property type' />
              </Col>
              <Col className='hero__form-box for-after-border'>
                <span className="hero__form-span">Price Range</span>
                <input className='hero__form-input' type='text' placeholder='Price Range' />
              </Col>
              <Col className='hero__form-box for-after-border'>
                <div className='hero__form-div d-flex align-items-center'>
                  <h5 className='hero__form-h5'>Advance Filter</h5>
                  <button className='btn btn-warning'><i className='bi bi-search'></i></button>
                </div>
              </Col>
            </Row>


          </form>
        </div>
      </section>
    </>
  )
}
