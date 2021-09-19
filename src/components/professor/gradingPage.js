import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import ProfNavBar from '../navigation/profNavBar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import SaveIcon from '@material-ui/icons/Save';
import './gradingPage.css';
import { InputLabel } from '@material-ui/core';
import FormGroup from 'react-bootstrap/esm/FormGroup';

export default function GradingPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [teachings, setTeachings] = useState([]);
    const [signUps, setSignUps] = useState([]);
    const [selectedToGrade, setSelectedGrading] = useState([]);
    const [selectedClass, setClass] = useState("");
    const [theory, setTheory] = useState(0);
    const [lab, setLab] = useState(0);


    async function TeachingsList() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/myTeaching/' + localStorage.getItem("user_id")).then((res) => {
                console.log(res.data)
                setTeachings(res.data)
            });
        } catch (error) { console.log(error.message) }
    }

    async function SignUpsList() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/SignUpList/').then((res) => {
                console.log(res.data)
                setSignUps(res.data)
            });
        } catch (error) { console.log(error.message) }
    }

    async function UpdateUI(classCurrentlyGrading) {
        console.log(classCurrentlyGrading)

        try { SignUpsList(); } catch (ex) {
            console.log(ex.message)
        } finally {
            console.log("I am here")
            console.log(signUps)
            setSelectedGrading(signUps.filter(object => object.teaching.schoolClass.name === classCurrentlyGrading))
        }

    }

    async function UpdateGradesOfStudent(thisOne, signUpID) {

        try {
            axiosInstance.put('classes/editSignUp/' + signUpID + '/',
                {
                    id: thisOne.id,
                    teaching: {
                        id: thisOne.teaching.id,
                        schoolClass: {
                            name: thisOne.teaching.schoolClass.name,
                            id: thisOne.teaching.schoolClass.id,
                            description: thisOne.teaching.schoolClass.description
                        },
                        class_year: thisOne.teaching.class_year,
                        semester: thisOne.teaching.semester,
                        professor: {
                            user: {
                                id: thisOne.teaching.professor.user.id,
                                first_name: thisOne.teaching.professor.user.first_name,
                                last_name: thisOne.teaching.professor.user.last_name
                            }
                        },
                        theory_weight: thisOne.teaching.theory_weight,
                        lab_weight: thisOne.teaching.lab_weight,
                        theory_rule: thisOne.teaching.theory_rule,
                        lab_rule: thisOne.teaching.lab_rule
                    },
                    student: {
                        user: {
                            id: thisOne.student.user.id,
                            first_name: thisOne.student.user.first_name,
                            last_name: thisOne.student.user.last_name
                        }
                    },
                    theory_score: thisOne.theory_score,
                    lab_score: thisOne.lab_score,
                    final_score: thisOne.final_score

                }).then((res) => {
                    console.log(res)
                    UpdateUI(thisOne.teaching.schoolClass.name)
                });

        } catch (ex) {
            console.log(ex.message)

        } finally {
            console.log("Updated")

        }


        setClass(thisOne.teaching.schoolClass.name)

    }

    const handleSelect = (e) => {
        var tmp = teachings.filter(object => object.id === parseInt(e))
        var selected = tmp[0]
        setSelectedGrading(signUps.filter(object => object.teaching.schoolClass.name === selected.schoolClass.name))
        setClass(selected.schoolClass.name)
    }

    const handleUpdate = (e) => {
        const thisValue = e.currentTarget.value
        console.log(thisValue)
        var y
        var thisOne
        for (y = 0; y < signUps.length; y++) {
            if (signUps[y].id === parseInt(thisValue)) {
                thisOne = signUps[y]
                console.log(thisOne)
            }
        }

        console.log(thisOne)
        if (thisOne.theory_score !== null && thisOne.lab_score !== null) {
            thisOne.final_score = thisOne.theory_score * thisOne.teaching.theory_weight + thisOne.lab_score * thisOne.teaching.lab_weight
        }
        console.log(thisOne.final_score)
        UpdateGradesOfStudent(thisOne, parseInt(thisValue))

    }

    const handleLabChange = (e) => {
        console.log(e.target.id)
        console.log(e.target.value)
        var thisOne = signUps.filter(x => x.id === parseInt(e.target.id))
        console.log(thisOne)
        var thatOne = thisOne[0]
        thatOne.lab_score = e.target.value
        var x
        for (x = 0; x < signUps.length; x++) {
            if (signUps[x].id === parseInt(e.target.id)) {
                signUps[x].lab_score = parseInt(e.target.value)
                console.log(signUps[x])
            }
        }

    }

    const handleTheoryChange = (e) => {
        console.log(e.target.id)
        console.log(e.target.value)
        var thisOne = signUps.filter(x => x.id === parseInt(e.target.id))
        console.log(thisOne)
        var thatOne = thisOne[0]
        thatOne.theory_score = e.target.value
        var x
        for (x = 0; x < signUps.length; x++) {
            if (signUps[x].id === parseInt(e.target.id)) {
                signUps[x].theory_score = parseInt(e.target.value)
                console.log(signUps[x])
            }
        }

    }



    useEffect(() => {
        TeachingsList();
        SignUpsList();

    }, [teachings.join(',')], [signUps.join(',')])
    return (
        <div className="mainGradingDiv">
            <ProfNavBar />
            <DropdownButton id="myclasses-dropdown" variant="secondary" title="Select a Class to Start Grading" onSelect={handleSelect}>
                {teachings.map(teaching => (
                    <Dropdown.Item key={teaching.id} eventKey={teaching.id}>{teaching.schoolClass.name}</Dropdown.Item>
                ))}
            </DropdownButton>
            <div className="informationDiv">


                <h2>{selectedClass}</h2>
                {selectedToGrade.map(signUp => (
                    <div className="gradingDiv">
                        <div className="gradingSpace" key={signUp.id}>
                            <div className="userAM"><b>{signUp.student.am}</b></div>
                            <div className="gradingControls">
                                <Form.Label style={{ marginRight: "2vh" }}>Lab Grade</Form.Label>
                                <Form.Control type="number" id={signUp.id} onChange={handleLabChange} step="any" name="lab_grade" defaultValue={signUp.lab_score} style={{ width: '25%', height: '75%' }}></Form.Control>
                            </div>
                            <div className="gradingControls">
                                <Form.Label style={{ marginRight: "2vh" }}>Theory Grade</Form.Label>
                                <Form.Control type="number" id={signUp.id} onChange={handleTheoryChange} step="any" name="theory_grade" defaultValue={signUp.theory_score} style={{ width: '25%', height: '75%' }}></Form.Control>
                            </div>
                            <div className="gradingControls">
                                <Form.Label style={{ marginRight: "2vh" }}>Final Grade</Form.Label>
                                <Form.Control type="number" step="any" name="final_grade" readOnly="True" value={signUp.final_score} style={{ width: '25%', height: '75%' }}></Form.Control>
                            </div>
                            <div className="gradingControls">
                                <Button value={signUp.id} onClick={handleUpdate} className="w-20" type="button" variant="dark" style={{ width: '25%', height: '75%'}}
                                ><SaveIcon /></Button>
                            </div>





                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}
