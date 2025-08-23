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
    <div>
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
        <div className="flex justify-end mt-6">
            <button
                onClick={()=>{onAddIncome(income)}}
                className='cursor-pointer inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-600    bg-green-100 rounded-lg shadow-sm hover:bg-green-200 hover:text-green-900 active:bg-purple-300 transition-colors'>
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm