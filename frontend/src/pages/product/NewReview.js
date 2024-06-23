import React, { useState } from 'react';
import { Label, Textarea, Rating, RatingStar, Button } from "flowbite-react";

import { useSendRequest } from '../../shared/hook/send-request';

const NewReview = (props) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const productId = props.productId;
  const userId = props.userId;
  
  const { sendRequest } = useSendRequest();
  
  const handleChange = (evt) => {
    const newValue = evt.target.value;
    setComment(newValue);
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      const sendData = new FormData();
      sendData.append('star', rating);
      sendData.append('comment', comment);
      sendData.append('productId', productId);
      sendData.append('userId', userId);
      // const responseData = 
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/reviews',
        'POST',
        JSON.stringify({
          star: rating,
          comment: comment,
          productId: productId,
          userId: userId
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      window.location.reload(true);
    } catch (err) {}
  };
  
  return (
    <form className="mx-8 mb-8" onSubmit={submitHandler}>
      <div className="block">
        <Label htmlFor="comment" value="Your Review" />
      </div>
      <Rating size="lg">
        {[...Array(rating)].map((a, i) => (
          <RatingStar key={i} onClick={() => setRating(i + 1)} />
        ))}
        {[...Array(5 - rating)].map((a, i) => (
          <RatingStar filled={false} key={i} onClick={() => setRating(rating + i + 1)} />
        ))}
      </Rating>
      <Textarea id="comment" type="text" value={comment} onChange={handleChange} placeholder="Leave a comment" required rows={4} />
      <Button className="mt-4" onClick={submitHandler}>Leave a review</Button>
    </form>
  );
};

export default NewReview;