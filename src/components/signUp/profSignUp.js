import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './signup.css'




export default function ProfSignUp() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        type: 'PROFESSOR',
        rank: '',


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
            .post(`user/createProfessor/`, {
                user: {
                    email: formData.email,
                    user_name: formData.username,
                    password: formData.password,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    type: 'PROFESSOR'
                },rank: formData.rank


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
                <Form style={{ width: "35%", marginLeft: "30%", marginTop: "5%" }} >
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Email</Form.Label>
                        <Form.Control type="email" id="email" name="email" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Username</Form.Label>
                        <Form.Control id="username" name="username" maxLength="40" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Name</Form.Label>
                        <Form.Control id="first_name" name="first_name"  maxLength="40" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group  >
                        <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
                        <Form.Control id="last_name" name="last_name" maxLength="40" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ color: "white" }}>Select your Position</Form.Label>
                        <Form.Control as="select" id="rank" name="rank" onChange={handleChange} >
                            <option value="PROFESSOR">Professor</option>
                            <option value="ASSOCIATE_PROFESSOR">Associate Professor</option>
                            <option value="ASSISTANT_PROFESSOR">Assistant Professor</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group  >
                        <Form.Label style={{ color: "white" }}>Password</Form.Label>
                        <Form.Control id="password" name="password" type="password" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{ color: "white" }}>Password Confirmation</Form.Label>
                        <Form.Control id="password-confirm" type="password" required />
                    </Form.Group>
                    <Button className="w-100" type="submit" variant="light" onClick={handleSubmit} >
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
