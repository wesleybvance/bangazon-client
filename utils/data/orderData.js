import { clientCredentials } from '../client';

const updateOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${order.id}`, {
    method: 'PUT',
    body: JSON.stringify(
      order,
    ),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getSingleOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${orderId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrder = (uid, order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'POST',
    body: JSON.stringify(
      order,
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
  updateOrder, getSingleOrder, createOrder,
};
