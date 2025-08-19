import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import Input from '../components/Input.jsx';
import { Link } from 'react-router-dom';
import { validateEmail } from '../util/validation.js';
import axiosConfig from '../util/axiosConfig.jsx';
import { API_ENDPOINTS } from '../util/apiEndpoints.js';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading]=useState(false);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    if (!fullName) {
      setError("Please enter your full name ");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    setError("");

    try {

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password
      })

      if (response.status === 201) {
        toast.success("Profile created successfully.");
        navigate("/login");
      }
    } catch (err) {
      console.log('Something went wrong', err);
      setError(err.message);
    }finally{
      setLoading(false);
    }



  }

  return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      <img src={assets.signup_bg} alt='background image' className='absolute inset-0 w-full h-full object-cover filter blur-sm' />
      <div className='relative z-10 w-full max-w-lg px-6'>
        <div className='bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto'>
          <h3 className='text-2xl font-semibold text-black text-center mb-2'>
            Create An Account
          </h3>
          <p className='text-sm text-slate-700 text-center mb-8'>
            Start tracking your spendings by joining with us.
          </p>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='flex justify-center mb-6'>
              {/* Profile image */}
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="Enter full name"
                type="text"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="abc@gmail.com"
                type="text"
              />
              <div className='col-span-2'>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="********"
                  type="password"
                />
              </div>
            </div>
            {error && (
              <p className='text-red-800 text-sm text-center bg-red-50 p-2 rounded'>{error}</p>
            )}
            <button
              className={`w-full py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed':''}`}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                <LoaderCircle className='animate-spin w-5 h-5'/>
                Signing Up...
                </>
              ) : ("SIGN UP")}
            </button>
            <p className='text-sm text-slate-800 text-center mt-6'>Already have an account?
              <Link to="/login" className='font-medium text-primary underline hover:text-primary-dark transition-colors'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp