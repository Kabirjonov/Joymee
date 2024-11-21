import React from 'react';
import './style.css'
import men from '../images/askMen.png'
import { FormGroup, Form, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
const LogIn = () => {
    return (
        <>
            <div className="row login_page ">
                <div className="col-xl-4 col-lg-6 col-sm-6 align-self-center">
                    <div className="shadow p-3  mx-5 bg-dark rounded text-light">
                        <h3 className="text-center card__title text-warning pb-3">Sign Up</h3>
                        {/* <form>
                            <label>Name:</label>
                            <input type="text" placeholder='Name'className='' />
                        </form> */}
                        <Form>
                        <FormGroup>
                                <Label for="exampleEmail">
                                    Name
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="name"
                                    // placeholder="with a placeholder"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Email
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    // placeholder="with a placeholder"
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">
                                    Password
                                </Label>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    // placeholder="password"
                                    type="password"
                                />
                            </FormGroup>
                            <div className="mt-4">
                                <Button className='bg-warning text-black border-0'>
                                    Submit
                                </Button>
                                <Link to={'/signin'} className='btn btn-light border mx-3 border-0'>Sign In</Link>

                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LogIn;
