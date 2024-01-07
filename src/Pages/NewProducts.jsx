import React from 'react';
import AddNewProducts from '../Components/AddNewProducts/AddNewProducts';
import DeleteProduct from '../Components/DeleteProduct/DeleteProduct';
const NewProducts = () => {
  return (
    <div>
      <AddNewProducts></AddNewProducts>
      <DeleteProduct></DeleteProduct>
    </div>
  );
};

export default NewProducts;
