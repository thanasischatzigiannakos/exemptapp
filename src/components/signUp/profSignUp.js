import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card'
import './signup.css'




export default function ProfSignUp() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
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
            .post(`user/create/`, {
                email: formData.email,
                user_name: formData.username,
                password: formData.password,
            })
            .then((res) => {
                history.push('/login');
                console.log(res);
                console.log(res.data);
            });
    };


    return (
        <div class="signUpProf">
            <div class="profForm">
                <h2>Teaching Staff Registration Form</h2>
                <Form onSubmit={handleSubmit} style={{ width: "35%", marginLeft: "30%", marginTop: "5%" }} >
                    <Form.Group id="email">
                        <Form.Label style={{ color: "white" }}>Email</Form.Label>
                        <Form.Control type="email" required />
                    </Form.Group>
                    <Form.Group id="username">
                        <Form.Label style={{ color: "white" }}>Username</Form.Label>
                        <Form.Control maxLength="40" required />
                    </Form.Group>
                    <Form.Group id="first_name">
                        <Form.Label style={{ color: "white" }}>Name</Form.Label>
                        <Form.Control maxLength="40" required />
                    </Form.Group>
                    <Form.Group id="last_name">
                        <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
                        <Form.Control maxLength="40" required />
                    </Form.Group>
                    <Form.Group controlId="position">
                        <Form.Label>Select your Position</Form.Label>
                        <Form.Control as="select">
                            <option value="PROFESSOR">Professor</option>
                            <option value="ASSOCIATE_PROFESSOR">Associate Professor</option>
                            <option value="ASSISTANT_PROFESSOR">Assistant Professor</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label style={{ color: "white" }}>Password</Form.Label>
                        <Form.Control type="password" required />
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
