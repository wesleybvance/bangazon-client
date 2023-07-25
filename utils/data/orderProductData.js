import { clientCredentials } from '../client';

const deleteOrderProduct = (orderProductId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products/${orderProductId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getSingleOrderProduct = (orderProductId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products/${orderProductId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getOrderProductsByOrderId = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products?order_id=${orderId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const postOrderProduct = (orderProduct) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_products`, {
    method: 'POST',
    body: JSON.stringify(
      orderProduct,
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
  postOrderProduct, getOrderProductsByOrderId, getSingleOrderProduct, deleteOrderProduct,
};
