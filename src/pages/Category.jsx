import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser'
import { Plus } from 'lucide-react';
import CategoryList from '../components/CategoryList';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import Model from '../components/Model';
import AddCategoryForm from '../components/AddCategoryForm.jsx';
import axios from 'axios';

const Category = () => {
  useUser();

  const [loading, setLoading]= useState(false);
  const [categoryData , setCategoryData] = useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel]= useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] =  useState(false);
  const [selectedCategory, setSelectedCategory]=useState(null);

  const fetchCategoryDetails = async () => {

    if(loading)return ;
    setLoading(true);

    try{

      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if(response.status===200)
      {
        console.log('categories',response.data);
        setCategoryData(response.data);
      }
    }catch(error)
    {
      console.log('Something went wrong please try again ',error);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCategoryDetails();
  },[]);

  const handleAddCategory=async(category)=>{
    const {name,type,icon}=category;

    if(!name.trim())
    {
      toast.error("Category name is required!"); 
      return; 
    }

    const isDuplicate = categoryData.some((category)=>{
      return category.name.toLowerCase()===name.trim().toLowerCase();
    })
    if(isDuplicate)
    {
      toast.error("Category name already exists");
       return;
      
    }

    try{
      const response= await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,{name,type,icon})
      if(response.status===201)
      {
        toast.success("Category added successfully");
        setOpenAddCategoryModel(false);
        fetchCategoryDetails();
      }
    }catch(error)
    {
      console.log('Error adding category',category);
      toast.error(error.response?.data?.message || 'Failed to add category.');
    }
  }

  const handleEditcategory=(categoryToEdit)=>{
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true);
  }

  const handleUpdateCategory=async(updatedCategory)=>{
    const {id,name,type,icon}=updatedCategory;
    if(!name.trim())
    {
      toast.error("Category name is required");
      return;
    }
    if(!id)
    {
      toast.error("CategoryId is missing for update");
      return;
    }
    try{
       const response= await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});
        setOpenAddCategoryModel(false);
        setSelectedCategory(null);
        toast.success("Category updated successfully");
        fetchCategoryDetails();
    }catch(error)
    {
      console.log("Error in updating the category ",error.response.data.message || error.message); 
      toast.error(error.response?.data?.message || "Failed to update the category");
    }
  }

  return (

    <Dashboard activeMenu="Category">
       <div className="my-5 mx-auto">
        {/* Add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All categories</h2>
          <button className='bg-green-200 text-green-600 py-2 px-3 rounded-lg hover:bg-green-300  flex items-center gap-1 cursor-pointer'
          onClick={()=>setOpenAddCategoryModel(true)}>
            <Plus size={15}/>
            Add Category
          </button>
        </div>
        {/* Category list */}
        <CategoryList categories={categoryData} onEditCategory={handleEditcategory} />

        {/* Adding Category model */}
        <Model 
          isOpen={openAddCategoryModel}
          onClose={()=>setOpenAddCategoryModel(false)}
          title="Add Category">
          <AddCategoryForm onAddCategory={handleAddCategory}/>
        </Model>
        {/* Updating Category model */}
        <Model
          isOpen={openEditCategoryModel}
          onClose={()=>
          {setOpenEditCategoryModel(false)
          setSelectedCategory(null)}}
          title="Update category"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Model>
       </div>
    </Dashboard>
  )
}

export default Category