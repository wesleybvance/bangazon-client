import { clientCredentials } from '../client';

const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${categoryId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllCategories, getSingleCategory,
};
