import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDVlW261W4LRMY1Vls87vkG9ytxdWW3Apw",
    authDomain: "final-project-4af29.firebaseapp.com",
    databaseURL: "https://final-project-4af29.firebaseio.com",
    projectId: "final-project-4af29",
    storageBucket: "final-project-4af29.appspot.com",
    messagingSenderId: "458125385609"
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

/* Functions for accessing realtime DB. Since I'm re-using them, it's easier to have them in one file */

//user created as an object from general user's resource path
export const createUser = (id, username, email, languages, pastProjects, interests) =>
    db.ref(`users/${id}`).set({
        username,
        email,
        languages, 
        pastProjects, 
        interests,
    });

//project created as an object from projects resource path
export const createProject = (id, username, email, languageRequirements, projectDescription) =>
    db.ref(`projects/${id}`).set({
        username,
        email,
        languageRequirements, 
        projectDescription,
    });

//gets all users from realtime db    
export const getUsers = () =>
    db.ref('users').once('value');

//gets all projects from realtime db
export const getProjects = () =>
    db.ref('projects').once('value');

//updates a user in the db
export const updateUser = (id, languages, pastProjects, interests) =>
    db.ref(`users/${id}`).update({
        languages, 
        pastProjects, 
        interests,
    });

export {db, auth};
