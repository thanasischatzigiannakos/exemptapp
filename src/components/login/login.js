import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import aegeanlogo from './aegean_logo.png';

export default function LogIn() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history.push('/');
				//console.log(res);
				//console.log(res.data);
			});
	};

	return (

		<div className="login">
			<div class="split left">
				<img src={aegeanlogo} alt="University of the Aegean"></img>
				<h2>School of Engineering</h2>
				<h2>Information and Communication Systems Engineering Department</h2>

			</div>

			<div class="split right">
				<Form style={{ width: "35%", marginLeft: "30%", marginTop: "25%" }} >
					<h1>Sign In</h1>
					<Form.Group controlId="formBasicEmail">
						<Form.Label style={{ color: "#ffff" }} >Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" required onChange={handleChange}/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label style={{ color: "#ffff" }}>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" required onChange={handleChange} />
					</Form.Group>
					<Button variant="light" type="submit" style={{ marginLeft: "40%, marginTop:10%", width:"100%" }} onSubmit={handleSubmit}>
						Submit
					</Button>
					<div className = "signUpArea">
					<h5>Don't have an account? </h5>
					<Link to="/signup"><Button variant="outline-light" style={{width:"100%" }} >
						Register as a Student
					</Button></Link>
					<h5>OR</h5>
					<Link to="/profsignup"><Button variant="outline-light" style={{width:"100%" }} >
					Register as Teaching Staff
					</Button></Link>
					
				</div>


				</Form>

				

			</div>
		</div>
	)
}