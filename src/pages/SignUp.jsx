import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import Input from '../components/Input.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../util/validation.js';
import axiosConfig from '../util/axiosConfig.jsx';
import { API_ENDPOINTS } from '../util/apiEndpoints.js';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import ProfilePhotoSelector from './ProfilePhotoSelector.jsx';
import uploadProfileImage from '../util/uploadProfileImage.js';

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
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
      // upload image if present
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      if (response.status === 201) {
        toast.success("Profile created successfully.");
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.log("Something went wrong", err);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative bg-gray-950 overflow-y-auto">
      {/* Background Image */}
      <img
        src={assets.signup_bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm opacity-20"
      />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 mt-10 mb-10">
        <div className="bg-gray-900/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-800">
          <h3 className="text-3xl font-bold text-white text-center mb-3">
            Create An Account
          </h3>
          <p className="text-gray-300 text-center mb-8 font-medium">
            Start tracking your spendings by joining with us.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              <ProfilePhotoSelector
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div className="col-span-2">
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
              <p className="text-red-400 text-sm text-center bg-red-900/20 p-4 rounded-xl border border-red-800 font-medium">
                {error}
              </p>
            )}
            <button
              className={`w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg hover:from-purple-700 hover:to-purple-800 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin w-6 h-6" />
                  Signing Up...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>
            <p className="text-gray-300 text-center mt-8 font-medium">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-purple-400 underline hover:text-purple-300 transition-colors ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
