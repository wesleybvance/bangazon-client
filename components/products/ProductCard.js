import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved
import { deleteProduct } from '../../utils/data/productDATA.JS';
import { getSingleUser } from '../../utils/data/thredsUserData';
import { getSingleCategory } from '../../utils/data/categoryData';

export default function ProductCard({
  id,
  sellerId,
  name,
  description,
  price,
  categoryId,
  photoUrl,
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [seller, setSeller] = useState({});
  const [category, setCategory] = useState({});

  const deleteProductCard = () => {
    if (window.confirm('Do you want to remove this product listing?')) {
      deleteProduct(id).then(() => ontimeupdate());
    }
  };

  const getSeller = (sid) => {
    getSingleUser(sid).then((data) => setSeller(data));
  };

  const getCategory = (cid) => {
    getSingleCategory(cid).then((data) => setCategory(data));
  };

  useEffect(() => {
    getSeller(sellerId);
    getCategory(categoryId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={photoUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Text>
          {price}
        </Card.Text>
        <Card.Text>
          {seller.first_name} {seller.last_name}
        </Card.Text>
        <Card.Text>
          {category.name}
        </Card.Text>
        <div>
          {/* TERNARY FOR EDIT/DELETE BUTTONS TO APPEAR IF USER IS SELLER  */}
          {(user.id === sellerId) ? (
            // eslint-disable-next-line no-unused-vars
            <div><Button onClick={(e) => router.replace(`/products/edit/${id}`)} variant="primary">Edit Product</Button>
              <Button onClick={deleteProductCard} variant="primary">Delete Product</Button>
            </div>
          ) : ''}
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  sellerId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  photoUrl: PropTypes.string.isRequired,
};
