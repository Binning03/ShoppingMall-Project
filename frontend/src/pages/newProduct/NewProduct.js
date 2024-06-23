import React, {useState} from 'react';
import { Button, Label, TextInput, Textarea, Card, FileInput } from "flowbite-react";

import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

const NewProduct = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    price: 0,
    stock: 0
  });
  
  const { sendRequest } = useSendRequest();
  
  const handleChange = (evt) => {
    const changedField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((currData) => {
      return {
        ...currData,
        [changedField]: newValue,
      };
    });
  };
  
   const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      const sendData = new FormData();
      sendData.append('name', formData.name);
      sendData.append('description', formData.description);
      sendData.append('image', evt.target.image.files[0]);
      sendData.append('category', formData.category);
      sendData.append('price', formData.price);
      sendData.append('stock', formData.stock);
      // const responseData = 
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/products',
        'POST',
        sendData
        /*JSON.stringify({
          name: formData.name,
          description: formData.description,
          image: formData.image,
          category: formData.category,
          price: formData.price,
          stock: formData.stock
        }),
        {
          'Content-Type': 'application/json'
        }*/
      );
      window.location.href = "/";
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };
  
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
    <div className="flex justify-center">
      <Card className="w-1/2 max-w-96">
        <form encType='multipart/form-data' className="flex max-w-md flex-col gap-4" onSubmit={submitHandler}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Product name" />
            </div>
            <TextInput id="name" type="text" value={formData.name} onChange={handleChange} name="name" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea id="description" value={formData.description} onChange={handleChange} name="description" required rows={4} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="image" value="Image" />
            </div>
            <FileInput id="image" name="image" helperText="PNG, JPG or JPEG (SIZE. 500x500px)" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <TextInput id="category" type="text" value={formData.category} onChange={handleChange} name="category" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput id="price" type="number" value={formData.price} onChange={handleChange} name="price" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="stock" value="Stock" />
            </div>
            <TextInput id="stock" type="number" value={formData.stock} onChange={handleChange} name="stock" required shadow />
          </div>
          <Button type="submit">Create New Product</Button>
        </form>
      </Card>
    </div>
  );
};

export default NewProduct;