import React from 'react'
import {Toaster} from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <>
      <Toaster/>
      
        <Routes>
            <Route path="/" element={<Root/>}/>
            <Route path="/dashboard" element={<Home/>}/>
            <Route path="/income" element={<Income/>}/>
            <Route path="/expense" element={<Expense/>}/>
            <Route path="/category" element={<Category/>}/>
            <Route path="/filter" element={<Filter/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/landingPage" element={<LandingPage/>}/>
          </Routes>
     

      
    </>
  )
}

const Root = ()=>{
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) :
    <Navigate to="/landingPage"/>

}

export default App