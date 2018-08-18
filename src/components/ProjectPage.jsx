import React, { Component } from 'react';
import { Link,
        withRouter,
       } from 'react-router-dom';

import * as firebase from 'firebase';
import { fb } from '../firebase';

const ProjectPage = ({ history }) =>
  <div>
    <h1 className='formsHeading'>Post a Project</h1>
    <div className='forms'>
        <ProjectForm history={history}/>
    </div>
  </div>

const initState = {
    username: '',
    email: '',
    languageRequirements: '',
    projectDescription: '',
    error: null,
};

const handleChange = (propertyName, value) => () => ({
  [propertyName]: value,
});

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = { initState };
    }

    onSubmit = (e) => {
        const {
          username,
          email,
          languageRequirements,
          projectDescription,
        } = this.state;
    
        const {
          history,
        } = this.props;
        
        var user = firebase.auth().currentUser;
    
        fb.createProject(user.uid, username, email, languageRequirements, projectDescription)
          .then(() =>{
            this.setState(() => ({ initState }));
            history.push('/account');
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
            languageRequirements,
            projectDescription,
            error,
        } = this.state;

        return (
          <form onSubmit={this.onSubmit}>
            <p>Supervisor Name:</p>
            <input className='smallFields'
              value={username}
              onChange={event => this.setState(handleChange('username', event.target.value))}
              type="text"
            />
            <p>Supervisor Email:</p> 
            <input className='smallFields'
              value={email}
              onChange={event => this.setState(handleChange('email', event.target.value))}
              type="text"
            />
            <p className='projInfo'>The following fields are required to let users know the scope of your project.</p>
            <p>Please list the languages required for your project.</p>
            <input className='projFields'
              value={languageRequirements}
              onChange={event => this.setState(handleChange('languageRequirements', event.target.value))}
              type="languageRequirements"
            /><br></br>
                <p>Please describe the project in as much detail as possible. Include estimated time commitment, pay, purpose, etc.</p>
            <input className='projFields'
              value={projectDescription}
              onChange={event => this.setState(handleChange('projectDescription', event.target.value))}
              type="projectDescription"
            /><br></br>
            <button className='saveChanges' type="submit">
              Add Project
            </button>

            { error && <p>{error.message}</p> }
          </form>
        );
      }
    }

const ProjectLink = () =>
  <p className='accountInfo'>
    <Link className='accountLinks' to={'/newproject'}>Post a Project</Link>
  </p>

export default withRouter(ProjectPage);

export {
  ProjectForm,
  ProjectLink,
};