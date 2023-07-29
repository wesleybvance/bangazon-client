import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { checkCart } from '../../utils/data/thredsUserData';
import { createOrder } from '../../utils/data/orderData';
import { getOrderProductsByOrderId } from '../../utils/data/orderProductData';
import CartItem from '../../components/products/CartItems';

export default function Cart() {
  const { user } = useAuth();

  const [orderProducts, setOrderProducts] = useState([]);

  const getAllOrderProducts = (orderId) => {
    getOrderProductsByOrderId(orderId).then((data) => setOrderProducts(data));
  };

  useEffect(() => {
    checkCart(user.id).then((data) => {
      if (data[0]) {
        console.warn(data);
      } else {
        const newOrder = {
          customerId: user.id,
        };
        createOrder(user.uid, newOrder);
      }
    });
    checkCart(user.id).then((data) => getAllOrderProducts(data[0].id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>{(orderProducts[0]) ? (orderProducts.map((orderProduct) => (
      <CartItem key={orderProduct.id} productId={orderProduct.product_id} />
    ))) : (<h1>You have no products in your cart.</h1>)}
    </div>
  );
}
