import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/products/ProductForm';
// eslint-disable-next-line import/no-unresolved
import { getSingleProduct } from '../../../utils/data/productDATA.JS';

export default function EditProduct() {
  const router = useRouter();
  const [editProduct, setEditProduct] = useState({});

  const productId = router.query;

  useEffect(() => {
    getSingleProduct(productId.id).then(setEditProduct);
    console.warn(editProduct);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div><ProductForm product={editProduct} /></div>
  );
}
