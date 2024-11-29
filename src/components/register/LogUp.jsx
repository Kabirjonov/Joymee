import React, { useState } from 'react';
import './style.css';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response=await axios.post(
                'http://localhost:3001/api/logup',
                { name: user.name, email: user.email, password: user.password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true, 
                }
            )
            console.log('response.header',response.headers);
            console.log("response",response);
            
            if(response.status === 200){
                const token = response.headers['x-auth-token']
                console.log('token:',token);
                
                if(token){
                    localStorage.setItem('token',token)
                    toast.success('Registration successful! Redirecting...');
                    setTimeout(() => {
                        navigate('/dashboard');
                    window.location.reload(); 

                    }, 200);
                } else {
                    toast.error('Token not provided in response headers. Please try again.');
                }
            }
            else {
                setUser({
                    name: '',
                    email: '',
                    password: '',
                });
                toast.error(response.data.message || 'User creation failed! Please try again.');
            }
        }catch(err){
           setUser({
                name: '',
                email: '',
                password: '',
            });
            console.error('Error:', err);
            if (err.response) {
                toast.error(err.response.data.message || 'Something went wrong. Please try again.');
            } else {
                toast.error('Network error. Please check your connection.');
            }
        }
    };

    return (
        <div className="row w-100  login_page h100">
            <ToastContainer />
            <div className="col-xl-4 col-lg-6 col-sm-6 d-grid align-items-center">
                <div className="shadow p-3 mx-5 bg-dark rounded text-light">
                    <h3 className="text-center card__title text-warning pb-3">Sign Up</h3>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="exampleName" className="mb-2">Name</Label>
                            <Input
                                id="exampleName"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="p-2"
                                value={user.name}
                                onChange={(e) => setUser({...user,name:e.target.value})}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail" className="mb-2">Email</Label>
                            <Input
                                id="exampleEmail"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="p-2"
                                value={user.email}
                                onChange={(e) => setUser({...user,email:e.target.value})}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword" className="mb-2">Password</Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="p-2"
                                value={user.password}
                                onChange={(e) => setUser({...user,password:e.target.value})}
                                required
                            />
                        </FormGroup>

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

export default LogIn;
