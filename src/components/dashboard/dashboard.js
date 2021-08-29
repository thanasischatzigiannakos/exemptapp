import ClassesList from './classesList'
import NavBar from './navBar'
import { Doughnut } from 'react-chartjs-2'
import Card from 'react-bootstrap/Card'
import './dashboard.css'
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode"
import axiosInstance from '../../axios';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
    

    const [userInfo, infoUpdate] = useState([]);
    const [userClasses, classesUpdate] = useState([]);


    async function UserInfo(){
        console.log('Fetching...')
        try {
            axiosInstance.get('user/userInfo/'+ localStorage.getItem("user_id")).then((res) => {
                infoUpdate(res.data)
                console.log(res.data)
                localStorage.setItem('user_type',userInfo.type)
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

    const data = {
        labels: ['Classes Passed', 'Classes Failed'],
        datasets: [
            {
                label: 'Exam Results',
                data: [userClasses.filter(x => x.final_score >= 5).length, userClasses.filter(x => x.final_score < 5).length],
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
        UserInfo();
        AlreadySignedUp();


    },[], [userClasses.join(',')])
    
   
    return (
        
        <div>
        
            <NavBar />
            <h2>Welcome {userInfo.first_name}</h2>
            <div className="dashboardPage">
                <ClassesList></ClassesList>
                <div className="graphDiv">
                    <Card>
                    {userClasses.filter(x => x.final_score != null).length ===0? <p>None of your registed classes have been graded</p>:<Doughnut data={data}/> }
                    <p>Total classes passed: {userClasses.filter(x => x.final_score >= 5).length}</p>
                    </Card>

                </div>

            </div>
        </div>


    )
}
