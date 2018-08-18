import React from 'react';

import { Link
       } from 'react-router-dom';

const Home = () =>
    <div className='body'>
      <div>
        <h1 className='homeHeading'>Welcome to BlueTech.</h1>
      </div>

      <div className='welcomeHeadingProf'>
          <p>Are you a researcher looking for someone to help with your data visualization?</p> 
          <p>...or are you an entrepreneur with an awesome app idea but no one to build your app for you?</p> 
          <p>... or are you a business owner hoping to fix your website?</p>
          <ProfilesLink />
      </div>
      <div className='welcomeHeadingStudent'>
          <p>Are you a student looking for a project to take on with a fellow member of the Duke community?</p> 
          <p>...or are you just dying to take what you learned in your Mobile Software Design class to the real world?</p> 
          <p>... or are you just looking to make some extra cash?</p>
          <ProjectLink />
      </div>   
          <p className='welcome'>Well, if you answered yes to any of the above, BlueTech is here to help. BlueTech provides you with a one-stop-shop if you're looking for help on a project. You can browse through student profiles to find someone with the expertise to match your needs, and alternatively, students can browse through posted projects to find a project that matches their interests.</p>
    </div>

const ProjectLink = () =>
  <p className='links'>
    <Link className='pLink' to={'/projects'}>Explore Projects</Link>
  </p>

const ProfilesLink = () =>
  <p className='links'>
    <Link className='pLink' to={'/profiles'}>Explore Profiles</Link>
  </p>
               
export default Home;