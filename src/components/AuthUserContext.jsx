import React from 'react';
const AuthUserContext = React.createContext(null);
export default AuthUserContext;

/* Higher order component created to enhance App component. Uses React context API, which allows sharing data for a tree of React components. Useful for all components to know who the authenticated user is. */