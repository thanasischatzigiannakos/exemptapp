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
import ProfRoute from './routes/profRoute';
import MyTeachings from './components/professor/myTeachings';
import MyStatistics from './components/professor/myStatistics';
import GradingPage from './components/professor/gradingPage';
import ProfManagement from './components/professor/profManagement';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
				<Route exact path="/" component={LogIn} />
				<Route path="/signup" component={Signup} />
				<Route path="/profsignup" component={ProfSignUp} />
				<Route path="/classes" component={ClassesList} />
				<Route path="/login" component={LogIn} />
				<Route path="/logout" component={Logout} />
				<StudentRoute exact path="/dashboard" component={Dashboard} />
				<StudentRoute exact path="/userInfo" component={UserManagement}/>
				<StudentRoute exact path="/classesSignUp" component={ClassSignUp}/>
				<StudentRoute exact path="/myGrades" component={GradesPage}/>
				<ProfRoute path="/myTeachings" component={MyTeachings}/>
				<ProfRoute path="/statistics" component={MyStatistics}/>
				<ProfRoute path="/grading" component={GradingPage}/>
				<ProfRoute path="/management" component={ProfManagement}/>
			</Switch>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));