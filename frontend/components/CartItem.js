import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = props => {
  const { cartItem } = props;
  if (!cartItem.item)
    return (
      <CartItemStyles>
        This item has been removed
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.quantity * cartItem.item.price)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
    item: PropTypes.object,
  }).isRequired,
};
export default CartItem;