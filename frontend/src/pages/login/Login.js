import React, { useContext, useState } from 'react';
import { Button, Label, TextInput, Card } from "flowbite-react";

import { AuthContext } from '../../shared/context/auth-context';
import { useSendRequest } from '../../shared/hook/send-request';
import ErrorModal from '../../shared/util/ErrorModal';

const Login = () => {
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/login',
        'POST',
        JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.user.id);
      if(responseData.user.admin) auth.switchAdmin();
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
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput id="email" type="email" value={formData.email} onChange={handleChange} name="email" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" value={formData.password} onChange={handleChange} name="password" required />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;