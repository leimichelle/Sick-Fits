import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
    }
  }
`;

function UpdateItem(props) {
  const { id } = props;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const updateAItem = (e, updateItemMutation) => {
    e.preventDefault();
    updateItemMutation();
  };
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for ID {id}</p>;
        return (
          <Mutation
            mutation={UPDATE_ITEM_MUTATION}
            variables={{
              id,
              title,
              description,
              price,
            }}
          >
            {(updateItem, { error, loading }) => (
              <Form onSubmit={e => updateAItem(e, updateItem)}>
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.item.title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </label>
                  <label htmlFor="price">
                    Price
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      required
                      defaultValue={data.item.price}
                      onChange={e => setPrice(parseFloat(e.target.value || ''))}
                    />
                  </label>
                  <label htmlFor="description">
                    description
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Description"
                      required
                      defaultValue={data.item.description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </label>
                  <button type="submit">
                    Sav
                    {loading ? 'ing' : 'e'} Changes
                  </button>
                </fieldset>
              </Form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
