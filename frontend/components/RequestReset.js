import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const requestSubmit = async (e, requestResetMutation) => {
    e.preventDefault();
    await requestResetMutation();
    setEmail('');
  };
  return (
    <Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
      {(requestReset, { loading, error, called }) => (
        <Form method="post" onSubmit={e => requestSubmit(e, requestReset)}>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            {!error && !loading && called && (
              <p>Success! Check your email for a reset link!</p>
            )}
            <h2>Request a Password Reset</h2>
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
            <button type="submit">Request Reset</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default RequestReset;
