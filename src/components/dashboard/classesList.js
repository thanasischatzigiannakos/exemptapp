import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItemfrom from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import './classesList.css'


export default function ClassesList() {
    const history = useHistory();
    const [classList, listUpdate] = useState([]);

    async function fetchClasses() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/classList/').then((res) => {
                listUpdate(res.data)
                console.log(res.data)
            });
        } catch (error) { console.log(error.message) }
    };

    useEffect(() => {
        fetchClasses();
        


    }, [classList.join(",")])

    return (
        <div className="classesLanding">
            <h2>Available Classes</h2>
            <div className="classesPanel">
                <ListGroup>
                    {classList.map(function (d, idx) {
                        return (<ListGroup.Item key={idx}>
                            <Accordion>
                                <Card border="info">
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <h4>{d.name}</h4>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body><h5>{d.description}</h5>
                                                {d.requiredClasses.map((required, j)=> 
                                                <div key={j}>
                                                <b>Required Classes:</b>
                                                <p >{required.name}</p>
                                                </div>
                                                )}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>


                        </ListGroup.Item>)
                    })}
                </ListGroup>

            </div>

        </div>
    )
}


