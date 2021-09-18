import ProfNavBar from '../navigation/profNavBar';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItemfrom from 'react-bootstrap/ListGroupItem';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import EditIcon from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import './myTeachings.css';

export default function MyTeachings() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [teachings, setTeachings] = useState([]);
    const [teachingInfo, setInfo] = useState([]);
    const [show, setShow] = useState(false);
    const initialInfo = Object.freeze({
        id:0,
        schoolClass:{
            id:0
        },
        class_year:0,
        semester: 'SUMMER',
        professor:{
            user:0
        },
        theory_weight:0,
        lab_weight:0,
        theory_rule:0,
        lab_rule:0
    })
    const [formInfo, updateFormInfo] = useState(initialInfo)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    

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
        try{
            axiosInstance.put('classes/editTeaching/' + formInfo.id+ '/',
            {
                schoolClass:{
                    id:formInfo.schoolClass.id,
                },
                class_year:formInfo.class_year,
                semester: formInfo.semester,
                professor:{
                    user:formInfo.professor.user.id,
                },
                theory_weight:formInfo.theory_weight,
                lab_weight:formInfo.lab_weight,
                theory_rule:formInfo.theory_rule,
                lab_rule:formInfo.lab_rule
            }).then((res) => {
                console.log(formInfo)
                console.log(res.data)
                TeachingsList()
                handleClose()
                TeachingsList()
            });

        }catch(ex){
            console.log(ex.message)
            setError(ex.message)
        }

        handleClose()
    }

    const handleChange = (e) => {
        updateFormInfo({
            ...formInfo,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
       
    };

    const  selectedTeaching = (e) => {
        console.log(e.target.value)
        console.log(teachings.find(object => {return object.id ===parseInt(e.target.value)}))
        var thisTeaching = teachings.find(object => {return object.id ===parseInt(e.target.value)})
        console.log(thisTeaching)
        updateFormInfo({
            id:thisTeaching.id,
            schoolClass:{
                id:thisTeaching.schoolClass.id,
            },
            class_year:thisTeaching.class_year,
            semester: thisTeaching.semester,
            professor:{
                user:thisTeaching.professor.user.id,
            },
            theory_weight:thisTeaching.theory_weight,
            lab_weight:thisTeaching.lab_weight,
            theory_rule:thisTeaching.theory_rule,
            lab_rule:thisTeaching.lab_rule

        })
        setInfo()
        handleShow()
    }

    useEffect(() => {
        TeachingsList();

    }, [teachings.join(',')],)

    return (
        <div>
            <ProfNavBar />
            <div className="myTeachingsBody">
            {error && <Alert variant="danger">{error}</Alert>}
            <h3>My Classes</h3>
                <div className="myTeachingsList">
                    <ListGroup className="w-50 p-3">
                        {teachings.map(teaching => (
                            <ListGroupItemfrom key={teaching.id}>
                                <div className="teachingItem">
                                    <div className="teachingInfo">
                                        <b>{Object.values(teaching.schoolClass.name)}</b>
                                    </div>
                                    <div className="updateTeaching">
                                        <Button value={teaching.id} className="w-50" type="button" variant="dark" style={{ width: '100%', height: '75%' }}
                                            onClick={selectedTeaching}><EditIcon/> Edit Info</Button>
                                    </div>
                                </div>
                            </ListGroupItemfrom>
                        ))}
                    </ListGroup>
                </div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Selected Class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>

                    <Form.Group>
                        <Form.Label style={{ color: "black" }}>Select your Position</Form.Label>
                        <Form.Control as="select" id="rank" name="semester" onChange={handleChange} >
                            <option value="SUMMER">Summer</option>
                            <option value="WINTER">Winter</option>
                        </Form.Control>
                    </Form.Group>
                            <Form.Group id="theory_weight">
                                <Form.Label style={{ color: "black" }}>Theory Weight</Form.Label>
                                <Form.Control type="number" step="any" name="theory_weight" defaultValue={formInfo.theory_weight} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group id="lab_weight">
                                <Form.Label style={{ color: "black" }}>Lab Weight</Form.Label>
                                <Form.Control type="number" step="any" name="lab_weight" defaultValue={formInfo.lab_weight} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group id="theory_rule">
                                <Form.Label style={{ color: "black" }}>Theory Rule</Form.Label>
                                <Form.Control type="number" step="any" name="theory_rule" defaultValue={formInfo.theory_rule} onChange={handleChange} >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="lab_rule">
                                <Form.Label style={{ color: "black" }}>Lab Rule</Form.Label>
                                <Form.Control type="number" step="any" name="lab_rule" defaultValue={formInfo.lab_rule} onChange={handleChange} >
                                </Form.Control>
                            </Form.Group>
                            <Button disabled={loading} onClick={SaveEdit}  className="btn btn-light" style={{width:'100%'}}>
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}
