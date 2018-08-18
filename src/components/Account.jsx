import React, { Component } from 'react';

import { UpdateLink } from './UpdatePage';
import { ProjectLink } from './ProjectPage';
import { AdminLink } from './Admins'
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';  
import { fb } from '../firebase';
import * as firebase from 'firebase';

class Account extends Component {
  constructor(props) {
      super(props);
      this.state = {
          users: null,
      };
  }

  componentDidMount() {
      fb.getUsers().then(snapshot =>
        this.setState(() => ({ users: snapshot.val() }))
      );
  }
  
  render() { 
      const { users } = this.state;
      const currUser = firebase.auth().currentUser.email;
      
      //checks for current user to be admin, if so, displays AdminLink
      const adminLink = (currUser==='vs111@duke.edu') ? (
          <AdminLink />
      ) : ('');
            
      
      return (
        <div>
            <h1 className='formsHeading'>My Account</h1>
            { !!users && <UserInfo users={users} /> }
            <ProjectLink />
            <UpdateLink />
            {adminLink}
        </div>
      ); 
  }
}

const UserInfo = ({ users }) =>
  <div>
    <AuthUserContext.Consumer>
        {authUser =>
            <div className='accountInfo'>
                <p>Name: {users[authUser.uid].username}</p>
                <p>Email: {authUser.email}</p>
                <p>Languages: {users[authUser.uid].languages}</p>
                <p>Past Projects: {users[authUser.uid].pastProjects}</p>
                <p>Interests: {users[authUser.uid].interests}</p>
            </div>
        }
    </AuthUserContext.Consumer>
  </div>

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Account);