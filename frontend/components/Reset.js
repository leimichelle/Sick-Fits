import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const Reset = ({ resetToken }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const resetSubmit = async (e, resetMutation) => {
    e.preventDefault();
    await resetMutation();
    setPassword('');
    setConfirmPassword('');
  };
  return (
    <Mutation
      mutation={RESET_MUTATION}
      variables={{ resetToken, password, confirmPassword }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(reset, { loading, error }) => (
        <Form method="post" onSubmit={e => resetSubmit(e, reset)}>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <h2>Reset Your Password</h2>
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
            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </label>
            <button type="submit">Reset</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
