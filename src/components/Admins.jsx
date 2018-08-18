import React, { Component } from 'react';
import { Link
       } from 'react-router-dom';
import { fb } from '../firebase';

/* Only me (vs111@duke.edu) can access this page via a conditional render in the Account Component*/

class Admins extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users: null,
        projects: null,
    };
  }
 
  componentDidMount() {
    fb.getUsers().then(snapshot =>
        this.setState(() => ({ users: snapshot.val(),
                               projects: this.state.projects
                             }))
    );
    fb.getProjects().then(snapshot =>
        this.setState(() => ({ users: this.state.users,
                               projects: snapshot.val()
                             }))
    );
  }

  render() {
      const { projects, users } = this.state;
      return (
          <div className='adminPage'>
            <h1 className='formsHeading'>Administrator Page</h1>
            <p className='accountInfo'>This page is restricted. Only users with the Administrator Role are able to see the contents.</p>
            <p className='accountInfo'>The following is an aggregation of all of the current users:</p>
            { !!users && <UserProfs users={users} /> }
            <p className='accountInfo'>The following is an aggregation of all of the current projects:</p>
            { !!projects && <UserProjects projects={projects} /> }
          </div>
      );
  }
}
const UserProfs = ({ users }) =>
  <div className='names'>
    {Object.keys(users).map(key =>
      <div key={key} className='individual'>
        <label>Name: {users[key].username}</label><br></br>
        <label>Email Address: {users[key].email}</label>
        <ul className='userCredentials'>
            <li>Languages: {users[key].languages}</li>
            <li>Past Projects: {users[key].pastProjects}</li>
            <li>Interests: {users[key].interests}</li>
        </ul>
      </div>)}
  </div>

const UserProjects = ({ projects }) =>  
  <div className='names'>
    {Object.keys(projects).map(key =>
      <div key={key} className='individual'>
        <label>Supervisor Name: {projects[key].username}</label><br></br>
        <label>Email Address: {projects[key].email}</label>
        <ul className='userCredentials'>
            <li>Language Requirements: {projects[key].languageRequirements}</li>
            <li>Project Description: {projects[key].projectDescription}</li>
        </ul>
      </div>)}
  </div>

const AdminLink = () =>
  <p className='accountInfo'>
    <Link className='accountLinks' to={'/admins'}>View Admin Page</Link>
  </p>

export default Admins;

export { AdminLink };