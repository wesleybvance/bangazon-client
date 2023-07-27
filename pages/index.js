import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { getAllProducts } from '../utils/data/productDATA.JS';
import ProductCard from '../components/products/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    getAllProducts().then((data) => setProducts(data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      // style={{
      //   height: '90vh',
      //   padding: '30px',
      //   maxWidth: '400px',
      //   margin: '0 auto',
      // }}
    >
      {products.map((product) => (
        <div key={`product--${product.id}`} className="product-card">
          <ProductCard
            id={product.id}
            sellerId={product.seller_id}
            name={product.name}
            photoUrl={product.photo_url}
            description={product.description}
            price={product.price}
            categoryId={product.category_id}
            onUpdate={getProducts}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
