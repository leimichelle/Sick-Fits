import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const BigButtonStyles = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = props => {
  const { id } = props;
  // This gets called as soon as we gt4 a response back from the server after a mutation has been performed
  const update = (cache, { data: { removeFromCart } }) => {
    // first ready the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // remove the item from the cart
    data.me.cart = data.me.cart.filter(
      cartItem => cartItem.id !== removeFromCart.id
    );
    // write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  return (
    <Mutation
      mutation={REMOVE_FROM_CART_MUTATION}
      variables={{ id }}
      update={update}
      optimisticResponse={{
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'CartItem',
          id,
        },
      }}
    >
      {(removeFromCart, { loading }) => (
        <BigButtonStyles
          title="Delete Item"
          onClick={() => {
            removeFromCart().catch(err => alert(err.message));
          }}
          disabled={loading}
        >
          &times;
        </BigButtonStyles>
      )}
    </Mutation>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string,
};

export default RemoveFromCart;
