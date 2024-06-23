import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';

import { useSendRequest } from '../../shared/hook/send-request';
import MyReviewBlock from '../../components/MyReviewBlock';
import ErrorModal from '../../shared/util/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

const Mypage = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ reviews, setReviews ] = useState([]);
  
  const auth = useContext(AuthContext);
  const userId = useParams().uid
  const { sendRequest } = useSendRequest();
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/user/${userId}`
        );
        setReviews(responseData.reviews);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err.message);
      }
    };
    fetchReviews();
    if(userId !== auth.userId) {
      setIsError(true);
      setErrorMessage('Invalid userId');
    }
  }, [sendRequest, userId, auth]);
  
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
      <div className="flex justify-center mt-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">My Reviews</h1>
      </div>
      <div className="flex flex-col">
          {reviews.map((review, index) => (
            <MyReviewBlock 
              key={review.id}
              id={review.id}
              product={review.product.name}
              productId={review.product.id}
              star={review.star}
              comment={review.comment}
            />
          ))}
      </div>
    </>
  );
};

export default Mypage;