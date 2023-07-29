import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved
import { deleteProduct } from '../../utils/data/productDATA.JS';
import { checkCart, getSingleUser } from '../../utils/data/thredsUserData';
import { getSingleCategory } from '../../utils/data/categoryData';
import { getOrderProductsByOrderId } from '../../utils/data/orderProductData';
import { createOrder } from '../../utils/data/orderData';

const initialState = {
  id: 1,
  price: 0,
  name: '',
  photoUrl: '',
  description: '',
  isAvailable: true,
  sellerId: 1,
  categoryId: 1,
};
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
  const [orderProducts, setOrderProducts] = useState([]);

  const deleteProductCard = () => {
    if (window.confirm('Do you want to remove this product listing?')) {
      deleteProduct(id).then(() => ontimeupdate());
    }
  };

  const addToCart = () => {
    console.warn('added to card');
  };

  const getSeller = (sid) => {
    getSingleUser(sid).then((data) => setSeller(data));
  };

  const getCategory = (cid) => {
    getSingleCategory(cid).then((data) => setCategory(data));
  };

  const getAllOrderProducts = (orderId) => {
    getOrderProductsByOrderId(orderId).then((data) => setOrderProducts(data));
    console.warn(orderProducts);
  };

  useEffect(() => {
    getSeller(sellerId);
    getCategory(categoryId);
    checkCart(user.id).then((data) => {
      if (data[0]) {
        console.warn(data);
      } else {
        const newOrder = {
          customerId: user.id,
        };
        createOrder(user.uid, newOrder);
      }
    });
    checkCart(user.id).then((data) => getAllOrderProducts(data[0].id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={photoUrl} />
      <Card.Body>
        <Card.Title>
          <Link passHref href={`/products/${id}`}>{name}</Link>
        </Card.Title>
        <Card.Body>{description}</Card.Body>
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
          {/* TERNARY FOR EDIT/DELETE BUTTONS TO APPEAR IF USER IS SELLER, ADD TO CART IF USER IS NOT SELLER  */}
          {(user.id === sellerId) ? (
          // eslint-disable-next-line no-unused-vars
            <div><Button onClick={(e) => router.replace(`/products/edit/${id}`)} variant="primary">Edit Product</Button>
              <Button onClick={deleteProductCard} variant="primary">Delete Product</Button>
            </div>
          ) : (<Button onClick={addToCart} variant="primary">Add To Cart</Button>)}
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  sellerId: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  categoryId: PropTypes.number,
  photoUrl: PropTypes.string,
};

ProductCard.defaultProps = {
  id: initialState.id,
  sellerId: initialState.sellerId,
  name: initialState.name,
  description: initialState.description,
  price: initialState.price,
  categoryId: initialState.categoryId,
  photoUrl: initialState.photoUrl,
};
