import React, { Component } from 'react';
import { Link,
       withRouter} from 'react-router-dom';

import { fb } from '../firebase';
import * as firebase from 'firebase';

const UpdatePage = ({ history }) =>
  <div>
    <h1 className='formsHeading'>Update Your Account.</h1>
    <div className='forms'>
        <UpdateForm history={history} />
    </div>
  </div>

const initState = {
    languages: '', 
    pastProjects: '', 
    interests: '',
    error: null,
};

const handleChange = (propertyName, value) => () => ({
  [propertyName]: value,
});

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = { initState };
    }
    
    onSubmit = (event) => {
        const {
          languages,
          pastProjects,
          interests,
        } = this.state;
        
        const {
          history,
        } = this.props;
        
        const user = firebase.auth().currentUser;
        
        fb.updateUser(user.uid, languages, pastProjects, interests)
          .then(() =>{
            this.setState(() => ({ initState }));
            history.push('/account');
          })
          .catch(error => {
            this.setState(handleChange('error', error));
          });
        event.preventDefault();
    }

    render() {
        const {
            languages, 
            pastProjects, 
            interests,
            error,
        } = this.state;
        
        return (
          <form onSubmit={this.onSubmit}>
            <p>Please list any languages or frameworks you would be comfortable doing a project in (i.e. Java, C++, React, etc.).</p>
            <input className='projFields'
              value={languages}
              onChange={event => this.setState(handleChange('languages', event.target.value))}
              type="languages"
            /><br></br>
            <p>Please list any past projects you have worked on, along with a short description (i.e. CompSci 216 Data Simulation, etc.).</p>
            <input className='projFields'
              value={pastProjects}
              onChange={event => this.setState(handleChange('pastProjects', event.target.value))}
              type="pastProjects"
            /><br></br>
            <p>Please list the kinds of projects you would be interested in working on (i.e. App-Building, Web Development, etc.).</p>
            <input className='projFields'
              value={interests}
              onChange={event => this.setState(handleChange('interests', event.target.value))}
              type="interests"
            /><br></br>
            <button className='saveChanges' type="submit">
              Save Changes
            </button>
                
            { error && <p>{error.message}</p> }
          </form>
        );
      }
    }
    
const UpdateLink = () =>
  <p className='accountInfo'>
    <Link className='accountLinks' to={'/updates'}>Update Account</Link>
  </p>
    

export default withRouter(UpdatePage);

export {
  UpdateForm,
  UpdateLink,
};