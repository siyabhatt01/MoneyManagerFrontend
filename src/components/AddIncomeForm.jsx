import React, { useState } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup';
import Input from './Input.jsx';

const AddIncomeForm = ({onAddIncome,categories}) => {

    const[income, setIncome]=useState({name:'',amount:'',date:'',icon:'',categoryId:''})
    const categoryOptions=categories.map((category)=>(
        {
            value:category.id,
            label:category.name
        }
    ))

    const handleChange=(key,value)=>{
        setIncome({...income,[key]:value});
    }

  return (
    <div className="space-y-2">
        <EmojiPickerPopup
            icon={income.icon}
            onSelect={(selectedIcon)=>handleChange('icon',selectedIcon)}
        />
        <Input
            value={income.name}
            onChange={({target})=>handleChange('name',target.value)}
            label="Income Source"
            placeholder="e.g. Salary, Freelance, Bonus"
            type="text"
        />
        <Input
            value={income.categoryId}
            onChange={({target})=>handleChange('categoryId',target.value)}
            label="Category"
            isSelect={true}
            options={categoryOptions}
        />
        <Input
            value={income.amount}
            onChange={({target})=>handleChange('amount',target.value)}
            label="Amount"
            placeholder="e.g. 500.00"
            type="number"
        />
        <Input
            value={income.date}
            onChange={({target})=>handleChange('date',target.value)}
            label="Date"
            placeholder=""
            type="date"
        />
        <div className="flex justify-end pt-4">
            <button
                onClick={()=>{onAddIncome(income)}}
                className='cursor-pointer inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl active:from-green-700 active:to-green-800 transition-all duration-200 transform hover:-translate-y-0.5'>
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm