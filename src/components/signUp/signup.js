import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './signup.css'



export default function Signup() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        type: 'STUDENT',
        am: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`user/createStudent/`, {
                user: {
                    email: formData.email,
                    user_name: formData.username,
                    password: formData.password,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    type: 'STUDENT',
                },
                am: formData.am,
                sign_up_date: '2021'
            })
            .then((res) => {
                history.push('/login');
                console.log(res);
                console.log(res.data);
            });
    };


    return (
        <div class="signUpStudent">
            <div class="studentForm">
                <h2>Student Registration Form</h2>
                <Form onSubmit={handleSubmit} style={{ width: "35%", marginLeft: "30%", marginTop: "5%" }} >
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Email</Form.Label>
                        <Form.Control type="email" id="email" name="email" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Username</Form.Label>
                        <Form.Control maxLength="40" required id="username" name="username" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Name</Form.Label>
                        <Form.Control maxLength="40" required id="first_name" name="first_name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
                        <Form.Control maxLength="40" required id="last_name" name="last_name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>AM</Form.Label>
                        <Form.Control maxLength="40" required id="am" name="am" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ color: "white" }}>Password</Form.Label>
                        <Form.Control type="password" required id="password" name="password" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label style={{ color: "white" }}>Password Confirmation</Form.Label>
                        <Form.Control type="password" required />
                    </Form.Group>
                    <Button className="w-100" type="submit" variant="light">
                        Sign Up
                    </Button>
                    <h5>Already have an account? </h5>
                    <Link to="/login"><Button variant="outline-light" style={{ width: "100%" }}>
                        Sign In To Your Account
                    </Button></Link>
                </Form>
            </div>



        </div>






    )
}
