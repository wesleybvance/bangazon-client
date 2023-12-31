import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { checkCart } from '../../utils/data/thredsUserData';
import { createOrder } from '../../utils/data/orderData';
import { getOrderProductsByOrderId } from '../../utils/data/orderProductData';
import CartItem from '../../components/products/CartItems';

export default function Cart() {
  const { user } = useAuth();

  const [order, setOrder] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);

  const getAllOrderProducts = (orderId) => {
    getOrderProductsByOrderId(orderId).then((data) => setOrderProducts(data));
  };

  useEffect(() => {
    checkCart(user.uid).then((data) => {
      setOrder(data);
      if (order) {
        console.warn('order ok');
      } else {
        const newOrder = {
          customerId: user.uid,
        };
        createOrder(user.uid, newOrder).then((newCart) => setOrder(newCart));
      }
    });
    getAllOrderProducts(order.id);
  });

  return (
    <div>{orderProducts.map((orderProduct) => (
      <CartItem productId={orderProduct.product_id} />
    ))}
    </div>
  );
}
