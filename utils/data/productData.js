import { clientCredentials } from '../client';

const getAllProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
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

const deleteProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${productId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getProductsBySellerId = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products?seller_id=${sellerId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getProductsByCategoryId = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products?category_id=${categoryId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const postProduct = (uid, product) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'POST',
    body: JSON.stringify(
      product,
    ),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export {
  updateProduct, getAllProducts, getProductsBySellerId, getProductsByCategoryId, getSingleProduct, postProduct, deleteProduct,
};
