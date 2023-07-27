/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import {
  Button, Card, Image, ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCategory } from '../../utils/data/categoryData';
import { useAuth } from '../../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved

export default function ProductDetail({ product }) {
  const [category, setCategory] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getSingleCategory(product.category_id).then(setCategory);
  }, [product]);

  return (
    <div>
      <Card className="text-center">
        <Card.Header>{product.name}</Card.Header>
        <Card.Body>
          <Image className="product-detail-img" src={product.photo_url} fluid />
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item>${product.price}</ListGroup.Item>
          </ListGroup>
          {(user.id === product.seller_id) ? (<Button onClick={(e) => router.replace(`/products/edit/${product.id}`)} variant="primary">Update Product</Button>) : (<Button variant="primary">Add To Cart</Button>)}
        </Card.Body>
        <Card.Footer className="text-muted">{category?.name}</Card.Footer>
      </Card>
    </div>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo_url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_available: PropTypes.bool.isRequired,
    seller_id: PropTypes.number.isRequired,
    category_id: PropTypes.number.isRequired,
  }).isRequired,
};
