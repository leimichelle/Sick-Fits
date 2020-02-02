import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const signupSubmit = async (e, signupMutation) => {
    e.preventDefault();
    await signupMutation();
    setEmail('');
    setName('');
    setPassword('');
  };
  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={{ email, name, password }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { loading, error }) => (
        <Form method="post" onSubmit={e => signupSubmit(e, signup)}>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <h2>Sign Up for An Account</h2>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label
              htmlFor="name
                    "
            >
              Name
              <input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}
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
            <button type="submit">Sign Up!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signup;
