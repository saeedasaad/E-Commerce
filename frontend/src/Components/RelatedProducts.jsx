import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import ProductItems from './ProductItems';

const RelatedProducts = ({ category, subCategory }) => {  
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // filter by category
      productsCopy = productsCopy.filter(item => item.category === category);

      // filter by subCategory
      productsCopy = productsCopy.filter(item => item.subCategory === subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.length > 0 ? (
            related.map((item, index) => (
              <ProductItems
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.images}  
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
