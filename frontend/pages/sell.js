import React from 'react';
import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignin';

const Sell = () => (
  <PleaseSignIn>
    <CreateItem />
  </PleaseSignIn>
);

export default Sell;
