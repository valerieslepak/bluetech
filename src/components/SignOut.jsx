import React from 'react';

import { fb } from '../firebase';

const SignOutButton = () =>
  <button className = 'signOut' type ='button' onClick={fb.auth.signOut}>Sign Out</button>

export default SignOutButton;