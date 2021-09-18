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

    const handleSelect = (e) => {
        var tmp = teachings.filter(object => object.id === Number(e))
        var selected = tmp[0]
        setSelectedGrading(signUps.filter(object => object.teaching.schoolClass.name === selected.schoolClass.name))
        setClass(selected.schoolClass.name)
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
                            <Form.Label style={{ marginRight:"2vh" }}>Lab Grade</Form.Label>
                            <Form.Control type="number" step="any" name="lab_grade" defaultValue={signUp.lab_score} style={{ width: '5%', height: '75%',marginRight:"2vh" }}></Form.Control>
                            <Form.Label style={{ marginRight:"2vh" }}>Theory Grade</Form.Label>
                            <Form.Control type="number" step="any" name="theory_grade" defaultValue={signUp.theory_score} style={{ width: '5%', height: '75%',marginRight:"2vh" }}></Form.Control>
                            <Form.Label style={{ marginRight:"2vh" }}>Final Grade</Form.Label>
                            <Form.Control type="number" step="any" name="final_grade" defaultValue={signUp.final_score} style={{ width: '5%', height: '75%',marginRight:"2vh" }}></Form.Control>
                            <Button value={signUp.id} className="w-20" type="button" variant="dark" style={{ width: '5%', height: '75%', marginLeft: '5%' }}
                            ><SaveIcon /></Button>

                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}
