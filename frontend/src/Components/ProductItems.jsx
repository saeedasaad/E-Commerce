import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const productImage = image || '/fallback.png'; 

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-auto"
          src={productImage}
          alt={name || 'Product image'}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}{price}
      </p>
    </Link>
  );
};

export default ProductItems;


