import { Download, Mail } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete,onDownload,onEmail }) => {
  return (
    <div className="bg-gray-900 shadow-2xl rounded-3xl p-6 border border-gray-800 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
            <h5 className="text-xl font-bold text-gray-100">Expense Records</h5>
            <div className="flex items-center justify-end gap-3">
                  <button onClick={onEmail} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-purple-400 bg-purple-900/20 rounded-xl shadow-sm hover:bg-purple-900/30 hover:text-purple-300 hover:shadow-md active:bg-purple-900/40 transition-all duration-200">
                    <Mail size={16} className='text-base' />Email
                  </button>
                 <button onClick={onDownload} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-purple-400 bg-purple-900/20 rounded-xl shadow-sm hover:bg-purple-900/30 hover:text-purple-300 hover:shadow-md active:bg-purple-900/40 transition-all duration-200">
                    <Download size={16} className='text-base' />Download
                 </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
