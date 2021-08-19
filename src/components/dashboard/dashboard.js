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
    const data = {
        labels: ['Classes Passed', 'Classes Failed'],
        datasets: [
            {
                label: 'Exam Results',
                data: [12, 19],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const [userInfo, infoUpdate] = useState([]);


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

    useEffect(() => {
        UserInfo();


    },[])
    
   
    return (
        
        <div>
        
            <NavBar />
            <h2>Welcome {userInfo.first_name}</h2>
            <div className="dashboardPage">
                <ClassesList></ClassesList>
                <div className="graphDiv">
                    <Card>
                        <Doughnut data={data} />
                    </Card>

                </div>

            </div>
        </div>


    )
}
