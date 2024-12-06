import React, { useState,useContext } from 'react';
import '../style.css';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
import {validatePhoneNumber} from '../validators'
import Cookies from 'js-cookie'
const SignUp = () => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '+9989',
        birthday: '',
        password: '',
        gender: '', // Changed from "male"  
    });
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // console.log(user)
        // if(!validatePhoneNumber(user.phone)){
        //     toast.error('Invalid phone number format. Please check your input.');
        //     return;
        // }
        try {
            const response = await axios.post(
                'http://localhost:3001/api/logup',
                { 
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    phone: user.phone,
                    birthday: user.birthday,    
                    gender: user.gender,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                const token = response.headers['x-auth-token'];
                if (token) {
                    Cookies.set('token', token, { expires: 7 })
                    // toast.success('Registration successful! Redirecting...');
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                } else {
                    // toast.error('Token not provided in response headers. Please try again.');
                }
            } else {
                // toast.error(response.data.message || 'User creation failed! Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                // toast.error(err.response.data.message || 'Something went wrong. Please try again.');
            } else {
                // toast.error('Network error. Please check your connection.');
            }
        }
    };

    return (
        <div className="row w-100 login_page h100">
            {/* <ToastContainer /> */}
            <div className="col-6 m-auto d-grid align-items-center">
                <div className="shadow p-3 mx-5 bg-dark rounded text-light">
                    <h3 className="text-center card__title text-warning pb-3">Sign Up</h3>
                    <Form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="firstName" className="mb-2">Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter your name"
                                        className="p-2"
                                        value={user.firstName}
                                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="lastName" className="mb-2">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="p-2"
                                        value={user.lastName}
                                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        required            
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="email" className="mb-2">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="p-2"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="phone" className="mb-2">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Enter your phone number"
                                        className="p-2"
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="birthday" className="mb-2">Birthday</Label>
                                    <Input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        className="p-2"
                                        value={user.birthday}
                                        onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="gender" className="mb-2">Gender</Label>
                                    <Input
                                        id="gender"
                                        name="gender"
                                        type="select"
                                        className="p-2"
                                        value={user.gender}
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col-12">
                                <FormGroup>
                                    <Label for="password" className="mb-2">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="p-2"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Button type="submit" className="bg-warning text-black border-0 px-4">
                                Submit
                            </Button>
                            <Link to="/signin" className="btn btn-outline-light px-4">
                                Sign In
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
