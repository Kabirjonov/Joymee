import React from 'react'
import { footer } from '../../data/Data'
import './footer.css'
const Footer = () => {
    return (
        <>
            <section className="footerContact p-3">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="Footer__text">
                            <h1>Do You Have Questions?</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className='d-flex align-items-center'>
                        <button className="btn footer__btn p-3">Contact Us Today</button>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img src={require('../../images/logo.png')} className='footer__img' alt="" />
                            <h3 className='mt-2 mb-3'>Do You Need Help With Anything?</h3>
                            <p className='p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolores corrupti earum voluptatum perspiciatis accusamus?</p>
                            <div className="d-flex">
                                <input type="text" className='w-100 rounded border-0 p-2' placeholder='Email Address'/>
                                <button placeholder='Email Address' className="btn btn-warning text-dark">Submit</button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                {footer.map((val) => (
                                    <div className='col'>
                                        <h3 className='footer__h3'>{val.title}</h3>
                                        <ul>
                                            {val.text.map((item)=>(
                                                <li className='p text-left footer__li'>{item.list}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </footer>
            <div className="text-center p-3" style={{background:'var(--blackblue)',borderTop: '2px solid var(--p)'}}>
                <span className='p'>© 2021 RentUP. Designd By GorkCoder.
                </span>
            </div>
        </>
    )
}
export default Footer