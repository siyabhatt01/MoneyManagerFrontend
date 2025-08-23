import React, { useEffect, useState } from 'react'
import Input from "../components/Input.jsx"
import EmojiPickerPopup from './EmojiPickerPopup.jsx'

const AddCategoryForm = ({onAddCategory,initialCategoryData,isEditing}) => {

    const [category,setCategory]= useState(
        {
            name :"",
            type : "income",
            icon : ""
        }
    )

    useEffect(()=>{
        if(isEditing && initialCategoryData )
        {
            setCategory(initialCategoryData);
        }
        else{
            setCategory({name:"",type:"income",icon:""})
        }
    },[isEditing,initialCategoryData])

    const categoryTypeOptions = [
        {value : "income", label : "Income"},
        {value : "expense", label : "Expense"},
    ]

    const handleChange = (key,value)=>{
        setCategory({...category,[key]:value})
    }

    const handleSubmit=()=>{
        onAddCategory(category)
    }
  return (
    <div className="p-4">

        <EmojiPickerPopup icon={category.icon} onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}/>

        <Input
            value={category.name}
            onChange={({target})=>handleChange("name",target.value)}
            label="Category Name"
            placeholder="e.g. Freelance, Salary, Groceries"
            type="text"
        />
        <Input
            label="Category Type"
            value={category.type}
            onChange={({target})=>handleChange("type",target.value)}
            isSelect={true}
            options={categoryTypeOptions}
        />
        <div className="flex-justify-end mt-6">
            <button type="button"
                onClick={handleSubmit}
                className='inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl 
                bg-gradient-to-r from-purple-600 to-purple-700 shadow-md 
                hover:from-purple-700 hover:to-purple-800 hover:-translate-y-0.5 
                active:translate-y-0 active:shadow-sm transition-all duration-200'
            >{isEditing ? "Update Category":"Add Category"}</button>
        </div>
    </div>
  )
}

export default AddCategoryForm;