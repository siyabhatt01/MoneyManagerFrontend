import React from 'react'
import { useState } from 'react'
import {assets} from '../assets/assets.js'
import Input from '../components/Input.jsx';
import { Link } from 'react-router-dom';

const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]= useState("");
  const [error,setError] = useState("");

  const handleSubmit = async(e)=>{
    
        e.preventDefault();
  
        if(!validateEmail(email))
        {
          setError("Please enter a valid email address");
          return;
        }
        if(!password)
        {
          setError("Please enter your password");
          return;
        }
  
        setError("");
    
  }

  return (
     <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      <img src={assets.signup_bg} alt='background image'  className='absolute inset-0 w-full h-full object-cover filter blur-sm'/>
      <div className='relative z-10 w-full max-w-lg px-6'>
          <div className='bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto'>
            <h3 className='text-2xl font-semibold text-black text-center mb-2'>
              Welcome Back
            </h3>
            <p className='text-sm text-slate-700 text-center mb-8'>
              Please enter your details to login.
            </p>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <Input 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="abc@gmail.com"
                    type="text"
                />
                  <Input 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    label="Password"
                    placeholder="********"
                    type="password"
                />
              {error && (
                <p className='text-red-800 text-sm text-center bg-red-50 p-2 rounded'>{error}</p>
              )}
              <button
                className="w-full py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                type="submit"
              >
                LOG IN
              </button>
              <p className='text-sm text-slate-800 text-center mt-6'>Don't have an account?
                <Link to="/signUp" className='font-medium text-primary underline hover:text-primary-dark transition-colors'>SignUp</Link>
              </p>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Login