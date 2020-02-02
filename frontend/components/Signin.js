import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signinSubmit = async (e, signupMutation) => {
    e.preventDefault();
    await signupMutation();
    setEmail('');
    setPassword('');
  };
  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{ email, password }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { loading, error }) => (
        <Form method="post" onSubmit={e => signinSubmit(e, signup)}>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <h2>Sign Into your account</h2>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>{' '}
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Sign In!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signin;
