import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import CategoryList from '../../components/CategoryList';
import OneProduct from '../../components/OneProduct';
import categorySelector from '../../shared/util/categorySelector';
import ErrorModal from '../../shared/util/ErrorModal';
import { useSendRequest } from '../../shared/hook/send-request';

const Category = () => {
  const categoryId = Number(useParams().cid);
  
  const [ products, setProducts ] = useState([]);
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  
  const { sendRequest } = useSendRequest();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products/category/${categoryId}`
        );
        setProducts(responseData.products);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err.message);
      }
    };
    fetchProducts();
  }, [sendRequest, categoryId]);
  
  if(isError){
    return (
      <ErrorModal 
        header="Error occurs"
        message1={errorMessage}
        message2="Please try again"
      />
    );  
  }
  
  return (
    <>
    <div>
      <CategoryList />
      <div className="flex justify-center mt-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{categorySelector(categoryId)} Products</h1>
      </div>
      <div className="flex justify-center flex-wrap">
        {products.map((product, index) => (
          <OneProduct 
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Category;