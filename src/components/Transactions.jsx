import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const Transactions = ({transactions,onMore,type,title}) => {
  return (
    <div className='bg-gray-900 shadow-2xl rounded-3xl p-6 border border-gray-800 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300'>
        <div className="flex items-center justify-between mb-6">
            <h5 className="text-xl font-bold text-gray-100">
                {title}
            </h5>
            <button className='inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-3 py-2 hover:bg-gray-800' onClick={onMore}> 
                            More <ArrowRight className='text-base' size={15}/>
                        </button>
        </div>
        <div className="space-y-2">
            {
                transactions?.slice(0,5)?.map(item=>(
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("DD-MM-YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))
            }
        </div>
    </div>
  )
}

export default Transactions