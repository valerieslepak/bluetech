import React from 'react';

import AuthUserContext from './AuthUserContext';
import { fb } from '../firebase';

//this higher order component is used on the App component to pass the newly authenticated user, which can then be passed to all of the other components as consumers
const withAuthentication = (Component) => 
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
            };
        }
        componentDidMount() {
            //onAuthStateChanged() gets a function as input so function has access to authenticated user object
            fb.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState(() => ({ authUser }))
                    : this.setState(() => ({ authUser: null }));
            });
        }
        //component will render with the currently authorized user passed in (if there is one). this lets the consumer components know if there is currently a user signed in
        render() {
            const { authUser } = this.state;
            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>
            );
        }
    }

                
export default withAuthentication;