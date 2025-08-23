import { Download, Mail } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete,onDownload,onEmail }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border p-4">
        <div className="flex items center justify-between">
            <h5 className="text-lg">Expense Records</h5>
            <div className="flex items-center justify-end gap-2">
                  <button onClick={onEmail} className=" inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-purple-700    bg-purple-200 rounded-lg shadow-sm hover:bg-purple-300 hover:text-purple-800 active:bg-purple-300 transition-colors">
                    <Mail size={15} className='text-base' />Email
                  </button>
                 <button onClick={onDownload} className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-purple-700    bg-purple-200 rounded-lg shadow-sm hover:bg-purple-300 hover:text-purple-800 active:bg-purple-300 transition-colors">
                    <Download size={15} className='text-base' />Download
                 </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:gridd-cols-2">
            {/* display the expenses */}
            {transactions?.map((expense) => (
                <TransactionInfoCard
                    key={expense.id}
                    title={expense.name}
                    icon={expense.icon}
                    date={moment(expense.date).format('DD-MM-YYYY')}
                    amount={expense.amount}
                    type='expense'
                    onDelete={() => onDelete(expense.id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList
