import axiosInstance from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../dashboard/navBar';
import { Bar, Doughnut } from 'react-chartjs-2';
import './myStatistics.css';

export default function MyStatistics() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [teachings, setTeachings] = useState([]);
    const [signUps, setSignUps] = useState([]);
    const [selectedClass, setClass] = useState(0);
    const [firstYearClasses, setFirstYearClasses] = useState(0);
    const [secondYearClasses, setSecondYearClasses] = useState(0);
    const [thirdYearClasses, setThirdYearClasses] = useState(0);
    const [fourthYearClasses, setFourthYearClasses] = useState(0);
    const [fifthYearClasses, setFifthYearClasses] = useState(0);

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

    async function StudentPercentagesTotal(){
        console.log(signUps[0].teaching.professor.user.id)
        console.log(localStorage.getItem("user_id"))
        console.log(signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id"))))
    }

    const barData = {
        labels: ['First Year', 'Second Year', 'Third Year',
            'Fourth Year', 'Fifth Year'],
        datasets: [
            {
                label: 'Classes',
                data: [firstYearClasses, secondYearClasses, thirdYearClasses, fourthYearClasses, fifthYearClasses ],
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
                data: [signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id")) && object.final_score>=5).length,
                signUps.filter(object => object.teaching.professor.user.id === Number(localStorage.getItem("user_id")) && object.final_score<5).length],
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
            <NavBar />
            <b>{firstYearClasses} {thirdYearClasses}</b>
            <div className="chartsBody">
                <div className="barChart">
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

                </div>
                <div className="percentageAllClasses">
                        <Doughnut data={data}/>
                </div>

            </div>
        </div>
    )
}
