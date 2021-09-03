import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App'
import LogIn from './components/login/login';
import Signup from './components/signUp/signup';
import ProfSignUp from './components/signUp/profSignUp';
import ClassesList from './components/dashboard/classesList';
import Dashboard from './components/dashboard/dashboard';
import Logout from './components/dashboard/logout';
import UserManagement from './components/user/userManagement';
import ClassSignUp from './components/user/classSignUp';
import GradesPage from './components/user/gradesPage';
import StudentRoute from './routes/studentRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/signup" component={Signup} />
				<Route path="/profsignup" component={ProfSignUp} />
				<Route path="/classes" component={ClassesList} />
				<StudentRoute exact path="/dashboard" component={Dashboard} />
				<Route path="/login" component={LogIn} />
				<Route path="/logout" component={Logout} />
				<StudentRoute exact path="/userInfo" component={UserManagement}/>
				<StudentRoute exact path="/classesSignUp" component={ClassSignUp}/>
				<StudentRoute exact path="/myGrades" component={GradesPage}/>
			</Switch>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));