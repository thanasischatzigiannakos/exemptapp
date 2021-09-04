import NavBar from '../dashboard/navBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import "./userManagement.css"

export default function UserManagement() {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [userInfo, infoUpdate] = useState([]);
    const [update, setSuccess] = useState("")
    const email = useRef()
    const user_name = useRef()
    const first_name = useRef()
    const last_name = useRef()
    const password = useRef()
    const confPassword = useRef()


    const user = {
        email: userInfo.email,
        user_name: userInfo.user_name,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        type: userInfo.type,
        password: userInfo.password
    }

    async function handleSubmit() {
        try {
            setError("")
            setLoading(true)

        } catch (Error) {

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
            <NavBar></NavBar>
            <div className="updateForm">
                <Card style={{ width: '50%' , marginLeft:'25%', marginRight:'25%',marginTop:'10%', backgroundColor:'#00299c' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4" style={{ color: "white" }}>Personal Information</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {update && <Alert variant="success">{update}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label style={{ color: "white" }}>Email</Form.Label>
                                <Form.Control type="email" defaultValue={userInfo.email} required ref={email}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="username">
                                <Form.Label style={{ color: "white" }}>Username</Form.Label>
                                <Form.Control type="text" defaultValue={userInfo.user_name} ref={user_name} required />
                            </Form.Group>
                            <Form.Group id="firstname">
                                <Form.Label style={{ color: "white" }}>First Name</Form.Label>
                                <Form.Control type="name" defaultValue={userInfo.first_name} ref={first_name} required />
                            </Form.Group>
                            <Form.Group id="lastname">
                                <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
                                <Form.Control type="text" defaultValue={userInfo.last_name} ref={last_name} required />
                            </Form.Group>
                            <Form.Group id="passwd">
                                <Form.Label style={{ color: "white" }}>New Password</Form.Label>
                                <Form.Control type="password" defaultValue={userInfo.password} required ref={password}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="conf_passwd">
                                <Form.Label style={{ color: "white" }}>Confirm New Password</Form.Label>
                                <Form.Control type="password" required ref={confPassword}>
                                </Form.Control>
                            </Form.Group>
                            <Button disabled={loading}  type="submit" className="btn btn-light" style={{width:'100%'}}>
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
