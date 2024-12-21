import React, { useState } from 'react';
import '../style.css';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { validatePhoneNumber } from '../validators'
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
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        if (!validatePhoneNumber(user.phone)) {
            toast.error('Invalid phone number format. Please check your input.');
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/logup`,user,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            const token = response.headers['x-auth-token'];

            if (response.status === 200&&token) {
                    Cookies.set('token', token, { expires: 7 })
                    toast.success(response.data.message || 'Registration successful! Redirecting...');
                    setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                toast.error(response.data.message || 'User creation failed! Please try again.');
            }
        }catch (err) {
            toast.error(err.response?.data?.message || 'Network error');
          }
    };
    return (
        <div className="row w-100 login_page h00">
            <ToastContainer />
            <div className="col-6 m-auto d-grid align-items-center FormLogupPage">
                <div className="shadow mx-5 p-3 bg-dark rounded text-light">
                    <h3 className="text-center mb-2 card__title text-warning">Sign Up</h3>
                    <Form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <FormGroup>
                                    <Label for="firstName" className="mb-2 signUp">Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter your name"
                                        className="p-2 signUp"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-6">
                                <FormGroup>
                                    <Label for="lastName" className="mb-2 signUp">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="p-2 signUp"
                                        value={user.lastName}
                                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-6">
                                <FormGroup>
                                    <Label for="email" className="mb-2 signUp">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="p-2 signUp"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-6">
                                <FormGroup>
                                    <Label for="phone" className="mb-2 signUp">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Enter your phone number"
                                        className="p-2 signUp"
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-6">
                                <FormGroup>
                                    <Label for="birthday" className="mb-2 signUp">Birthday</Label>
                                    <Input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        className="p-2 signUp"
                                        value={user.birthday}
                                        onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-6">
                                <FormGroup>
                                    <Label for="gender" className="mb-2 signUp">Gender</Label>
                                    <Input
                                        id="gender"
                                        name="gender"
                                        type="select"
                                        className="p-2 signUp"
                                        value={user.gender}
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="man">Man</option>
                                        <option value="woman">Woman</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col-lg-12">
                                <FormGroup>
                                    <Label for="password" className="mb-2 signUp">Password</Label>

                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="p-2 signUp"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={() => setShowPass(!showPass)} />
                                    <label class="form-check-label" for="exampleCheck1">Show password</label>
                                </div>
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
