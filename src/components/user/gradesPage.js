import NavBar from '../dashboard/navBar';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItemfrom from 'react-bootstrap/ListGroupItem';
import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import passed from './checked.png';
import failed from './fail.png';

import "./gradesPage.css";


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


    }, [userClasses.join(',')])

    return (

        <div className="gradesComp">
            <NavBar />
            <h2>My Grades</h2>
            <div className="gradesGreater">
                
                <ListGroup >
                    {userClasses.map(classes => (
                        <ListGroupItemfrom key={classes.id}>
                        <h4>{classes.teaching.schoolClass.name}</h4>
                            <div className="gradesList">
                                
                                <div className="signUpgrades">{classes.theory_score === null ? <p>The theory grades for this class have not been published</p> :<b>Theory Grade:{classes.theory_score} </b>}</div>
                                <div className="signUpgrades">{classes.lab_score === null ? <p>The lab grades for this class have not been published</p> : <b>Lab Grade:{classes.lab_score} </b>}</div>
                                <div className="signUpgrades">{classes.final_score === null ? <p>The final grades for this class  have not been published</p> : <b>Final Grade:{classes.final_score} </b>}</div>
                                <div className="signUpgrades">{classes.final_score >=5 ? <img className="imgGrade" src={passed} alt="You passed the class"></img> : <img className="imgGrade" src={failed} alt="You have failed the class"></img>}</div>
                                
                                
                                
                                
                            </div>
                        </ListGroupItemfrom>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}
