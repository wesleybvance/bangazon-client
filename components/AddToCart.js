// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../../utils/context/authContext';
// // eslint-disable-next-line import/no-unresolved

// export default function AddToCart({
//   sellerId,
//   name,
//   description,
//   price,
//   categoryId,
//   photoUrl,
// }) {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [seller, setSeller] = useState({});
//   const [category, setCategory] = useState({});
//   const [orderProducts, setOrderProducts] = useState([]);

//   const addToCart = () => {
//     console.warn('added to card');
//   };

//   const getSeller = (sid) => {
//     getSingleUser(sid).then((data) => setSeller(data));
//   };

//   const getCategory = (cid) => {
//     getSingleCategory(cid).then((data) => setCategory(data));
//   };

//   const getAllOrderProducts = (orderId) => {
//     getOrderProductsByOrderId(orderId).then((data) => setOrderProducts(data));
//   };

//   useEffect(() => {
//     getSeller(sellerId);
//     getCategory(categoryId);
//     checkCart(user.id).then((data) => {
//       if (data[0]) {
//         console.warn(data);
//       } else {
//         const newOrder = {
//           customerId: user.id,
//         };
//         createOrder(user.uid, newOrder);
//       }
//     });
//     checkCart(user.id).then((data) => getAllOrderProducts(data[0].id));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   return (
//     <>
//     {(user.uid !== sellerId) (<Button></Button>)}
//     </>
//   );
// }

// ProductCard.propTypes = {
//   id: PropTypes.number,
//   sellerId: PropTypes.number,
//   name: PropTypes.string,
//   description: PropTypes.string,
//   price: PropTypes.number,
//   categoryId: PropTypes.number,
//   photoUrl: PropTypes.string,
// };

// ProductCard.defaultProps = {
//   id: initialState.id,
//   sellerId: initialState.sellerId,
//   name: initialState.name,
//   description: initialState.description,
//   price: initialState.price,
//   categoryId: initialState.categoryId,
//   photoUrl: initialState.photoUrl,
// };
