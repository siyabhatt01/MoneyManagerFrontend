import React, { useState } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup';
import Input from './Input.jsx';

const AddExpenseForm = ({ onAddExpense, categories }) => {

    const [expense, setExpense] = useState({ 
        name: '', 
        amount: '', 
        date: '', 
        icon: '', 
        categoryId: '' 
    });

    const categoryOptions = categories.map((category) => (
        {
            value: category.id,
            label: category.name
        }
    ));

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    };

    return (
        <div className="space-y-2">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            <Input
                value={expense.name}
                onChange={({ target }) => handleChange('name', target.value)}
                label="Expense Name"
                placeholder="e.g. Rent, Groceries, Travel"
                type="text"
            />
            <Input
                value={expense.categoryId}
                onChange={({ target }) => handleChange('categoryId', target.value)}
                label="Category"
                isSelect={true}
                options={categoryOptions}
            />
            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g. 250.00"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label="Date"
                type="date"
            />
            <div className="flex justify-end pt-4">
                <button
                    onClick={() => { onAddExpense(expense) }}
                    className='cursor-pointer inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl active:from-red-700 active:to-red-800 transition-all duration-200 transform hover:-translate-y-0.5'>
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm
