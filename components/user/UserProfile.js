/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getProductsBySellerId } from '../../utils/data/productDATA.JS';
import ProductCard from '../products/ProductCard';

const initialState = {
  id: 0,
  firstName: '',
  lastName: '',
  username: '',
  imageUrl: '',
};

export default function UserProfile({
  id,
  firstName,
  lastName,
  username,
  imageUrl,
}) {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  const getUserProducts = () => {
    getProductsBySellerId(id).then((data) => setProducts(data));
  };

  useEffect(() => {
    getUserProducts();
  }, [id]);

  return (
    <>
      <Card>
        <div className="page-center flex-center">
          <Image className="user-profile-pic" src={imageUrl} roundedCircle />
          <Card.Body className="flex-center mb-4">
            <Card.Title>{username}</Card.Title>
            {(user.id === id) ? (<Card.Text><div>{firstName} {lastName}</div></Card.Text>) : ''}
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </div>
      </Card>
      <div>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            sellerId={product.seller_id}
            name={product.name}
            photoUrl={product.photo_url}
            description={product.description}
            price={product.price}
            categoryId={product.category_id}
            onUpdate={getUserProducts}
          />
        ))}
      </div>
    </>
  );
}

UserProfile.propTypes = {
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  imageUrl: PropTypes.string,
};

UserProfile.defaultProps = {
  id: initialState.id,
  firstName: initialState.firstName,
  lastName: initialState.lastName,
  username: initialState.username,
  imageUrl: initialState.imageUrl,
};
