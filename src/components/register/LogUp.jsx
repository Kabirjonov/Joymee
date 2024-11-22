import React, { useState } from 'react';
import './style.css';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/logup', { name, email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                toast.error(response.data.message || 'User creation failed! Please try again.');
            }
        } catch (error) {
            console.error('Error connecting to the server:', error);
            if (error.response) {
                // Server returned an error
                toast.error(error.response.data || 'Something went wrong. Please try again.');
            } else {
                // Network error or server down
                toast.error('Network error. Please check your connection.');
            }
        }
    };

    return (
        <div className="row login_page">
            <ToastContainer />
            
            <div className="col-xl-4 col-lg-6 col-sm-6 d-grid align-items-center  ">
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
            {/* ToastContainer ni qo‘shishni unutmang */}
        </div>
    );
}

export default LogIn;
