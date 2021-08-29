import NavBar from '../dashboard/navBar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItemfrom from 'react-bootstrap/ListGroupItem';
import Accordion from 'react-bootstrap/Accordion'
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import "./classSignUp.css";


export default function ClassSignUp() {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [userClasses, classesUpdate] = useState([]);
    const [listTeachings, teachingsUpdate] = useState([]);

    async function Classes() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/teachingList/').then((res) => {
                teachingsUpdate(res.data)
                console.log(res.data)
            });
        } catch (error) { console.log(error.message) }


    }

    async function AlreadySignedUp() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/SignedUp/' + localStorage.getItem("user_id")).then((res) => {
                classesUpdate(res.data)
                console.log(res.data)
            });
        } catch (error) { console.log(error.message) }



    }

    const handleRegister = (e) => {
        try {
            axiosInstance
                .post(`classes/createSignUp/`, {
                    teaching: {
                        id: e.target.value
                    },
                    student: {
                        user: localStorage.getItem("user_id")
                    },
                })
                .then((res) => {
                    console.log(res)
                    AlreadySignedUp()

                });
        } catch (error) { console.log(error.message) }

    };

    const handleUnregister = (e) => {
        console.log(e.target.value)
        const thisTeaching= userClasses.find(object => {return object.teaching.id = e.target.value})
        console.log(thisTeaching.id)
        try {
            axiosInstance.delete('classes/deleteSignUp/' + thisTeaching.id).then((res) => {
                AlreadySignedUp()
            });
        } catch (error) { console.log(error.message) }

    };




    useEffect(() => {
        Classes();
        AlreadySignedUp();


    }, [listTeachings.join(',')], [userClasses.join(',')])

    return (
        <div>
            <NavBar></NavBar>
            <h2>Sign Up to Available Classes</h2>
            <div className="classesListed">
                <ListGroup >
                    {listTeachings.map(teaching => (
                        <ListGroupItemfrom key={teaching.id}>
                            <div className="listItem">
                                <div className="classInfo">
                                    <b>{Object.values(teaching.schoolClass.name)}</b>
                                    <p>Professor: {Object.values(teaching.professor.user.first_name)} {Object.values(teaching.professor.user.last_name)}.</p>
                                    <p>{Object.values(teaching.schoolClass.description)} .The final grade for the class is calculated as follows :
                                        {teaching.theory_weight * 100}% from the theory score and {teaching.lab_weight * 100}% from the lab score.</p>

                                </div>
                                <div className="subToClass">
                                    {userClasses.filter(e => e.teaching.schoolClass.id === teaching.schoolClass.id).length === 0 ? 
                                    <Button value={teaching.id} className="w-100" type="submit" variant="dark" style={{ width: '100%', height: '75%' }}
                                        onClick={handleRegister}>Register to Class</Button>
                                        : <Button value={teaching.id} 
                                        className="w-100" type="submit" variant="dark" style={{ width: '100%', height: '75%' }} onClick={handleUnregister}>Unregister</Button>
                                    }
                                </div>
                            </div>
                        </ListGroupItemfrom>
                    ))}
                </ListGroup>

            </div>

        </div>
    )
}
