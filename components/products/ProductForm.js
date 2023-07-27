import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved
import { updateProduct, postProduct } from '../../utils/data/productDATA.JS';
import { getAllCategories } from '../../utils/data/categoryData';
import CategorySelection from './CategorySelection';

const initialState = {
  id: 0,
  price: 0,
  name: '',
  photoUrl: '',
  description: '',
  isAvailable: true,
  sellerId: 0,
  categoryId: 0,
};

export default function ProductForm({ product }) {
  const { user } = useAuth();
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    if (product.id) {
      setCurrentProduct({
        id: product.id,
        price: product.price,
        name: product.name,
        photoUrl: product.photo_url,
        description: product.description,
        isAvailable: product.isAvailable,
        sellerId: product.sellerId,
        categoryId: product.category_id,
      });
    }
  }, [product, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.id) {
      const updatedProduct = {
        id: product.id,
        sellerId: product.sellerId,
        price: currentProduct.price,
        name: currentProduct.name,
        photoUrl: currentProduct.photoUrl,
        description: currentProduct.description,
        isAvailable: currentProduct.isAvailable,
        categoryId: currentProduct.categoryId,
      };
      updateProduct(updatedProduct).then(
        () => router.replace(`/products/${product.id}`),
      );
    } else {
      const newProduct = {
        sellerId: user.id,
        price: currentProduct.price,
        name: currentProduct.name,
        photoUrl: currentProduct.photoUrl,
        description: currentProduct.description,
        isAvailable: currentProduct.isAvailable,
        categoryId: currentProduct.categoryId,
      };
      postProduct(user.id, newProduct).then(() => router.replace(`seller/${user.id}`));
    }
  };

  return (
    <div className="product-form-container">
      <Form onSubmit={handleSubmit} className="product-form">
        <FloatingLabel
          controlId="floatingInput"
          label="Product Name"
          className="mb-3"
        >
          <Form.Control type="text" name="name" value={currentProduct.name} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Description" className="mb-3">
          <Form.Control as="textarea" rows={3} name="description" value={currentProduct.description} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Photo URL"
          className="mb-3"
        >
          <Form.Control type="text" name="photoUrl" value={currentProduct.photoUrl} onChange={handleChange} />
        </FloatingLabel>

        <Form.Select aria-label="Select Category" name="categoryId" value={currentProduct.categoryId} onChange={handleChange}>
          <option>Select Category</option>
          {categories.map((category) => (<CategorySelection key={category.id} id={category.id} name={category.name} />))}
        </Form.Select>

        <FloatingLabel
          controlId="floatingInput"
          label="Price"
          className="mt-3"
        >
          <Form.Control type="number" name="price" value={currentProduct.price} onChange={handleChange} />
        </FloatingLabel>

        <Button className="mt-3" type="submit">List Product</Button>
      </Form>
    </div>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
    name: PropTypes.string,
    photo_url: PropTypes.string,
    description: PropTypes.string,
    isAvailable: PropTypes.bool,
    sellerId: PropTypes.number,
    category_id: PropTypes.number,
  }),
};

ProductForm.defaultProps = {
  product: initialState,
};
