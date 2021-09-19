import ProfNavBar from '../navigation/profNavBar';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import "../user/userManagement.css"

export default function ProfManagement() {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [userInfo, infoUpdate] = useState([]);
    const [update, setSuccess] = useState("")



    const user = Object.freeze({
        email: userInfo.email,
        user_name: userInfo.user_name,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password
    })
    const [updatedInfo, setUpdatedInfo] = useState(user)

    const handleChange = (e) => {
        setUpdatedInfo({
            ...updatedInfo,
            // Trimming any whitespace
            [e.currentTarget.name]: e.currentTarget.value.trim(),
        });
        console.log(updatedInfo)
    };

    async function handleSubmit() {
        try {

            console.log(updatedInfo)
            SaveUserEdit();

        } catch (Error) {
            console.log(Error.message)
        }

    }
    async function SaveUserEdit() {
       
        try {
            axiosInstance.put('user/activateUser/' + localStorage.getItem('user_id') +'/',
                {
                    email: updatedInfo.email,
                    user_name: updatedInfo.user_name,
                    first_name: updatedInfo.first_name,
                    last_name: updatedInfo.last_name,
                    password: updatedInfo.password
                }).then((res) => {
                    console.log(res.data)
                });

        } catch (ex) {
            console.log(ex.message)
            setError(ex.message)
        }
    }

    async function UserInfo() {
        console.log('Fetching...')
        try {
            axiosInstance.get('user/userInfo/' + localStorage.getItem("user_id")).then((res) => {
                infoUpdate(res.data)
                console.log(res.data)
            });
        } catch (error) { console.log(error.message) }
    }


    useEffect(() => {
        UserInfo();


    }, [])
    return (
        <div className="updateInfo">
            <ProfNavBar />
            <div className="updateForm">
                <Card style={{ width: '50%', marginLeft: '25%', marginRight: '25%', marginTop: '10%', backgroundColor: '#343a40' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4" style={{ color: "white" }}>Personal Information</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {update && <Alert variant="success">{update}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label style={{ color: "white" }}>Email</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleChange} defaultValue={userInfo.email} required >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="username">
                                <Form.Label style={{ color: "white" }}>Username</Form.Label>
                                <Form.Control type="text" name="user_name" onChange={handleChange} defaultValue={userInfo.user_name} required />
                            </Form.Group>
                            <Form.Group id="firstname">
                                <Form.Label style={{ color: "white" }}>First Name</Form.Label>
                                <Form.Control type="name" name="first_name" onChange={handleChange} defaultValue={userInfo.first_name} required />
                            </Form.Group>
                            <Form.Group id="lastname">
                                <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
                                <Form.Control type="text" name="last_name" onChange={handleChange} defaultValue={userInfo.last_name} required />
                            </Form.Group>
                            <Form.Group id="passwd">
                                <Form.Label style={{ color: "white" }}>New Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={handleChange} defaultValue={userInfo.password} required >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="conf_passwd">
                                <Form.Label style={{ color: "white" }}>Confirm New Password</Form.Label>
                                <Form.Control type="password" required >
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" className="btn btn-light" style={{ width: '100%' }}>
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
