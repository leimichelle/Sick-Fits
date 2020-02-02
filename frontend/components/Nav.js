import Link from 'next/link';
import React from 'react';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from './Carts';
import CartCount from './CartCount';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        )}
        {me && (
          <>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button type="button" onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  />
                </button>
              )}
            </Mutation>
          </>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
