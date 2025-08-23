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
        <div>
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
            <div className="flex justify-end mt-6">
                <button
                    onClick={() => { onAddExpense(expense) }}
                    className='cursor-pointer inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg shadow-sm hover:bg-red-200 hover:text-red-900 active:bg-red-300 transition-colors'>
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm
