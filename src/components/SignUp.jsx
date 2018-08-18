import React, { Component } from 'react';
import { Link,
        withRouter,
       } from 'react-router-dom';

import { fb } from '../firebase';

const SignUpPage = ({ history }) =>
  <div>
    <h1 class='formsHeading'>Create an Account</h1>
    <div class='forms'>
        <SignUpForm history={history}/>
    </div>
  </div>

const initState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    languages: '', 
    pastProjects: '', 
    interests: '',
    error: null,
};

const handleChange = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { initState };
    }

    onSubmit = (e) => {
        const {
          username,
          email,
          password,
          languages,
          pastProjects,
          interests,
        } = this.state;
    
        const {
          history,
        } = this.props;
    
        fb.auth.createUserWithEmailAndPassword(email, password)
          .then(authUser => {
            fb.createUser(authUser.uid, username, email, languages, pastProjects, interests)
              .then(() =>{
                this.setState(() => ({ initState }));
                history.push('/home');
              })
              .catch(error => {
                this.setState(handleChange('error', error));
              });
            
          })
          .catch(error => {
            this.setState(handleChange('error', error));
        });

        e.preventDefault();
    }

    render() {
        const {
            username,
            email,
            password,
            confirmPassword,
            languages, 
            pastProjects, 
            interests,
            error,
        } = this.state;
        
        const isInvalid = !(password === confirmPassword && password !== '' && email !== '' && username !== '');

        return (
          <form className='signInForm' onSubmit={this.onSubmit}>
            <p className='nameFields'>Full Name:</p>
            <input
              value={username}
              onChange={event => this.setState(handleChange('username', event.target.value))}
              type="text"
            />
            <p className='nameFields'>Email Address:</p>
            <input
              value={email}
              onChange={event => this.setState(handleChange('email', event.target.value))}
              type="text"
            />
            <p className='nameFields'>Password:</p>
            <input
              value={password}
              onChange={event => this.setState(handleChange('password', event.target.value))}
              type="password"
            />
            <p className='nameFields'>Confirm Password:</p>
            <input
              value={confirmPassword}
              onChange={event => this.setState(handleChange('confirmPassword', event.target.value))}
              type="password"
            />
            <p className='projInfo'>The following fields are optional, they are intended to help match you with a project.</p>
            <p>Please list any languages you would be comfortable doing a project in.</p>
            <input className='projFields'
              value={languages}
              onChange={event => this.setState(handleChange('languages', event.target.value))}
              type="languages"
            />
            <p>Please list any past projects you have worked on, along with a short description.</p>
            <input className='projFields'
              value={pastProjects}
              onChange={event => this.setState(handleChange('pastProjects', event.target.value))}
              type="pastProjects"
            />
            <p>Please list the kinds of projects you would be interested in working on.</p>
            <input className='projFields'
              value={interests}
              onChange={event => this.setState(handleChange('interests', event.target.value))}
              type="interests"
            />
            <button className='signUp' disabled={isInvalid} type="submit">
              Sign Up
            </button>

            { error && <p>{error.message}</p> }
          </form>
        );
      }
    }

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link className='signUp' to={'/signup'}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};