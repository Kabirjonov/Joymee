import React, { useState } from 'react';
import '../style.css';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Axios kutubxonasini import qilish
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie'

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[showPass,setShowPass]=useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const token = response.headers['x-auth-token']; // Tokenni headerdan olish
                if (token) {
                    toast.success('Registration successful! Redirecting...');
                    Cookies.set('token', token, { expires: 7 })
                    setTimeout(() => {
                        navigate('/profile'); // Dashboard sahifasiga o'tish
                    }, 2000); // Toast xabaridan keyin vaqt berish
                } else {
                    toast.error('User creation failed! Please try again.');
                }
            }
            // if (response.status === 200) {
            //     navigate('/dashboard');
            // } else {
            //     toast.error(response.data.message || 'User creation failed! Please try again.');
            // }
        } catch (error) {
            console.error('Error connecting to the server:', error);
            if (error.response) {
                toast.error(error.response.data || 'Something went wrong. Please try again.');
            } else {
                toast.error('Network error. Please check your connection.');
            }
        }
    };
    return (
        <>
            <div className="row login_page h100 w-100">
                <div className="col-xl-4 col-lg-6 col-sm-6 align-self-center">
                    <div className="shadow p-3 mx-5 bg-dark rounded text-light">
                        <h3 className="text-center card__title text-warning pb-3">Sign In</h3>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail" className="mb-2">Email</Label>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    className="p-2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}  // emailni yangilash
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword" className="mb-2">Password</Label>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    type={showPass?'text':'password'}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="p-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}  // parolni yangilash
                                    required
                                />
                            </FormGroup>
                            <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1"onClick={()=>setShowPass(!showPass)} />
                                        <label class="form-check-label" for="exampleCheck1">Show password</label>
                                    </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <button type="submit" className="btn btn-warning btn-sm">
                                    Submit
                                </button>
                                <Link to="/signup" className="btn btn-outline-light btn-sm px-4">
                                    Sign Up
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        <ToastContainer />

        </>
    );
};

export default LogIn;