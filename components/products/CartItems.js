/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { getSingleProduct } from '../../utils/data/productDATA.JS';
import ProductCard from './ProductCard';

export default function CartItem(productId) {
  const [product, setProduct] = useState({});

  const getProduct = (pid) => {
    getSingleProduct(pid).then((data) => setProduct(data));
  };

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  return (
    <>
      <ProductCard
        key={product.id}
        id={product.id}
        sellerId={product.seller_id}
        name={product.name}
        photoUrl={product.photo_url}
        description={product.description}
        price={product.price}
        categoryId={product.category_id}
        onUpdate={getProduct}
      />
    </>
  );
}
