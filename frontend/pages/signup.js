import styled from 'styled-components';
import React from 'react';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: auto;
  justify-content: space-between;
  column-gap: 10px;
`;

const SignupPage = props => (
  <Row>
    <Column>
      <Signup />
    </Column>
    <Column>
      <Signin />
    </Column>
    <Column>
      <RequestReset />
    </Column>
  </Row>
);

export default SignupPage;
