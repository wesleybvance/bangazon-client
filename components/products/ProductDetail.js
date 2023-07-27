/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import {
  Button, Card, Image, ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleCategory } from '../../utils/data/categoryData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/thredsUserData';
// eslint-disable-next-line import/no-unresolved

const initialState = {
  id: 0,
  price: 0,
  name: '',
  photoUrl: '',
  description: '',
  isAvailable: true,
  sellerId: 1,
  categoryId: 1,
};

export default function ProductDetail({
  id,
  sellerId,
  name,
  description,
  price,
  categoryId,
  photoUrl,
}) {
  const [category, setCategory] = useState({});
  const [seller, setSeller] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getSingleCategory(categoryId).then((data) => setCategory(data));
    getSingleUser(sellerId).then((data) => setSeller(data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <div>
      <Card className="text-center">
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Image className="product-detail-img" src={photoUrl} fluid />
          <ListGroup className="list-group-flush">
            <Link passHref href={`/user/${sellerId}`}><Card.Text>{seller?.username}</Card.Text></Link>
            <ListGroup.Item>{description}</ListGroup.Item>
            <ListGroup.Item>${price}</ListGroup.Item>
          </ListGroup>
          {(user.id === sellerId) ? (<Button onClick={(e) => router.replace(`/products/edit/${id}`)} variant="primary">Update Product</Button>) : (<Button variant="primary">Add To Cart</Button>)}
        </Card.Body>
        <Card.Footer className="text-muted">{(category.name)?.toUpperCase()}</Card.Footer>
      </Card>
    </div>
  );
}

ProductDetail.propTypes = {
  id: PropTypes.number,
  sellerId: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  categoryId: PropTypes.number,
  photoUrl: PropTypes.string,
};

ProductDetail.defaultProps = {
  id: initialState.id,
  sellerId: initialState.sellerId,
  name: initialState.name,
  description: initialState.description,
  price: initialState.price,
  categoryId: initialState.categoryId,
  photoUrl: initialState.photoUrl,
};
