import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

function CreateItem() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [largeImage, setLargeImage] = useState();
  const [price, setPrice] = useState();
  const uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dyqz78epa/image/upload/',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    if (file.secure_url) {
      setImage(file.secure_url);
    }
    if (file.eager) {
      setLargeImage(file.eager[0].secure_url);
    }
  };
  return (
    <Mutation
      mutation={CREATE_ITEM_MUTATION}
      variables={{ title, description, image, largeImage, price }}
    >
      {(createItem, { error, loading }) => (
        <Form
          onSubmit={async e => {
            e.preventDefault();
            const res = await createItem();
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id },
            });
          }}
        >
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">
              Image
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an image"
                required
                onChange={uploadFile}
              />
            </label>
            {image && <img width="200" src={image} alt="Upload Preview" />}
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={title}
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
                value={price}
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
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
