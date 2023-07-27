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
        console.warn(data[0].id);
      } else {
        const newOrder = {
          customerId: user.id,
        };
        createOrder(user.uid, newOrder);
        checkCart(user.id).then((newData) => {
          console.warn(newData);
        });
      }
    });
    checkCart(user.id).then((data) => getAllOrderProducts(data[0].id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  return (
    <div>{orderProducts?.map((orderProduct) => (
      <CartItem key={orderProduct.product_id} productId={orderProduct.product_id} />
    ))}
    </div>
  );
}
