import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import ProfNavBar from '../navigation/profNavBar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert'
import { Bar, Doughnut } from 'react-chartjs-2';
import './myStatistics.css';

export default function MyStatistics() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [teachings, setTeachings] = useState([]);
    const [signUps, setSignUps] = useState([]);
    const [selectedClass, setClass] = useState("");
    const [firstYearClasses, setFirstYearClasses] = useState(0);
    const [secondYearClasses, setSecondYearClasses] = useState(0);
    const [thirdYearClasses, setThirdYearClasses] = useState(0);
    const [fourthYearClasses, setFourthYearClasses] = useState(0);
    const [fifthYearClasses, setFifthYearClasses] = useState(0);
    const [studentsPassed, setPassed] = useState(0);
    const [studentsFailed, setFailed] = useState(0);

    async function TeachingsList() {
        console.log('Fetching...')
        try {
            axiosInstance.get('classes/myTeaching/' + localStorage.getItem("user_id")).then((res) => {
                console.log(res.data)
                setTeachings(res.data)
            });
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
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

    async function ClassesPerYear() {
        var first = teachings.filter(object => object.class_year === 1)
        setFirstYearClasses(first.length)
        var second = teachings.filter(object => object.class_year === 2)
        setSecondYearClasses(second.length)
        var third = teachings.filter(object => object.class_year === 3)
        setThirdYearClasses(third.length)
        var fourth = teachings.filter(object => object.class_year === 4)
        setFourthYearClasses(fourth.length)
        var fifth = teachings.filter(object => object.class_year === 5)
        setFifthYearClasses(fifth.length)

    }

    async function StudentPercentagesTotal() {
        console.log(localStorage.getItem("user_id"))
        console.log(signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id"))))
    }

    const handleSelect = (e) => {
        var tmp = teachings.filter(object => object.id === Number(e))
        var selected = tmp[0]
        setClass(selected.schoolClass.name)
        setPassed(signUps.filter(object => object.teaching.id === Number(e) && object.final_score >= 5).length)
        setFailed(signUps.filter(object => object.teaching.id === Number(e) && object.final_score < 5).length)
    }

    const barData = {
        labels: ['First Year', 'Second Year', 'Third Year',
            'Fourth Year', 'Fifth Year'],
        datasets: [
            {
                label: 'Classes',
                data: [firstYearClasses, secondYearClasses, thirdYearClasses, fourthYearClasses, fifthYearClasses],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)'
                ],
                borderWidth: 2

            }
        ]
    }

    const data = {
        labels: ['Students Passed', 'Students Failed'],
        datasets: [
            {
                label: 'Exam Results',
                data: [signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id")) && object.final_score >= 5).length,
                signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id")) && object.final_score < 5).length],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const classData = {
        labels: ['Students Passed', 'Students Failed'],
        datasets: [
            {
                label: 'Exam Results',
                data: [studentsPassed, studentsFailed],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        TeachingsList();
        SignUpsList();
        ClassesPerYear();
        StudentPercentagesTotal();

    }, [teachings.join(',')], [signUps.join(',')])

    return (
        <div className="mainBody">
            <ProfNavBar />
            <h3>Statistics for my Classes</h3>
            <div className="chartsBody">
                <div className="barChart">
                    <h4>Number of classes for each academic year</h4>
                    <Bar
                        data={barData}
                        options={{
                            title: {
                                display: true,
                                text: 'Classes Per Year',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                <div className="percentageForClass">
                    <h4>Students that passed or failed a Selected Class</h4>
                    {selectedClass !== "" ? <b>{selectedClass}</b> : <p>Please Select a class</p>}
                    <Doughnut data={classData} />
                    <DropdownButton id="myclasses-dropdown" variant="secondary" title="Select a Class" onSelect={handleSelect}>
                        {teachings.map(teaching => (
                            <Dropdown.Item eventKey={teaching.id}>{teaching.schoolClass.name}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="percentageAllClasses">
                    <h4>Number of students that passed or failed all of my classes</h4>
                    <Doughnut data={data} />
                    <b>{signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id")) && object.final_score >= 5).length} students passed my classes
                        and {signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id")) && object.final_score < 5).length} failed</b>
                </div>

            </div>
        </div>
    )
}
