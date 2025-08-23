import React, { useEffect, useState } from 'react'
import { prepareIncomeLineChartData } from '../util/prepareIncomeLineChartData';
// Recharts imports
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area
} from "recharts";
import CustomChart from './CustomChart';
import { Plus } from 'lucide-react';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);
        return () => {};
    }, [transactions]);

  return (
    <div className='bg-white shadow-md rounded-xl p-4 border p-4 mt-5'>
        <div className="flex items-center justify-between">
            <div>
                <h5 className="text-lg">
                    Expense Overview
                </h5>
                <p className="text-xs text-gray-400 mt-0">
                    Track your spending over time and analyze your expense trends.
                </p>
            </div>
            <button 
                className='cursor-pointer inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg shadow-sm hover:bg-red-200 hover:text-red-900 active:bg-red-300 transition-colors'
                onClick={onAddExpense}
            >
                <Plus size={15} className='text-lg'/>
                Add Expense
            </button>
        </div>
        <div className="mt-6 w-full h-64 mb-10">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <defs>
                {/* Gradient fill under line */}
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} 
              />
              <YAxis tickFormatter={(val) => `₹${val}`} />

              {/* Custom Tooltip */}
              <Tooltip content={<CustomChart />} />

              {/* Smooth line */}
              <Line 
                type="monotone" 
                dataKey="totalAmount" 
                stroke="#DC2626" 
                strokeWidth={3} 
                dot={{ r: 4, stroke: "#DC2626", fill: "#fff", strokeWidth: 2 }} 
                activeDot={{ r: 6 }} 
              />

              {/* Shaded area under line */}
              <Area type="monotone" dataKey="totalAmount" stroke="none" fill="url(#colorExpense)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}

export default ExpenseOverview
