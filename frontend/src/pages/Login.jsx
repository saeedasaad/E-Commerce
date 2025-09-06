import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { setToken, navigate, backendUrl } = useContext(ShopContext);

  // State for input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
      } else {

        response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      }

      if (response.data.success) {
        const tokenValue = response.data.token;
        setToken(tokenValue); 
        localStorage.setItem('token', tokenValue); 
        toast.success(response.data.message || `${currentState} successful!`);
      } else {
        toast.error(response.data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Something went wrong!');
    }
  };


  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Header */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Inputs */}
      {currentState === 'Sign Up' && (
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required />
      )}

      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      {/* Toggle + Forgot password */}
      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login here
          </p>
        )}
      </div>

      {/* Submit button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;


