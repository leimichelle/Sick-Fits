import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { All_ITMES_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = props => {
  const { id } = props;
  const update = (cache, payload) => {
    // manually update the cache on the client, so it maches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: All_ITMES_QUERY });
    // 2. Filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. put the items back
    cache.writeQuery({ query: All_ITMES_QUERY, data });
  };
  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id }}
      update={update}
    >
      {deleteItem => (
        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you wanted to delete this?')) {
              deleteItem().catch(err => {
                alert(err.message);
              });
            }
          }}
        >
          {props.children}
        </button>
      )}
    </Mutation>
  );
};

export default DeleteItem;
