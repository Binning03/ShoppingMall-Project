import React, {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Card, List, ListItem, Button } from 'flowbite-react';

import { AuthContext } from '../../shared/context/auth-context';
import CategoryList from '../../components/CategoryList';
import { useSendRequest } from '../../shared/hook/send-request';
import categorySelector from '../../shared/util/categorySelector';
import ReviewBlock from '../../components/ReviewBlock';
import NewReview from './NewReview';
import ErrorModal from '../../shared/util/ErrorModal';

const Product = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ product, setProduct ] = useState();
  const [ reviews, setReviews ] = useState([]);
  const auth = useContext(AuthContext);
  const { sendRequest } = useSendRequest();
  
  const productId = useParams().pid;
  
  const putInCart = async (evt) => {
    evt.preventDefault();
    try {
      // const responseData = 
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/carts/${auth.userId}/${productId}`,
        'POST'
      );
      alert("Put in a cart successfully")
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };
  
  const deleteProduct = async (evt) => {
    evt.preventDefault();
    try {
      // const responseData = 
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
        'DELETE'
      );
      alert("Delete a product successfully")
      window.location.href = "/";
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };
  
  const goToEdit = (evt) => {
    window.location.href = `/product/edit/${productId}`;
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`
        );
        setProduct(responseData.product);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err.message);
      }
    };
    fetchProducts();
  }, [sendRequest, productId]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/product/${productId}`
        );
        setReviews(responseData.reviews);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err.message);
      }
    };
    fetchReviews();
  }, [sendRequest, productId]);
    
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
      <CategoryList />
      <div className="flex flex-row my-8 justify-center">
        <Card className="max-w-xl basis-1/2 ml-8">
          <img
            alt="product"
            src={product?.image}
          />
        </Card>
        <Card className="max-w-xl basis-1/2 mr-8">
          <h2 className="text-4xl font-extrabold dark:text-white">{product?.name}</h2>
          <p className="my-4 text-lg text-gray-500">
            {product?.description}
          </p>
          <List>
            <ListItem>Category: {categorySelector(Number(product?.category))}</ListItem>
            <ListItem>Price: ${product?.price}</ListItem>
            <ListItem>Stock: {product?.stock}</ListItem>
          </List>
          {auth.isLoggedIn && (
            <Button onClick={putInCart}>Put in a Cart</Button>
          )}
          {auth.isAdmin && (
            <Button onClick={goToEdit} color="success">Edit</Button>
          )}
          {auth.isAdmin && (
            <Button onClick={deleteProduct} color="failure">Delete</Button>
          )}
        </Card>
      </div>
      <div className="flex flex-col">
        {auth.isLoggedIn && (  
          <NewReview productId={productId} userId={auth.userId}/>  
        )}
        {reviews.map((review, index) => (
          <ReviewBlock 
            key={review.id}
            id={review.id}
            user={review.user.name}
            star={review.star}
            comment={review.comment}
          />
        ))}
      </div>
    </>
  );
};

export default Product;