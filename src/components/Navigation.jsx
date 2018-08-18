import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import './App.css';

//displays different navigation bar based on whether a user is signed in
const Navigation = () =>
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavAuth />
            : <NavUnauth /> 
        }
    </AuthUserContext.Consumer>

const NavAuth = () =>
    <ul className='navBar'>
        <li className='routes'><Link to={'/'}>Home</Link></li>
        <li className='routes'><Link to={'/projects'}>Projects</Link></li>
        <li className='routes'><Link to={'/profiles'}>Profiles</Link></li>
        <li className='routes'><Link to={'/account'}>Account</Link></li>
        <li className='signOut'><SignOutButton /></li>
    </ul>

const NavUnauth = () =>
    <ul className='navBar'>
        <li className='routes'><Link to={'/signin'}>Sign In</Link></li>
        <li className='routes'><Link to={'/home'}>Home</Link></li>
        <li className='routes'><Link to={'/projects'}>Projects</Link></li>
        <li className='routes'><Link to={'/profiles'}>Profiles</Link></li>
        <li className='signOut'><SignOutButton /></li>
    </ul>

export default Navigation;