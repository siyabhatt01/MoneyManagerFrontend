import React from 'react'
import {Toaster} from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Home/>}/>
            <Route path="/income" element={<Income/>}/>
            <Route path="/expense" element={<Expense/>}/>
            <Route path="/category" element={<Category/>}/>
            <Route path="/filter" element={<Filter/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App