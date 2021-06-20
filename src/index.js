import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App'
import LogIn from './components/login/login';
import Signup from './components/signUp/signup';
import ProfSignUp from './components/signUp/profSignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/signup" component={Signup} />
				<Route path="/profsignup" component={ProfSignUp} />
				<Route path="/login" component={LogIn} />
				{/* <Route path="/logout" component={Logout} /> */}
			</Switch>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));