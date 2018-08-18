import React, { Component } from 'react';
import { fb } from '../firebase';

const url = 'https://streamer.oit.duke.edu/ldap/people?q=all&access_token=917de1157e01a74f6ca3c6f7fb4c4bff'

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
        hits: [],
        users: null,
    };
    this.getCORSData = this.getCORSData.bind(this);
  }
 
  componentDidMount() {
    this.getCORSData(url);
    fb.getUsers().then(snapshot =>
        this.setState(() => ({ hits: this.state.hits,
                               users: snapshot.val() 
                             }))
    );
  }

  getCORSData (url) {
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyURL + url)
        .then(response => response.json())
        .then(contents => this.setState({
            hits: contents,
            users: this.state.users
        }))
        .catch(() => console.log("Access to " + url + " is still blocked."))
  }
    
  render() {
      const { users, hits } = this.state;
      return (
          <div>
            <h1 className='formsHeading'>Profiles</h1>
            <div className='profiles'>
                <p>Use this page to browse through user profiles, if you find someone that matches your project needs, send them an email!</p>
            </div>
            <div className='names'>
                {this.state.hits.map(hit =>
                <div className='individual' key={hit.netid}>
                    <label>Name: {hit.display_name}</label><br></br>
                    <label>Email Address: {hit.netid}@duke.edu</label>
                    <ul className='userCredentials'>
                        <li>Languages: Java, Python, C, C++, Node.js, HTML, CSS, React, Vue</li>
                        <li>Past Projects: A user would be able to include any past projects they've worked on with an extensive description.</li>
                        <li>Interests: A user would be able to include the types of projects they are interested in working on.</li>
                    </ul>
                </div>
                )}
            </div>
            { !!users && <UserProfs users={users} /> }
          </div>
      );
  }
}

//in addition to the data loaded from the API, this will load existing user data into the profiles category
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

export default Profiles;
