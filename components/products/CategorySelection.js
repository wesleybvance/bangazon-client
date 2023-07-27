import React from 'react';
import PropTypes from 'prop-types';

export default function CategorySelection({ id, name }) {
  return (
    <option key={`select--${id}`} value={id}>{name}</option>
  );
}

CategorySelection.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
