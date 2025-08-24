import React from 'react'
import { addThousandSeperator } from '../util/util';
import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({totalBalance,totalIncome,totalExpense,}) => {
    const COLORS=["#59168B","#a0090e","#016630"];

    const balanceData=[
        {name:"Total Balance", amount: totalBalance},
        {name:"Total Expense", amount: totalExpense},
        {name:"Total Income", amount: totalIncome}
    ];

  return (
    <div className='bg-gray-900 shadow-2xl rounded-3xl p-6 border border-gray-800 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300'>
        <div className="flex items-center justify-between mb-6">
            <h5 className="text-xl font-bold text-gray-100">Financial Overview</h5>
        </div>
        <CustomPieChart
            data={balanceData}
            label={totalBalance}
            totalAmount={`$${addThousandSeperator(totalBalance)}`}
            colors={COLORS}
            showtextAnchor
        />
    </div>
  )
}

export default FinanceOverview