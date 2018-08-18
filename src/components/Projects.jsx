import React, { Component } from 'react';
import { fb } from '../firebase';

const url = 'https://streamer.oit.duke.edu/ldap/people?q=man&access_token=917de1157e01a74f6ca3c6f7fb4c4bff';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
        hits: [],
        projects: null,
    };
    this.getCORSData = this.getCORSData.bind(this);
//    this.addComment = this.addComment.bind(this);
  }
 
  componentDidMount() {
    this.getCORSData(url);
    fb.getProjects().then(snapshot =>
        this.setState(() => ({ hits: this.state.hits,
                               projects: snapshot.val() 
                             }))
    );
  }

  getCORSData(url) {
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyURL + url)
        .then(response => response.json())
        .then(contents => this.setState({
            hits: contents,
            projects: this.state.projects
        }))
        .catch(() => console.log("Access to " + url + " is still blocked."))
  }
    
    
  render() { 
      const { projects, hits } = this.state;
      return (
          <div>
            <h1 className='formsHeading'>Projects</h1>
            <div className='profiles'>
                <p>Use this page to browse through projects, if you find one that meets your interests, send the project supervisor an email!</p>
            </div>
            <div className='names'>
                {this.state.hits.map(hit =>
                <div className='individual' key={hit.netid}>
                    <label>Supervisor: {hit.display_name}</label><br></br>
                    <label>Email Address: {hit.netid}@duke.edu</label>
                    <ul className='userCredentials'>
                        <li>Language Requirements: Python, SQL</li>
                        <li>Project Description: Here, someone seeking help on a project would include a full description of the project, including time requirement, project purpose, pay, etc.</li>
                    </ul>
                </div>
                )}
            </div>
            { !!projects && <UserProjects projects={projects} /> }
          </div>
      );
  }
}

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

export default Projects;