import NavBar from '../dashboard/navBar';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItemfrom from 'react-bootstrap/ListGroupItem';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from 'react-bootstrap';

export default function MyTeachings() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [teachings, setTeachings] = useState([]);
    const [teachingInfo, setInfo] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function SelectedTeaching() {
        // setInfo(teachings[id])
        handleShow()
    }

    async function TeachingsList() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/myTeaching/' + localStorage.getItem("user_id")).then((res) => {
                console.log(res.data)
                setTeachings(res.data)
            });
        } catch (error) { console.log(error.message) }
    }

    async function SaveEdit(){
        handleClose()
    }

    useEffect(() => {
        TeachingsList();

    }, [teachings.join(',')])

    return (
        <div>
            <NavBar />
            <div className="myTeachingsBody">
                <div className="myTeachingsList">
                    <ListGroup >
                        {teachings.map(teaching => (
                            <ListGroupItemfrom key={teaching.id}>
                                <div className="listItem">
                                    <div className="classInfo">
                                        <b>{Object.values(teaching.schoolClass.name)}</b>
                                    </div>
                                    <div className="subToClass">
                                        <Button value={teaching.id} className="w-100" type="submit" variant="dark" style={{ width: '100%', height: '75%' }}
                                            onClick={SelectedTeaching}>Update Info</Button>
                                    </div>
                                </div>
                            </ListGroupItemfrom>
                        ))}
                    </ListGroup>
                </div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={SaveEdit}>
                            <Form.Group id="theory_weight">
                                <Form.Label style={{ color: "white" }}>Theory Weight</Form.Label>
                                <Form.Control type="number" defaultValue='5' required />
                            </Form.Group>
                            <Form.Group id="lab_weight">
                                <Form.Label style={{ color: "white" }}>Lab Weight</Form.Label>
                                <Form.Control type="number" defaultValue='5' required />
                            </Form.Group>
                            <Form.Group id="theory_rule">
                                <Form.Label style={{ color: "white" }}>Theory Rule</Form.Label>
                                <Form.Control type="number" defaultValue='5'>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="lab_rule">
                                <Form.Label style={{ color: "white" }}>Lab Rule</Form.Label>
                                <Form.Control type="number" >
                                </Form.Control>
                            </Form.Group>
                            <Button disabled={loading}  type="submit" className="btn btn-light" style={{width:'100%'}}>
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}
