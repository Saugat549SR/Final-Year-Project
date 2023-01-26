import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product = ({ product }) => {
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <span>{product.Price}</span>
    </Link>
  );
};

export default Product;
