import { clientCredentials } from '../client';

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/threds_users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/threds_users/${uid}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const checkCart = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/threds_users/${uid}/check_cart`, {
    method: 'POST',
    body: JSON.stringify(
      uid,
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
  getAllUsers, getSingleUser, checkCart,
};
