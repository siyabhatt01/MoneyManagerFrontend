import { Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from 'lucide-react';
import React from 'react'
import { addThousandSeperator } from '../util/util';

const TransactionInfoCard = ({icon,title,date,amount,type,hideDeleteBtn,onDelete}) => {
  const getAmountStyles=()=>type==='income'?'bg-green-900/30 text-green-400 border-green-700' :'bg-red-900/30 text-red-400 border-red-700';
  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-800/50 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-gray-700">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-300 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
            {
                icon ? (<span className="text-2xl">{icon}</span> ) : (<UtensilsCrossed className='text-purple-400'/>)
            }
        </div>
        <div className="flex-1 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-200 font-semibold">{title}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{date}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            {!hideDeleteBtn && (
                <button onClick={onDelete} className='text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer p-1 rounded-lg hover:bg-red-900/20'>
                    <Trash2 size={18}/>
                </button>
            )}

            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getAmountStyles()} font-medium shadow-sm`}>
                <h6 className="text-sm font-semibold">
                    {type==='income' ? '+' :'-'} ${addThousandSeperator(amount)}
                </h6>
                {type==='income' ? (
                    <TrendingUp size={16} className="text-green-400"/>
                ): <TrendingDown size={16} className="text-red-400"/>}
            </div>
        </div>

    </div>
  )
}

export default TransactionInfoCard