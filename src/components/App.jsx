import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';

import logo from './fullSizeLogo-01.png'
    
import NavBar from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import ProjectPage from './ProjectPage';
import UpdatePage from './UpdatePage';
import HomePage from './Home';
import Projects from './Projects';
import Profiles from './Profiles';
import AdminPage from './Admins';
import AccountPage from './Account';

import withAuthentication from './withAuthentication';
   
//the App component sets up all of the routes in the website, and includes a nav bar that is visible on all pages
const App = () =>
    <Router basename={process.env.PUBLIC_URL}>
        <div>
          <div className='headerPic'>
              <img className='mainHeading' src={logo} alt='logo' />
          </div>
          <NavBar />
          <hr/>
          <Route exact path={'/'} component={() => <HomePage />}/>
          <Route exact path={'/signup'} component={() => <SignUpPage />}/>
          <Route exact path={'/signin'} component={() => <SignInPage />}/>
          <Route exact path={'/projects'} component={() => <Projects />}/>
          <Route exact path={'/newproject'} component={() => <ProjectPage />}/>
          <Route exact path={'/updates'} component={() => <UpdatePage />}/>
          <Route exact path={'/profiles'} component={() => <Profiles />}/>
          <Route exact path={'/admins'} component={() => <AdminPage />}/>
          <Route exact path={'/account'} component={() => <AccountPage />}/>
        </div>
    </Router>

export default withAuthentication(App);