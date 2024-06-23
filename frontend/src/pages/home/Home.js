import React, { useState, useEffect } from 'react';

import CategoryList from '../../components/CategoryList';
import OneProduct from '../../components/OneProduct';
import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

const Home = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ products, setProducts ] = useState([]);
  
  const { sendRequest } = useSendRequest();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/products'
        );
        setProducts(responseData.products);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err.message);
      }
    };
    fetchProducts();
  }, [sendRequest]);
  
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
    <div>
      <CategoryList />
      <div className="flex justify-center mt-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">All Products</h1>
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
  );
};

export default Home;