import { clientCredentials } from '../client';

const getAllProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateProduct = (product) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${product.id}`, {
    method: 'PUT',
    body: JSON.stringify(
      product,
    ),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export default getAllProducts;
