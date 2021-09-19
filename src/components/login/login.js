import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import aegeanlogo from './aegean_logo.png';
import jwt_decode from "jwt-decode"
import Alert from 'react-bootstrap/esm/Alert';

export default function LogIn() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [error, setError] = useState("")
	const [flag, setFlag] = useState(false)

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
				const id = jwt_decode(res.data.access)
				localStorage.setItem('user_id', id["user_id"]);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				console.log(res);
				console.log(res.data);
				try {
					axiosInstance.get('user/userInfo/' + localStorage.getItem("user_id")).then((res) => {

						console.log(res.data)
						localStorage.setItem('user_type', res.data.type)
						if (localStorage.getItem('user_type') === "STUDENT") {
							history.push('/dashboard')
						} else { history.push('/statistics') }
					});
				} catch (ex) {
					console.log(ex.message)
					setFlag(true)
					setError("Sign In Failed!If you just signed in please wait for an admin to activate your account!!!")
					console.log(error)
				}

			}).catch(e=>{
				console.log(e)
				setFlag(true)
				setError("Sign In Failed! If you just signed in please wait for an admin to activate your account!")

			})
	};

	function isLoggedIn() {
		if (localStorage.getItem('user_id') != null) {
			if (localStorage.getItem('user_type') === "STUDENT") {
				history.push('/dashboard')
			} else { history.push('/statistics') }
		}
	}

	useEffect(() => {
		isLoggedIn();

	})

	return (

		<div className="login">
			
			<div className="split left">
				<img src={aegeanlogo} alt="University of the Aegean"></img>
				<h2>School of Engineering</h2>
				<h2>Information and Communication Systems Engineering Department</h2>

			</div>

			<div className="split right">
			{flag && <Alert variant="danger">{error}</Alert>}
				<Form style={{ width: "35%", marginLeft: "30%", marginTop: "25%" }} >
					<h1>Sign In</h1>
					<Form.Group>
						<Form.Label style={{ color: "#ffff" }} >Email address</Form.Label>
						<Form.Control type="email" id="email" name="email" placeholder="Enter email" required onChange={handleChange} />
					</Form.Group>

					<Form.Group >
						<Form.Label style={{ color: "#ffff" }}>Password</Form.Label>
						<Form.Control type="password" id="password" placeholder="Password" name="password" required onChange={handleChange} />
					</Form.Group>
					<Button variant="light" type="submit" style={{ marginLeft: "40%, marginTop:10%", width: "100%" }} onClick={handleSubmit}>
						Submit
					</Button>
					<div className="signUpArea">
						<h5>Don't have an account? </h5>
						<Link to="/signup"><Button variant="outline-light" style={{ width: "100%" }} >
							Register as a Student
						</Button></Link>
						<h5>OR</h5>
						<Link to="/profsignup"><Button variant="outline-light" style={{ width: "100%" }} >
							Register as Teaching Staff
						</Button></Link>

					</div>


				</Form>



			</div>
		</div>
	)
}
