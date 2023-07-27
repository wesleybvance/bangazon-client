/* eslint-disable import/no-unresolved */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductDetail from '../../components/products/ProductDetail';
import { getSingleProduct } from '../../utils/data/productDATA.JS';

export default function ProductDetailPage() {
  const router = useRouter();
  const productId = router.query;

  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    getSingleProduct(productId.id).then(setProductDetail);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div><ProductDetail product={productDetail} /></div>
  );
}
