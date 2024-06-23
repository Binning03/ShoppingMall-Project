import React, { useContext, useState } from 'react';
import { Button, Label, TextInput, Card } from "flowbite-react";

import { AuthContext } from '../../shared/context/auth-context';
import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

const Signup = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
    address: "",
    phonenumber: ""
  });
  
  const auth = useContext(AuthContext);
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
    if(formData.password !== formData.repeatpassword) {
      throw new Error('passwords do not equal');
    }
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/signup',
        'POST',
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          repeatpassword: formData.repeatpassword,
          address: formData.address,
          phonenumber: formData.phonenumber
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.user.id);
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
        <form className="flex max-w-md flex-col gap-4" onSubmit={submitHandler}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput id="name" type="text" value={formData.name} onChange={handleChange} name="name" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput id="email" type="email" value={formData.email} onChange={handleChange} name="email" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" value={formData.password} onChange={handleChange} name="password" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeatpassword" value="Repeat password" />
            </div>
            <TextInput id="repeatpassword" type="password" value={formData.repeatpassword} onChange={handleChange} name="repeatpassword" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="Your address" />
            </div>
            <TextInput id="address" type="text" value={formData.address} onChange={handleChange} name="address" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phonenumber" value="Your phonenumber" />
            </div>
            <TextInput id="phonenumber" type="text" value={formData.phonenumber} onChange={handleChange} name="phonenumber" required shadow />
          </div>
          <Button type="submit">Signup new account</Button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;