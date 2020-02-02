import React from 'react';
import Permissions from '../components/Permissions';
import PleaseSignIn from '../components/PleaseSignin';

const PermissionsPage = () => (
  <PleaseSignIn>
    <Permissions />
  </PleaseSignIn>
);

export default PermissionsPage;
