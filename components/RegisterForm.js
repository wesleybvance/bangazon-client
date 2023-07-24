import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    imageUrl: '',
    username: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Info</Form.Label>
        {/* FIRST NAME  */}
        <Form.Control as="textarea" name="firstName" required placeholder="Enter First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">First Name</Form.Text>
        {/* LAST NAME  */}
        <Form.Control as="textarea" name="lastName" required placeholder="Enter Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Last Name</Form.Text>
        {/* ADDRESS  */}
        <Form.Control as="textarea" name="address" required placeholder="Enter your Address" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Address</Form.Text>
        {/* PROFILE PIC  */}
        <Form.Control as="textarea" name="imageUrl" required placeholder="Enter a Profile Photo URL" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Profile Photo URL</Form.Text>
        {/* USER NAME  */}
        <Form.Control as="textarea" name="username" required placeholder="Enter your Username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text className="text-muted">Username</Form.Text>

      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
