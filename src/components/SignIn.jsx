import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { fb } from '../firebase';
import './App.css';

const SignInPage = ({ history }) =>
  <div className='signIn'>
    <h1 className='signInHeading'>Sign In</h1>
    <h1 className='signInHeading2'>BlueTech</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const handleChange = (propertyName, value) => () => ({
  [propertyName]: value,
});

const initState = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initState };
  }

  onSubmit = (e) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    fb.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...initState }));
        history.push('/');
      })
      .catch(error => {
        this.setState(handleChange('error', error));
      });

    e.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid = !(password !== '' && email !== '');

    return (
      <form className='signInForm' onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(handleChange('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        /><br></br>
        <input
          value={password}
          onChange={event => this.setState(handleChange('password', event.target.value))}
          type="password"
          placeholder="Password"
        /><br></br>
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};