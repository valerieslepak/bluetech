import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { fb } from '../firebase';

//this higher order component makes sure that there is currently an authorized user, and otherwise redirects the user to the sign-in page
const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            fb.auth.onAuthStateChanged(authUser => {
                //uses BrowserRouter history to redirect user back to sign in if they aren't authorized
                if (!authCondition(authUser)) {
                    this.props.history.push('/signin');
                }
            });
        }
        render() {
            //renders either passed component or nothing
            //every time authUser changes, checks authCondition function with authUser
            //if authUser fails, higher order component redirects to sign in page
            return (
                <AuthUserContext.Consumer>
                    {authUser => authUser ? <Component /> : null}
                </AuthUserContext.Consumer>
            );
        }
    }
    return withRouter(WithAuthorization);
}

export default withAuthorization;