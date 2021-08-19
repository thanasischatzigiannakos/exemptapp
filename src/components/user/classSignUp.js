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

    async function AlreadySignedUp(){
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/SignedUp/' + localStorage.getItem("user_id")).then((res) => {
                classesUpdate(res.data)
                console.log(res.data)
            });
        } catch (error) { console.log(error.message) }



    }




    useEffect(() => {
        Classes();
        AlreadySignedUp();


    }, [listTeachings.join(',')],[userClasses.join(',')])
    
    return (
        <div>
        <NavBar></NavBar>
         <h2>Sign Up to Available Classes</h2>
         <div>
             {listTeachings.map(teaching => (
                 <li key={teaching.id}>{Object.values(teaching.schoolClass.name).join(' ')}</li>
             ))}
         </div>

        </div>
    )
}
