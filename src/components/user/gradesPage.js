import NavBar from '../dashboard/navBar';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItemfrom from 'react-bootstrap/ListGroupItem';
import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';


export default function GradesPage() {
    const [userClasses, classesUpdate] = useState([]);

    async function AlreadySignedUp() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/SignedUp/' + localStorage.getItem("user_id")).then((res) => {
                classesUpdate(res.data)
                console.log(res.data)
            });
        } catch (error) { console.log(error.message) }



    }

    useEffect(() => {
        AlreadySignedUp();


    },[userClasses.join(',')])
    
    return (
        
        <div>
        <NavBar/>
        <ListGroup >
                    {userClasses.map(classes => (
                        <ListGroupItemfrom key={classes.id}>
                            <div className="gradesList">
                            <h4>{classes.teaching.schoolClass.name}</h4>
                            {classes.theory_score===null? <p>The theory grades for this class have not been published</p>: <b>Theory Grade:{classes.theory_score} </b>}
                            {classes.lab_score===null? <p>The lab grades for this class have not been published</p>: <b>Lab Grade:{classes.lab_score} </b>}
                            {classes.final_score===null? <p>The final grades for this class  have not been published</p>: <b>Final Grade:{classes.final_score} </b>}
                            </div>
                           
                        </ListGroupItemfrom>
                    ))}
                </ListGroup>
        
            
        </div>
    )
}