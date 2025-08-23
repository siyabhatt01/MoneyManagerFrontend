import { Download, Mail } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions,onDelete}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border p-4">
        <div className="flex items center justify-between">
            <h5 className="text-lg">Income Sources</h5>
            <div className="flex items-center justify-end gap-2">
                <button className=" inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700    bg-gray-100 rounded-lg shadow-sm hover:bg-purple-200 hover:text-purple-800 active:bg-purple-300 transition-colors">
                    <Mail size={15} className='text-base'/>Email
                </button>
                <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700    bg-gray-100 rounded-lg shadow-sm hover:bg-purple-200 hover:text-purple-800 active:bg-purple-300 transition-colors">
                    <Download size={15} className='text-base'/>Download
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:gridd-cols-2">
            {/* display the incomes */}
            {transactions?.map((income)=>(
                <TransactionInfoCard
                    key={income.id}
                    title={income.name}
                    icon={income.icon}
                    date={moment(income.date).format('DD-MM-YYYY')}
                    amount={income.amount}

                    type='income'
                    onDelete={()=>onDelete(income.id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList